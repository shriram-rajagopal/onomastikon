import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { ENTITY_GEO } from '../../lib/geo';
import { locatorSvg } from '../../lib/locator';

// Standalone mini-locator SVGs, one per located entity, for contexts that
// inject the map at runtime (the homepage's hover popovers fetch these and
// inline them so the page's theme variables apply). Same builder, same
// classes, zero duplication with the entity pages' LocatorMap component.
export const getStaticPaths: GetStaticPaths = async () => {
  const civs = await getCollection('civilizations');
  return civs
    .filter((c) => ENTITY_GEO[c.id])
    .map((c) => ({ params: { slug: c.id } }));
};

export const GET: APIRoute = ({ params }) => {
  const svg = locatorSvg(params.slug!);
  return new Response(svg ?? '', {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
