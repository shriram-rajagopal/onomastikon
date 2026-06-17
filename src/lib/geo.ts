// Homeland coordinates for each language, for the transmission map: where a
// name-form is plotted. One representative site per language (a chancellery
// capital or heartland city), not a linguistic boundary claim; the place name
// is shown in the node's tooltip. Label offsets (dx/dy in map units, anchor)
// are hand-placed so the Levant and Mesopotamian clusters stay legible.
//
// Coordinates are true lon/lat. The map fits its window to the actual nodes it
// shows (see fitProjection below), so far-flung homelands (Chang'an, say) sit at
// their true place rather than being clamped to a fixed frame; no fake
// coordinates belong here.
import { LAND } from './coastline';

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
  'jewish-babylonian-aramaic': { lon: 43.77, lat: 33.36, place: 'Pumbedita', anchor: 'end', dx: -7, dy: -4 },
  'ancient-greek': { lon: 23.73, lat: 37.98, place: 'Athens', anchor: 'end', dx: -7 },
  latin: { lon: 12.49, lat: 41.9, place: 'Rome', dy: -6 },
  etruscan: { lon: 11.76, lat: 42.25, place: 'Tarquinia', anchor: 'end', dx: -7, dy: -4 },
  'mycenaean-greek': { lon: 22.75, lat: 37.73, place: 'Mycenae', anchor: 'end', dx: -7, dy: 8 },
  'old-persian': { lon: 52.89, lat: 29.94, place: 'Persepolis', dy: 10 },
  'middle-persian': { lon: 44.58, lat: 33.1, place: 'Ctesiphon', anchor: 'middle', dx: 0, dy: -7 },
  parthian: { lon: 58.4, lat: 37.6, place: 'Nisa', dy: -6 },
  avestan: { lon: 66.9, lat: 36.76, place: 'Bactra', dy: -6 },
  sanskrit: { lon: 77.7, lat: 27.5, place: 'Mathura', anchor: 'end', dx: -7 },
  'classical-chinese': { lon: 108.94, lat: 34.27, place: "Chang'an", anchor: 'end', dx: -7 },
  'classical-arabic': { lon: 39.83, lat: 24.47, place: 'The Hejaz' },
  geez: { lon: 38.72, lat: 14.13, place: 'Aksum' },
};

// --- Per-map projection -----------------------------------------------------
// The map window is computed from the nodes it must show, then everything (the
// coastline included) is projected into it. This is the fix for the old fixed
// scale: a Chang'an node no longer falls off the edge of a Near-East window;
// instead the window grows to include China. The projection is plain
// equirectangular (x ∝ lon, y ∝ -lat), matching the look of the old baked maps.

export interface Bounds {
  lonMin: number;
  lonMax: number;
  latMin: number;
  latMax: number;
}
export interface Projection {
  project(lon: number, lat: number): { x: number; y: number };
  bounds: Bounds;
  viewBox: string;
  width: number;
  height: number;
}

// Every map is the same width in user units, so labels (12.5px) and node dots
// (r=3.2) read consistently whatever the geographic span; only the height and
// the degrees-per-pixel scale vary per map.
const VIEW_W = 800;
const PAD_FRAC = 0.14; // breathing room around the outermost nodes, per side
const PAD_MIN = 3; // ...but at least this many degrees, for tight clusters
const MIN_LON_SPAN = 20; // a one- or two-city map should not zoom in absurdly
const MAX_ASPECT = 0.82; // cap height/width; widen the lon window if too tall
const MIN_ASPECT = 0.42; // floor height/width; add vertical context if too flat

/** Fit an equirectangular window around the given coordinates and return a
    projector into a VIEW_W-wide pixel space. */
