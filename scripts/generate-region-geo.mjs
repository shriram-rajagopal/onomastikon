#!/usr/bin/env node
// Bake accurate region outlines for the transmission map's area locators into
// src/lib/regions.ts, by clipping each region's hand-drawn hull to the real
// Natural Earth land polygons.
//
//   curl -sL -o /tmp/land-50m.json https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json
//   node scripts/generate-region-geo.mjs /tmp/land-50m.json
//
// A region's INLAND boundary is a cultural fiction and cannot be made precise,
// but its COASTAL boundary is real geography, like a river course. So we keep
// each region's rough hull as the cultural envelope and intersect it with the
// land: the seaward edges then snap to the true coastline (holes respected, so
// the Caspian and the Gulf cut correctly), while the inland edges stay the
// hand-drawn lines. Coastal regions gain a real coast; purely inland ones are
// returned essentially unchanged (the hull lies wholly within the land).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { feature } from 'topojson-client';
import polygonClipping from 'polygon-clipping';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [, , input] = process.argv;
if (!input) {
  console.error('usage: node scripts/generate-region-geo.mjs <land-50m.json>');
  process.exit(1);
}

// slug -> hull: the hand-drawn cultural envelope (from the old ENTITY_GEO points).
// The intersection with land turns each into a coast-accurate outline.
const HULLS = {
  deccan: [[73.5, 19.0], [78.5, 18.5], [80.5, 15.5], [78.0, 12.5], [74.5, 14.0], [73.3, 16.5]],
  anatolia: [[26.5, 38.7], [29.0, 41.0], [35.0, 42.0], [41.0, 41.0], [43.5, 39.5], [40.0, 37.0], [36.0, 36.2], [31.0, 36.4], [27.2, 37.3]],
  canaan: [[35.1, 33.4], [36.0, 33.2], [35.9, 31.4], [35.2, 30.6], [34.4, 31.4], [34.9, 32.6]],
  italia: [[7.7, 45.2], [12.8, 46.4], [13.8, 45.0], [16.2, 41.5], [18.4, 40.1], [16.4, 39.5], [15.9, 38.0], [15.5, 38.3], [13.5, 40.5], [12.4, 41.4], [11.0, 42.6], [9.5, 43.5], [8.0, 44.2]],
  latium: [[11.7, 42.3], [12.9, 42.0], [13.6, 41.5], [13.2, 41.2], [12.3, 41.2], [11.6, 41.8]],
  macedonia: [[20.8, 40.4], [21.4, 41.3], [23.5, 41.4], [24.6, 41.0], [24.2, 40.2], [22.6, 39.9], [21.0, 39.9]],
  'magna-graecia': [[14.0, 40.9], [17.5, 40.6], [18.4, 40.1], [16.4, 39.5], [15.9, 38.0], [15.6, 38.3], [15.0, 39.5], [14.5, 40.3]],
  mesopotamia: [[39.5, 37.0], [42.5, 37.1], [45.5, 33.5], [47.4, 31.0], [47.9, 30.4], [45.0, 31.6], [43.4, 34.0], [40.0, 36.0], [38.6, 36.7]],
  sicily: [[12.43, 37.80], [13.9, 38.1], [15.5, 38.25], [15.6, 38.0], [15.1, 36.69], [13.9, 37.1]],
  syria: [[36.0, 36.5], [38.5, 36.6], [40.0, 35.0], [38.7, 33.6], [36.3, 33.4], [35.9, 34.8]],
  maghreb: [[-9.9, 30.5], [-9.5, 34.0], [-5.9, 35.9], [-2.0, 35.4], [3.1, 36.95], [8.6, 37.4], [11.3, 35.2], [11.0, 33.3], [6.0, 32.5], [0.0, 31.8], [-6.0, 30.5]],
  khurasan: [[54.0, 34.5], [54.0, 36.5], [58.0, 38.5], [62.0, 37.5], [66.0, 36.5], [65.0, 34.5], [61.0, 33.5], [57.0, 33.0]],
  transoxiana: [[62.0, 39.0], [64.0, 41.0], [67.0, 42.0], [71.0, 42.5], [72.0, 40.5], [69.0, 39.0], [66.0, 38.0], [63.0, 37.5]],
  phrygia: [[29.5, 38.7], [31.2, 39.7], [33.0, 39.2], [32.6, 38.2], [30.6, 38.0], [29.6, 38.2]],
  lydia: [[26.9, 38.0], [27.6, 39.0], [29.0, 38.9], [29.2, 38.1], [28.3, 37.7], [27.1, 37.7]],
  ionia: [[26.4, 38.6], [27.4, 38.4], [27.6, 37.9], [27.2, 37.5], [26.6, 37.6], [26.4, 38.1]],
  cappadocia: [[33.6, 39.2], [36.0, 38.9], [36.4, 38.0], [35.4, 37.4], [34.0, 37.8], [33.4, 38.5]],
  cilicia: [[33.4, 37.1], [34.6, 37.4], [36.2, 37.0], [36.2, 36.5], [34.9, 36.4], [33.6, 36.6]],
  lycia: [[28.9, 36.9], [30.0, 36.9], [30.6, 36.5], [30.1, 36.1], [29.2, 36.1], [28.8, 36.5]],
  philistia: [[34.25, 31.85], [34.95, 31.85], [34.75, 31.25], [34.4, 31.25], [34.2, 31.5]],
  sogdiana: [[64.0, 40.5], [67.0, 40.4], [68.5, 39.5], [67.0, 38.5], [64.5, 39.0]],
  iran: [[46.0, 39.0], [54.0, 37.2], [61.0, 36.2], [61.0, 30.0], [56.0, 27.0], [50.0, 28.0], [46.5, 32.5]],
  gandhara: [[71.0, 34.5], [73.0, 34.2], [73.2, 33.4], [72.0, 33.2], [71.1, 33.8]],
  punjab: [[71.5, 32.6], [75.0, 32.0], [76.0, 30.5], [73.5, 29.6], [71.2, 31.0]],
  sindh: [[67.0, 27.5], [69.5, 27.0], [70.0, 25.0], [68.0, 24.0], [66.8, 25.6]],
  // Nomadic ranges (kind 'range' in geo.ts): the attested roaming envelope, drawn
  // as a dashed open outline on the maps. Same clip as regions (a range is on land).
  scythia: [[29.0, 45.0], [31.0, 47.5], [35.0, 48.8], [40.0, 49.2], [44.5, 48.2], [47.5, 46.8], [44.5, 44.8], [39.5, 45.2], [34.0, 45.2], [31.0, 44.6]],
  cimmerians: [[32.5, 45.0], [34.5, 46.6], [38.5, 46.4], [41.5, 45.4], [39.5, 44.3], [36.0, 44.9], [33.8, 44.4]],
  xiongnu: [[92.0, 44.0], [96.0, 47.5], [102.0, 49.3], [108.0, 49.8], [114.0, 48.3], [118.0, 46.0], [113.0, 44.3], [106.0, 43.3], [99.0, 42.7]],
  yuezhi: [[93.0, 38.6], [97.0, 39.8], [101.0, 40.2], [104.0, 39.6], [102.0, 37.9], [98.0, 37.6], [95.0, 37.4]],
};

