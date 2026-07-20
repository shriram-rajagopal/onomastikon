#!/usr/bin/env node
// Bake accurate river courses for the transmission map's feature locators from
// Natural Earth 10m river centerlines into src/lib/rivers.ts.
//
//   curl -sL -o /tmp/ne_rivers.geojson \
//     https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson
//   node scripts/generate-feature-geo.mjs /tmp/ne_rivers.geojson
//
// A river is a real physical line, so its locator should trace the true course,
// not a few hand-drawn segments. We pull the named river, chain its line
// segments into one ordered polyline, optionally clip it to its ancient-relevant
// extent, and Douglas-Peucker it to a density that reads smooth at map scale
// (the coastline stays stylized; only these feature courses are accurate).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [, , input] = process.argv;
if (!input) {
  console.error('usage: node scripts/generate-feature-geo.mjs <ne_rivers.geojson>');
  process.exit(1);
}

// slug -> { names, clip? }. clip trims the course to its ancient-relevant box so
// a long river (the Nile, to the equatorial lakes) doesn't blow up its map.
const RIVERS = {
  nile: { names: ['Nile'], clip: { latMin: 13 } },
  tigris: { names: ['Tigris'] },
  euphrates: { names: ['Euphrates'] },
  jordan: { names: ['Jordan'] },
  po: { names: ['Po'] },
  tiber: { names: ['Tevere'] },
  indus: { names: ['Indus'] },
  ganges: { names: ['Ganges'] },
  yamuna: { names: ['Yamuna'] },
  guadalquivir: { names: ['Guadalquivir'] },
};

const SIMPLIFY = 0.04; // Douglas-Peucker tolerance in degrees; finer than this is
                       // invisible at continental map scale.

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function segmentsOf(feat) {
  const g = feat.geometry;
  if (g.type === 'LineString') return [g.coordinates];
  if (g.type === 'MultiLineString') return g.coordinates.slice();
  return [];
}

// Greedily chain line segments into one ordered polyline by joining nearest
// endpoints (handles a river stored as several out-of-order segments).
function chain(segments) {
  if (!segments.length) return [];
  const segs = segments.map((s) => s.slice());
  let out = segs.shift();
  let progress = true;
  while (segs.length && progress) {
    progress = false;
    const head = out[0];
    const tail = out[out.length - 1];
    let bi = -1;
    let bd = Infinity;
    let mode = '';
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      const sh = s[0];
      const st = s[s.length - 1];
      const opts = [
        [dist(tail, sh), 'tail-head'],
        [dist(tail, st), 'tail-tail'],
        [dist(head, sh), 'head-head'],
        [dist(head, st), 'head-tail'],
      ];
      for (const [d, m] of opts) if (d < bd) { bd = d; bi = i; mode = m; }
    }
    if (bi >= 0 && bd < 1.5) {
      const s = segs.splice(bi, 1)[0];
      if (mode === 'tail-head') out = out.concat(s.slice(1));
      else if (mode === 'tail-tail') out = out.concat(s.slice(0, -1).reverse());
      else if (mode === 'head-head') out = s.slice(1).reverse().concat(out);
      else out = s.slice(0, -1).concat(out);
      progress = true;
    }
  }
  return out;
}

function simplify(points, eps) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let dmax = 0;
  let idx = 0;
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

const geo = JSON.parse(readFileSync(input, 'utf8'));
const out = {};
const summary = [];
for (const [slug, cfg] of Object.entries(RIVERS)) {
  const feats = geo.features.filter((f) => {
    const p = f.properties;
    const nm = p.name || p.name_en || '';
    return cfg.names.includes(nm);
  });
  const segs = feats.flatMap(segmentsOf);
  let course = chain(segs);
  if (cfg.clip) {
    const c = cfg.clip;
    course = course.filter(([lon, lat]) =>
      (c.lonMin == null || lon >= c.lonMin) && (c.lonMax == null || lon <= c.lonMax) &&
      (c.latMin == null || lat >= c.latMin) && (c.latMax == null || lat <= c.latMax));
  }
  const simp = simplify(course, SIMPLIFY).map(([lon, lat]) => [Math.round(lon * 1000) / 1000, Math.round(lat * 1000) / 1000]);
  out[slug] = simp;
  let loMin = Infinity, loMax = -Infinity, laMin = Infinity, laMax = -Infinity;
  for (const [lo, la] of simp) { loMin = Math.min(loMin, lo); loMax = Math.max(loMax, lo); laMin = Math.min(laMin, la); laMax = Math.max(laMax, la); }
  summary.push(`${slug.padEnd(10)} ${feats.length} feat -> ${String(simp.length).padStart(3)} pts  lon ${loMin.toFixed(1)}..${loMax.toFixed(1)}  lat ${laMin.toFixed(1)}..${laMax.toFixed(1)}`);
}

const body = Object.entries(out)
  .map(([slug, pts]) => `  ${slug}: ${JSON.stringify(pts)},`)
  .join('\n');
const file = `// Generated by scripts/generate-feature-geo.mjs from Natural Earth 10m river
// centerlines (public domain). Do not edit by hand. Accurate true-lon/lat
// courses for the transmission-map river locators (see src/lib/geo.ts).
export const RIVERS: Record<string, [number, number][]> = {
${body}
};
`;
writeFileSync(resolve(ROOT, 'src/lib/rivers.ts'), file);
console.log(summary.join('\n'));
console.log(`\nwrote src/lib/rivers.ts (${(file.length / 1024).toFixed(1)} KB)`);