export function fitProjection(geos: Array<{ lon: number; lat: number }>): Projection {
  let lonMin = Infinity;
  let lonMax = -Infinity;
  let latMin = Infinity;
  let latMax = -Infinity;
  for (const g of geos) {
    lonMin = Math.min(lonMin, g.lon);
    lonMax = Math.max(lonMax, g.lon);
    latMin = Math.min(latMin, g.lat);
    latMax = Math.max(latMax, g.lat);
  }
  if (!Number.isFinite(lonMin)) {
    // No located nodes: fall back to a Mediterranean / Near-East window.
    lonMin = 8; lonMax = 60; latMin = 12; latMax = 45;
  }
  const padLon = Math.max((lonMax - lonMin) * PAD_FRAC, PAD_MIN);
  const padLat = Math.max((latMax - latMin) * PAD_FRAC, PAD_MIN);
  lonMin -= padLon; lonMax += padLon;
  latMin -= padLat; latMax += padLat;

  let lonSpan = lonMax - lonMin;
  if (lonSpan < MIN_LON_SPAN) {
    const grow = (MIN_LON_SPAN - lonSpan) / 2;
    lonMin -= grow; lonMax += grow;
    lonSpan = MIN_LON_SPAN;
  }
  let latSpan = latMax - latMin;
  if (latSpan > MAX_ASPECT * lonSpan) {
    // Too tall: widen the longitude window symmetrically to cap the aspect.
    const target = latSpan / MAX_ASPECT;
    const grow = (target - lonSpan) / 2;
    lonMin -= grow; lonMax += grow;
    lonSpan = target;
  } else if (latSpan < MIN_ASPECT * lonSpan) {
    // Too flat (a Rome-to-China strip): add latitude context above and below
    // so the map reads as a map, not a band. Nodes keep their true positions.
    const target = MIN_ASPECT * lonSpan;
    const grow = (target - latSpan) / 2;
    latMin -= grow; latMax += grow;
    latSpan = target;
  }

  const scale = VIEW_W / lonSpan;
  const width = VIEW_W;
  const height = latSpan * scale;
  const bounds = { lonMin, lonMax, latMin, latMax };
  const project = (lon: number, lat: number) => ({
    x: (lon - lonMin) * scale,
    y: (latMax - lat) * scale,
  });
  return { project, bounds, viewBox: `0 0 ${width.toFixed(1)} ${height.toFixed(1)}`, width, height };
}

// Sutherland-Hodgman clip of a lon/lat ring to the map's bounds, so each map's
// SVG carries only the coastline it actually shows.
function clipRing(ring: ReadonlyArray<readonly [number, number]>, b: Bounds) {
  const params: Array<[0 | 1, number, (p: readonly [number, number]) => boolean]> = [
    [0, b.lonMin, (p) => p[0] >= b.lonMin],
    [0, b.lonMax, (p) => p[0] <= b.lonMax],
    [1, b.latMin, (p) => p[1] >= b.latMin],
    [1, b.latMax, (p) => p[1] <= b.latMax],
  ];
  const intersect = (
    a: readonly [number, number],
    c: readonly [number, number],
    axis: 0 | 1,
    value: number
  ): [number, number] => {
    const t = (value - a[axis]) / (c[axis] - a[axis]);
    return axis === 0
      ? [value, a[1] + t * (c[1] - a[1])]
      : [a[0] + t * (c[0] - a[0]), value];
  };
  let out: Array<readonly [number, number]> = ring as Array<readonly [number, number]>;
  for (const [axis, value, inside] of params) {
    const next: Array<readonly [number, number]> = [];
    for (let i = 0; i < out.length; i++) {
      const cur = out[i];
      const prev = out[(i + out.length - 1) % out.length];
      if (inside(cur)) {
        if (!inside(prev)) next.push(intersect(prev, cur, axis, value));
        next.push(cur);
      } else if (inside(prev)) {
        next.push(intersect(prev, cur, axis, value));
      }
    }
    out = next;
    if (out.length === 0) return null;
  }
  return out;
}

/** Project the baked land rings into the given window as one SVG path string. */
export function landPath(proj: Projection): string {
  const parts: string[] = [];
  for (const ring of LAND) {
    const clipped = clipRing(ring, proj.bounds);
    if (!clipped || clipped.length < 4) continue;
    const d = clipped
      .map(([lon, lat]) => {
        const { x, y } = proj.project(lon, lat);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join('L');
    parts.push(`M${d}Z`);
  }
  return parts.join('');
}