// slug -> hull framing a body of water. The DIFFERENCE with land (the inverse
// of the region clip) yields the water polygon, hatched on the maps. Islands
// inside a sea come back as holes and are preserved (evenodd fill). Straits
// and lakes too small for the 50m data (Bosporus, Dead Sea) are deliberately
// absent: with no WATERS entry they keep the point-ring fallback.
const SEA_HULLS = {
  mediterranean: [[-5.4, 35.0], [-5.4, 36.4], [0.0, 39.5], [4.0, 41.5], [7.0, 43.5], [10.5, 44.0], [13.8, 45.8], [15.5, 43.0], [19.0, 41.0], [22.5, 38.0], [26.2, 39.8], [26.2, 40.4], [24.0, 40.7], [26.0, 41.0], [28.3, 40.2], [32.0, 36.5], [36.4, 36.8], [36.4, 31.4], [32.2, 30.9], [27.0, 31.2], [20.0, 30.5], [15.0, 32.0], [10.0, 33.0], [5.0, 35.0], [0.0, 35.0], [-3.0, 34.8]],
  aegean: [[22.8, 35.0], [22.8, 39.2], [23.5, 40.6], [26.2, 40.6], [26.8, 39.6], [28.3, 37.5], [27.5, 35.6], [25.0, 34.6]],
  adriatic: [[12.2, 45.9], [13.9, 45.7], [16.5, 43.7], [18.6, 42.4], [19.7, 41.8], [19.5, 40.3], [18.6, 39.9], [16.8, 41.4], [14.5, 43.2], [12.3, 44.4]],
  'ionian-sea': [[15.3, 36.3], [15.3, 38.4], [16.5, 39.2], [18.4, 40.0], [20.9, 39.3], [21.6, 38.2], [21.9, 36.6], [19.0, 35.8], [16.5, 35.9]],
  'black-sea': [[27.8, 41.1], [27.8, 43.3], [29.5, 46.2], [33.5, 46.4], [36.5, 45.6], [39.5, 47.3], [41.9, 45.0], [41.9, 41.2], [36.0, 41.1], [31.0, 41.1]],
  'caspian-sea': [[46.6, 36.3], [46.6, 44.5], [49.0, 47.3], [53.0, 47.2], [55.2, 45.0], [55.2, 40.0], [53.8, 36.4], [50.0, 36.2]],
  'red-sea': [[32.2, 30.2], [34.0, 29.7], [36.0, 27.5], [39.0, 23.0], [42.0, 15.5], [43.6, 12.4], [44.0, 11.5], [42.5, 11.8], [40.0, 14.5], [37.0, 19.5], [34.5, 24.5], [32.5, 28.5]],
  'persian-gulf': [[47.6, 30.5], [50.0, 30.2], [52.0, 28.0], [55.0, 27.2], [56.8, 27.0], [56.8, 24.2], [54.0, 23.8], [51.0, 24.5], [49.5, 26.5], [47.7, 29.3]],
  marmara: [[26.65, 40.0], [26.65, 40.45], [27.3, 41.0], [28.6, 41.15], [29.6, 41.1], [30.0, 40.75], [29.6, 40.25], [28.2, 40.0], [27.2, 39.9]],
};

