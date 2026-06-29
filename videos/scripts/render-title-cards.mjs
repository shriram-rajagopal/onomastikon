#!/usr/bin/env node
// Batch-render per-entity title cards from a manifest, through the data-driven
// TitleCard composition.
//
//   node scripts/render-title-cards.mjs <manifest.json> [--dry-run]
//   e.g. node scripts/render-title-cards.mjs title-cards.json
//
// The manifest is a JSON array of cards. Each card supplies the four props the
// TitleCard composition takes plus the entity slug that names the output PNG:
//
//   [
//     { "slug": "persia", "script": "old-persian",
//       "glyphs": "𐎱𐎠𐎼𐎿", "transliteration": "Pārsa", "label": "Persia" }
//   ]
//
// Output goes to ../public/<slug>-title.png, the path the civilizations schema's
// featured_image points at. This script does not invent card data; it renders what
// the manifest lists. (A future step can derive the manifest from each entity's
// endonym name entry instead of maintaining it by hand.)

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = resolve(ROOT, "../public");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SCRIPTS = ["egyptian-hieroglyphs", "old-persian", "cuneiform", "phoenician", "hebrew", "avestan", "old-italic", "inscriptional-parthian", "devanagari", "chinese", "lycian", "armenian", "greek", "latin"];
const rel = (p) => relative(ROOT, p).replace(/\\/g, "/");

function fail(message) {
  console.error(`\nRefusing: ${message}\n`);
  process.exit(1);
}

const [manifestArg, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");

if (!manifestArg) {
  console.error("\nUsage: node scripts/render-title-cards.mjs <manifest.json> [--dry-run]\n");
  process.exit(1);
}

const manifestPath = resolve(process.cwd(), manifestArg);
if (!existsSync(manifestPath)) fail(`manifest not found: ${manifestArg}`);

let cards;
try {
  cards = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch (e) {
  fail(`manifest is not valid JSON: ${e.message}`);
}
if (!Array.isArray(cards) || cards.length === 0) fail("manifest must be a non-empty JSON array.");

// Validate every card up front so a typo in card 30 fails before card 1 renders.
cards.forEach((c, i) => {
  for (const key of ["slug", "script", "glyphs", "language", "label"]) {
    if (typeof c[key] !== "string" || c[key] === "") fail(`card ${i}: missing or empty "${key}".`);
  }
  // transliteration is optional: Latin-script endonyms omit it (the original already
  // is the romanization). If present it must be a non-empty string.
  if ("transliteration" in c && (typeof c.transliteration !== "string" || c.transliteration === ""))
    fail(`card ${i}: "transliteration" must be a non-empty string if present (omit it entirely for Latin-script endonyms).`);
  if (!SLUG_RE.test(c.slug)) fail(`card ${i}: "${c.slug}" is not a valid slug (lowercase kebab-case).`);
  if (!SCRIPTS.includes(c.script)) fail(`card ${i} (${c.slug}): script "${c.script}" is not one of ${SCRIPTS.join(", ")}.`);
});

console.log(`\nRendering ${cards.length} title card(s) to ${rel(PUBLIC_DIR)}/${dryRun ? "  (dry run)" : ""}\n`);

for (const { slug, ...props } of cards) {
  const out = resolve(PUBLIC_DIR, `${slug}-title.png`);
  // Remotion merges --props over the composition's defaultProps, so an omitted
  // transliteration would fall back to the default rather than emptying the line.
  // Normalize a missing value to "" so Latin-script endonyms render without it.
  if (props.transliteration === undefined) props.transliteration = "";
  const propsJson = JSON.stringify(props);
  if (dryRun) {
    console.log(`  would render ${slug} -> ${rel(out)}  ${propsJson}`);
    continue;
  }
  process.stdout.write(`  ${slug} ... `);
  // Renders the single TitleCard composition with this card's props. Relies on the
  // remotion CLI being available in the videos project (npm install first).
  execFileSync("npx", ["remotion", "still", "TitleCard", out, `--props=${propsJson}`], {
    cwd: ROOT,
    stdio: ["ignore", "ignore", "inherit"],
  });
  console.log(`done -> ${rel(out)}`);
}

console.log("");
