import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import dates from '../data/entry-dates.json';

const TYPE_LABEL: Record<string, string> = {
  civilization: 'civilization',
  city: 'city',
  region: 'region',
  geographic_feature: 'geographic feature',
};

// New-entries feed: one item per entity and language, dated by the committed
// entry-dates ledger (scripts/generate-entry-dates.mjs). The audience is
// "tell me when Sogdian lands" — additions, not edits, so the ledger's
// first-commit dates are exactly the right signal.
export async function GET(context: APIContext) {
  const [civs, langs] = await Promise.all([
    getCollection('civilizations'),
    getCollection('languages'),
  ]);
  const dated = (key: string) => new Date((dates as Record<string, string>)[key] ?? Date.now());
  const items = [
    ...civs.map((c) => ({
      title: `${c.data.english_name} (${TYPE_LABEL[c.data.type] ?? 'entity'})`,
      description: c.data.summary,
      link: `/civilizations/${c.id}`,
      pubDate: dated(`civilizations/${c.id}`),
    })),
    ...langs.map((l) => ({
      title: `${l.data.english_name} (language)`,
      description: `${l.data.language_family} · written in ${l.data.script}`,
      link: `/languages/${l.id}`,
      pubDate: dated(`languages/${l.id}`),
    })),
  ]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 100);

  return rss({
    title: 'Onomastikon — new entries',
    description:
      'New entities and languages in the digital atlas of ancient names: what the civilizations, cities, regions, and geographic features of antiquity called themselves.',
    site: context.site!,
    items,
    customData: '<language>en</language>',
  });
}
