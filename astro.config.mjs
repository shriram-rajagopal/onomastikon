// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
});
