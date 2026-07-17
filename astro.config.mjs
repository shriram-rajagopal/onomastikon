// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeXref from './src/lib/rehype-xref.mjs';

// Per-page content dates for the sitemap's lastmod (committed ledger;
// Vercel's shallow clone can't ask git). Keys are "civilizations/<id>" /
// "languages/<id>", matching those routes' pathnames.
const modifiedDates = /** @type {Record<string, string>} */ (
  JSON.parse(readFileSync(new URL('./src/data/modified-dates.json', import.meta.url), 'utf8'))
);
const latestModified = Object.values(modifiedDates).sort().at(-1);

// https://astro.build/config
export default defineConfig({
  // Canonical origin: required for absolute OG image URLs, canonical links,
  // and the sitemap.
  site: 'https://onomastikon.org',
  // Prefetch every internal link on hover/touch. The site is fully static, so
  // this makes navigation (and the view-transition morphs) land without a
  // network beat. Hover, not viewport: the homepage index alone holds ~100
  // links, which viewport-prefetching would fetch wholesale.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Every rendered content body gets automatic first-mention crossreference
  // links to other entities and languages (src/lib/rehype-xref.mjs).
  markdown: { rehypePlugins: [rehypeXref] },
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        if (modifiedDates[path]) item.lastmod = modifiedDates[path];
        else if (path === '' && latestModified) item.lastmod = latestModified;
        return item;
      },
    }),
  ],
});
