// Emits a lossless-WebP sibling for every on-page card image: the entity
// title cards (public/*-title.png), the language endonym cards
// (public/languages/*-card.png), and the static masthead wordmark. Pages pick
// the .webp up via cardSrc() (src/lib/cards.ts) when it exists, so running
// this is optional-but-worthwhile after new cards land: npm run cards:webp
// The OG copies under public/og stay PNG — some scrapers still refuse WebP.
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const targets = [
  ...readdirSync(pub).filter((f) => f.endsWith('-title.png')).map((f) => join(pub, f)),
  ...readdirSync(join(pub, 'languages'))
    .filter((f) => f.endsWith('.png'))
    .map((f) => join(pub, 'languages', f)),
  join(pub, 'onomastikon-logo.png'),
];

let converted = 0;
let skipped = 0;
for (const png of targets) {
  const webp = png.replace(/\.png$/, '.webp');
  // Re-encode only when the PNG is newer than its WebP (or the WebP is absent).
  if (existsSync(webp) && statSync(webp).mtimeMs >= statSync(png).mtimeMs) {
    skipped++;
    continue;
  }
  const before = statSync(png).size;
  await sharp(png).webp({ lossless: true }).toFile(webp);
  const after = statSync(webp).size;
  console.log(
    `${png.slice(pub.length + 1)} → webp  ${(before / 1024).toFixed(0)}K → ${(after / 1024).toFixed(0)}K`
  );
  converted++;
}
console.log(`cards:webp — ${converted} converted, ${skipped} up to date`);
