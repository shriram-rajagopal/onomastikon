import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entryAnchor } from '../lib/entry';

// Fold diacritics so "Pārsa" indexes as "parsa"; the client folds the query the
// same way before matching. Kept identical to the fold() in search.astro.
const fold = (s?: string | null) =>
  (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// null era_end = "in continued use"; contributes no year token to the haystack.
const era = (y: number | null) => (y === null ? '' : y < 0 ? `${Math.abs(y)} bce` : `${y} ce`);

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
      context: c.data.type,
      url: `/civilizations/${c.id}`,
      h: fold([c.data.english_name, c.data.region, c.data.type].join(' ')),
    });
  }

  for (const l of langs) {
    records.push({
      type: 'language',
      label: l.data.english_name,
      context: l.data.language_family,
      url: `/languages/${l.id}`,
      h: fold([l.data.english_name, l.data.language_family, l.data.script].join(' ')),
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
      h: fold(
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
    });
  }

  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json' },
  });
};
