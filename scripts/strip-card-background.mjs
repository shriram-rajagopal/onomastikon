#!/usr/bin/env node
// Convert the title-card PNGs from opaque parchment to true transparency.
//
//   npm run strip:cards
//
// The Remotion compositions fill cards with parchment (#f5efe4) so the same
// PNG can serve as an Open Graph image, which must be opaque. On the page,
// though, an opaque card can never sit seamlessly on the dark theme: the
// invert filter maps baked parchment to a near-but-not-equal dark, leaving a
// visible plate. This script keeps both uses working:
//
//   1. The original opaque render is preserved under public/og/<same path>,
//      which the og_image frontmatter field points at.
//   2. The public/ copy is rewritten with the parchment background removed by
//      exact color-to-alpha un-blending: every card pixel is a flat foreground
//      color composited over the known constant background, so solving
//      R = a*F + (1-a)*B for the most-transparent (a, F) reproduces the
//      original exactly when re-composited over parchment, and composites
//      correctly over any other ground (the dark theme's, in particular).
//
// Idempotent: a PNG that already contains transparent pixels is skipped, so
// re-running after a fresh opaque render only processes the new cards.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = resolve(ROOT, 'public');
const OG_DIR = resolve(PUBLIC, 'og');
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

// Parchment, the constant background the compositions paint (sRGB bytes).
const BG = [245, 239, 228];

// Card PNGs: the entity title cards and the language endonym cards. The
// homepage logo is already transparent and og-default.png is OG-only.
import { readdirSync } from 'node:fs';
const targets = [
  ...readdirSync(PUBLIC).filter((f) => f.endsWith('-title.png')).map((f) => join(PUBLIC, f)),
  ...readdirSync(join(PUBLIC, 'languages')).filter((f) => f.endsWith('-card.png')).map((f) => join(PUBLIC, 'languages', f)),
];

let processed = 0;
let skipped = 0;

for (const path of targets) {
  const png = PNG.sync.read(readFileSync(path));
  const d = png.data;

  // Already transparent anywhere? Then it has been processed; skip.
  let opaque = true;
  for (let i = 3; i < d.length; i += 4) {
    if (d[i] < 255) { opaque = false; break; }
  }
  if (!opaque) { skipped++; continue; }

  // Preserve the opaque original for Open Graph use.
  const ogPath = join(OG_DIR, relative(PUBLIC, path));
  mkdirSync(dirname(ogPath), { recursive: true });
  writeFileSync(ogPath, PNG.sync.write(png));

  // Color-to-alpha against the known parchment background.
  for (let i = 0; i < d.length; i += 4) {
    let a = 0;
    for (let c = 0; c < 3; c++) {
      const v = Math.min(d[i + c], BG[c]); // cards have no pixel lighter than parchment
      const ac = (BG[c] - v) / BG[c];
      if (ac > a) a = ac;
    }
    if (a <= 0) {
      d[i + 3] = 0;
      continue;
    }
    for (let c = 0; c < 3; c++) {
      const v = Math.min(d[i + c], BG[c]);
      d[i + c] = Math.max(0, Math.min(255, Math.round((v - (1 - a) * BG[c]) / a)));
    }
    d[i + 3] = Math.round(a * 255);
  }

  writeFileSync(path, PNG.sync.write(png));
  processed++;
  console.log(`stripped ${rel(path)} (original kept at ${rel(ogPath)})`);
}

console.log(`\n${processed} card(s) processed, ${skipped} already transparent.`);
