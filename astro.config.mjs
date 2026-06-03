// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin: required for absolute OG image URLs, canonical links,
  // and the sitemap.
  site: 'https://onomastikon.org',
  integrations: [sitemap()],
});
