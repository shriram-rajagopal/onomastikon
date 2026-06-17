// Homeland coordinates for each language, for the transmission map: where a
// name-form is plotted. One representative site per language (a chancellery
// capital or heartland city), not a linguistic boundary claim; the place name
// is shown in the node's tooltip. Label offsets (dx/dy in map units, anchor)
// are hand-placed so the Levant and Mesopotamian clusters stay legible.
//
// Coordinates are true lon/lat. The map component picks a baked region (see
// scripts/generate-coastline.mjs) and pins nodes outside it to the frame
// edge automatically, so no fake coordinates belong here.
import type { MapRegion } from './coastline';
import { MAP_SCALE } from './coastline';

export interface LangGeo {
  lon: number;
  lat: number;
  place: string;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'middle' | 'end';
}

export const LANG_GEO: Record<string, LangGeo> = {
  egyptian: { lon: 31.25, lat: 29.85, place: 'Memphis', anchor: 'end', dx: -7, dy: 9 },
  demotic: { lon: 30.4, lat: 31.0, place: 'Sais', anchor: 'end', dx: -7, dy: -5 },
  coptic: { lon: 32.65, lat: 25.7, place: 'Thebes' },
  akkadian: { lon: 44.42, lat: 32.54, place: 'Babylon', anchor: 'middle', dx: 0, dy: 14 },
  sumerian: { lon: 45.64, lat: 31.32, place: 'Uruk', dy: 12 },
  elamite: { lon: 48.25, lat: 32.19, place: 'Susa', dx: 8, dy: -3 },
  hittite: { lon: 34.62, lat: 40.02, place: 'Hattusa', dy: -6, anchor: 'middle', dx: 0 },
  ugaritic: { lon: 35.78, lat: 35.6, place: 'Ugarit', anchor: 'end', dx: -7 },
  hurrian: { lon: 40.05, lat: 36.85, place: 'Waššukanni', dy: -6 },
  phoenician: { lon: 35.2, lat: 33.27, place: 'Tyre', anchor: 'end', dx: -7, dy: -2 },
  'biblical-hebrew': { lon: 35.23, lat: 31.78, place: 'Jerusalem', dx: 7, dy: 4 },
  'imperial-aramaic': { lon: 36.31, lat: 33.51, place: 'Damascus', dx: 7, dy: 6 },
  syriac: { lon: 38.79, lat: 37.16, place: 'Edessa', dy: -6 },
  'ancient-greek': { lon: 23.73, lat: 37.98, place: 'Athens', anchor: 'end', dx: -7 },
  latin: { lon: 12.49, lat: 41.9, place: 'Rome', dy: -6 },
  'old-persian': { lon: 52.89, lat: 29.94, place: 'Persepolis', dy: 10 },
  'middle-persian': { lon: 44.58, lat: 33.1, place: 'Ctesiphon', anchor: 'middle', dx: 0, dy: -7 },
  parthian: { lon: 58.4, lat: 37.6, place: 'Nisa', dy: -6 },
  avestan: { lon: 66.9, lat: 36.76, place: 'Bactra', dy: -6 },
  sanskrit: { lon: 77.7, lat: 27.5, place: 'Mathura', anchor: 'end', dx: -7 },
  'classical-chinese': { lon: 108.94, lat: 34.27, place: "Chang'an", anchor: 'end', dx: -7 },
  'classical-arabic': { lon: 39.83, lat: 24.47, place: 'The Hejaz' },
  geez: { lon: 38.72, lat: 14.13, place: 'Aksum' },
};

export function inRegion(g: LangGeo, r: MapRegion): boolean {
  return g.lon >= r.lonMin && g.lon <= r.lonMax && g.lat >= r.latMin && g.lat <= r.latMax;
}

/** Project into a region's pixel space, clamping to the frame with a margin;
    `pinned` marks coordinates that were outside the region. */
export function projectGeo(
  g: LangGeo,
  r: MapRegion,
  margin = 8
): { x: number; y: number; pinned: false | 'east' | 'west' | 'north' | 'south' } {
  const rawX = (g.lon - r.lonMin) * MAP_SCALE;
  const rawY = (r.latMax - g.lat) * MAP_SCALE;
  const w = (r.lonMax - r.lonMin) * MAP_SCALE;
  const h = (r.latMax - r.latMin) * MAP_SCALE;
  const x = Math.min(Math.max(rawX, margin), w - margin);
  const y = Math.min(Math.max(rawY, margin), h - margin);
  let pinned: ReturnType<typeof projectGeo>['pinned'] = false;
  if (rawX > w - margin) pinned = 'east';
  else if (rawX < margin) pinned = 'west';
  else if (rawY < margin) pinned = 'north';
  else if (rawY > h - margin) pinned = 'south';
  return { x, y, pinned };
}
