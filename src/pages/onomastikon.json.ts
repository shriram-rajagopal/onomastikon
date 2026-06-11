import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entryAnchor } from '../lib/entry';

// Machine-readable export of the full dataset, served at /onomastikon.json.
// This is the bulk-download counterpart to the human pages: every entity,
// language, and name record with its fields and sources, under the same
// CC BY-SA license as the site content. Built statically at compile time.
export const GET: APIRoute = async () => {
  const [civs, langs, names] = await Promise.all([
    getCollection('civilizations'),
    getCollection('languages'),
    getCollection('names'),
  ]);

  const payload = {
    title: 'Onomastikon: A Digital Atlas of Ancient Names',
    url: 'https://onomastikon.org',
    author: 'Shriram Rajagopal',
    license: 'CC BY-SA 4.0',
    license_url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://github.com/shriram-rajagopal/onomastikon',
    counts: { entities: civs.length, languages: langs.length, names: names.length },
    entities: civs.map((c) => ({
      id: c.id,
      url: `https://onomastikon.org/civilizations/${c.id}`,
      ...c.data,
    })),
    languages: langs.map((l) => ({
      id: l.id,
      url: `https://onomastikon.org/languages/${l.id}`,
      ...l.data,
    })),
    names: names.map((n) => ({
      id: n.id,
      url: `https://onomastikon.org/civilizations/${n.data.civilization.id}#${entryAnchor(n.id, n.data.civilization.id)}`,
      civilization: n.data.civilization.id,
      language: n.data.language.id,
      original_text: n.data.original_text,
      transliteration: n.data.transliteration,
      ipa: n.data.ipa ?? null,
      literal_meaning: n.data.literal_meaning ?? null,
      family: n.data.family ?? null,
      derived_from: n.data.derived_from?.id ?? null,
      era_start: n.data.era_start,
      era_end: n.data.era_end,
      confidence: n.data.confidence,
      sources: n.data.sources,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