const SIMPLIFY = 0.03; // Douglas-Peucker tolerance, matching the coastline's density.

// --- geometry helpers --------------------------------------------------------

function simplify(points, eps) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let dmax = 0, idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = len2 === 0
      ? Math.hypot(px - ax, py - ay)
      : Math.abs((px - ax) * dy - (py - ay) * dx) / Math.sqrt(len2);
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) {
    return simplify(points.slice(0, idx + 1), eps).slice(0, -1).concat(simplify(points.slice(idx), eps));
  }
  return [points[0], points[points.length - 1]];
}

const ringArea = (r) => {
  let a = 0;
  for (let i = 0, n = r.length, j = n - 1; i < n; j = i++) a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]);
  return Math.abs(a) / 2;
};

const closeRing = (r) => (r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1] ? r : [...r, r[0]]);

// --- load land as a polygon-clipping MultiPolygon (outer rings + holes) -------

const topo = JSON.parse(readFileSync(input, 'utf8'));
const land = feature(topo, topo.objects.land);
const geoms = land.type === 'FeatureCollection' ? land.features.map((f) => f.geometry) : [land.geometry];
const landMP = [];
for (const g of geoms) {
  if (g.type === 'Polygon') landMP.push(g.coordinates);
  else if (g.type === 'MultiPolygon') for (const poly of g.coordinates) landMP.push(poly);
}

// --- clip each hull to the land ----------------------------------------------

