import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entryAnchor } from '../lib/entry';

// Fold diacritics so "Pārsa" indexes as "parsa"; the client folds the query the
// same way before matching. Kept identical to the fold() in search.astro.
const fold = (s?: string | null) =>
  (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// null era_end = "in continued use"; contributes no year token to the haystack.
const era = (y: number | null) => (y === null ? '' : y < 0 ? `${Math.abs(y)} bce` : `${y} ce`);

// Safeguards for the gap between scholarly transliteration and what a reader
// types: every record's haystack also carries (a) its own slug, hyphens spaced
// — the slug is a plain-roman alias chosen by a human (egypt-egyptian-kemet
// carries "kemet" for the entry whose transliteration is km.t) — and (b) the
// transliteration stripped to bare letters, so "kmt" finds km.t and "sfarad"
// finds Sǝfārad.
const slugTokens = (id: string) => id.replace(/-/g, ' ');
const bare = (s?: string | null) => fold(s).replace(/[^a-z0-9 ]+/g, '');

// Display labels for the entity type enum, matching the entity-page eyebrow;
// the raw enum value ("geographic_feature") is not user-facing.
const TYPE_LABELS: Record<string, string> = {
  civilization: 'Civilization',
  city: 'City',
  region: 'Region',
  geographic_feature: 'Geographic feature',
};

// A single static index served at /search-index.json, built at compile time.
// It carries entity, language, AND name records, because the search facets span
// civilization/language/script/region as well as the name strings. The browse
// views (roadmap #2) read this same index, so the extraction lives in one place.
export const GET: APIRoute = async () => {
  const [civs, langs, names] = await Promise.all([
    getCollection('civilizations'),
    getCollection('languages'),
    getCollection('names'),
  ]);

  const civById = new Map(civs.map((c) => [c.id, c]));
  const langById = new Map(langs.map((l) => [l.id, l]));

  const records: Array<Record<string, unknown>> = [];

  for (const c of civs) {
    records.push({
      type: 'entity',
      label: c.data.english_name,
      context: TYPE_LABELS[c.data.type] ?? c.data.type,
      url: `/civilizations/${c.id}`,
      h: fold([c.data.english_name, slugTokens(c.id), c.data.region, TYPE_LABELS[c.data.type] ?? c.data.type].join(' ')),
    });
  }

  for (const l of langs) {
    records.push({
      type: 'language',
      label: l.data.english_name,
      context: l.data.language_family,
      url: `/languages/${l.id}`,
      h: fold([l.data.english_name, slugTokens(l.id), l.data.language_family, l.data.script].join(' ')),
    });
  }

  for (const n of names) {
    const c = civById.get(n.data.civilization.id);
    const l = langById.get(n.data.language.id);
    // Demotic and other unencodable scripts have empty original_text; fall back
    // to the transliteration so the result still has a readable label.
    const label = n.data.original_text || n.data.transliteration;
    // When the label is original-script text, carry the language's lang/dir so
    // the client can set them on the result label (screen readers, RTL shaping).
    const labelIsOriginal = Boolean(n.data.original_text);
    records.push({
      type: 'name',
      label,
      ...(labelIsOriginal && l
        ? { lang: l.data.lang_code, ...(l.data.direction === 'rtl' ? { dir: 'rtl' } : {}) }
        : {}),
      translit: n.data.transliteration,
      // Carried as a field (not only in the haystack) so the homepage's
      // name-of-the-day card can quote it.
      ...(n.data.literal_meaning ? { meaning: n.data.literal_meaning } : {}),
      context: `${l?.data.english_name ?? ''} · ${c?.data.english_name ?? ''}`,
      url: `/civilizations/${c?.id}#${entryAnchor(n.id, c?.id ?? '')}`,
      h: [
        fold(
          [
            n.data.original_text,
            n.data.transliteration,
            n.data.literal_meaning,
            l?.data.english_name,
            l?.data.script,
            l?.data.language_family,
            c?.data.english_name,
            c?.data.region,
            era(n.data.era_start),
            era(n.data.era_end),
          ]
            .filter(Boolean)
            .join(' ')
        ),
        fold(slugTokens(n.id)),
        bare(n.data.transliteration),
      ].join(' '),
    });
  }

  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json' },
  });
};