const out = {};
const summary = [];
for (const [slug, hull] of Object.entries(HULLS)) {
  const clipped = polygonClipping.intersection([closeRing(hull)], landMP);
  // clipped is a MultiPolygon; collect every outer ring and keep the largest by area.
  let best = null, bestA = -1;
  for (const poly of clipped) {
    const outer = poly[0];
    const a = ringArea(outer);
    if (a > bestA) { bestA = a; best = outer; }
  }
  if (!best) { out[slug] = hull; summary.push(`${slug.padEnd(14)} (no land overlap; hull kept)`); continue; }
  // drop the duplicate closing point, simplify, round.
  const open = best[0][0] === best[best.length - 1][0] && best[0][1] === best[best.length - 1][1] ? best.slice(0, -1) : best;
  const simp = simplify([...open, open[0]], SIMPLIFY).slice(0, -1)
    .map(([lon, lat]) => [Math.round(lon * 1000) / 1000, Math.round(lat * 1000) / 1000]);
  out[slug] = simp;
  summary.push(`${slug.padEnd(14)} ${String(hull.length).padStart(2)} hull -> ${String(simp.length).padStart(3)} pts`);
}

const body = Object.entries(out)
  .map(([slug, pts]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(pts)},`)
  .join('\n');
const file = `// Generated by scripts/generate-region-geo.mjs from Natural Earth 50m land
// polygons (public domain, via world-atlas). Do not edit by hand. Each region's
// hand-drawn cultural hull, clipped to the real land so its coastal edges trace
// the true coastline while its inland edges stay approximate (see src/lib/geo.ts).
export const REGIONS: Record<string, [number, number][]> = {
${body}
};
`;
writeFileSync(resolve(ROOT, 'src/lib/regions.ts'), file);
console.log(summary.join('\n'));
console.log(`\nwrote src/lib/regions.ts (${(file.length / 1024).toFixed(1)} KB)`);

// --- clip each sea hull to the WATER (hull minus land) -----------------------

const MIN_OUTER = 0.15; // deg^2: drop slivers the clip leaves along coasts
const MIN_HOLE = 0.05; // deg^2: drop islets too small to read as holes
const simpRing = (ring) => {
  const open = ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1] ? ring.slice(0, -1) : ring;
  return simplify([...open, open[0]], SIMPLIFY).slice(0, -1)
    .map(([lon, lat]) => [Math.round(lon * 1000) / 1000, Math.round(lat * 1000) / 1000]);
};

const waters = {};
const waterSummary = [];
for (const [slug, hull] of Object.entries(SEA_HULLS)) {
  const clipped = polygonClipping.difference([[closeRing(hull)]], landMP);
  const polys = [];
  for (const poly of clipped) {
    const outer = poly[0];
    if (ringArea(outer) < MIN_OUTER) continue;
    const rings = [simpRing(outer)];
    for (const hole of poly.slice(1)) {
      if (ringArea(hole) >= MIN_HOLE) rings.push(simpRing(hole));
    }
    polys.push(rings);
  }
  if (!polys.length) { waterSummary.push(`${slug.padEnd(14)} (no water; skipped)`); continue; }
  waters[slug] = polys;
  const pts = polys.flat().reduce((s, r) => s + r.length, 0);
  waterSummary.push(`${slug.padEnd(14)} ${String(polys.length).padStart(2)} polys, ${String(pts).padStart(4)} pts`);
}

const waterBody = Object.entries(waters)
  .map(([slug, polys]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(polys)},`)
  .join('\n');
const waterFile = `// Generated by scripts/generate-region-geo.mjs from Natural Earth 50m land
// polygons (public domain, via world-atlas). Do not edit by hand. Each sea's
// hand-drawn hull minus the land: the water itself, as a MultiPolygon whose
// holes are islands, hatched on the maps (see src/lib/geo.ts). Straits and
// lakes below the 50m data's resolution are absent by design and keep the
// point-ring fallback.
export const WATERS: Record<string, [number, number][][][]> = {
${waterBody}
};
`;
writeFileSync(resolve(ROOT, 'src/lib/waters.ts'), waterFile);
console.log(waterSummary.join('\n'));
console.log(`\nwrote src/lib/waters.ts (${(waterFile.length / 1024).toFixed(1)} KB)`);
