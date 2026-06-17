#!/usr/bin/env node
// Batch-render language endonym cards from a manifest, through the LanguageTitleCard
// composition. Sibling of render-title-cards.mjs (which renders civ entity cards).
//
//   node scripts/render-language-cards.mjs <manifest.json> [--dry-run]
//   e.g. node scripts/render-language-cards.mjs language-cards.json
//
// Manifest is a JSON array; each card supplies the LanguageTitleCard props plus the
// language slug that names the output PNG:
//
//   [
//     { "slug": "syriac", "script": "syriac", "glyphs": "ܣܘܪܝܝܐ",
//       "romanization": "Suryāyā", "name": "Syriac",
//       "meta": "Syriac alphabet · Northwest Semitic · c. 100–700 CE" }
//   ]
//
// Output goes to ../public/languages/<slug>-card.png, the path the languages schema's
// featured_image points at. Only languages whose native_name is a real original-script
// endonym belong here; Parthian/Demotic/Ugaritic (no native_name) and Akkadian/Egyptian
// (native_name stored romanized) are deliberately absent.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "../public/languages");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SCRIPTS = [
  "greek",
  "latin",
  "coptic",
  "hebrew",
  "arabic",
  "syriac",
  "devanagari",
  "ethiopic",
  "chinese",
  "phoenician",
  "cuneiform",
  "old-persian",
  "inscriptional-pahlavi",
  "egyptian-hieroglyphs",
  "ugaritic",
  "inscriptional-parthian",
  "avestan",
];
const rel = (p) => relative(ROOT, p).replace(/\\/g, "/");

function fail(message) {
  console.error(`\nRefusing: ${message}\n`);
  process.exit(1);
}

const [manifestArg, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");

if (!manifestArg) {
  console.error("\nUsage: node scripts/render-language-cards.mjs <manifest.json> [--dry-run]\n");
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

// Validate every card up front so a typo in card 16 fails before card 1 renders.
cards.forEach((c, i) => {
  for (const key of ["slug", "script", "glyphs", "name", "meta"]) {
    if (typeof c[key] !== "string" || c[key] === "") fail(`card ${i}: missing or empty "${key}".`);
  }
  // romanization is optional: Latin-script endonyms (Lingua Latina) omit it. If
  // present it must be a non-empty string.
  if ("romanization" in c && (typeof c.romanization !== "string" || c.romanization === ""))
    fail(`card ${i}: "romanization" must be a non-empty string if present (omit it entirely for Latin-script endonyms).`);
  if (!SLUG_RE.test(c.slug)) fail(`card ${i}: "${c.slug}" is not a valid slug (lowercase kebab-case).`);
  if (!SCRIPTS.includes(c.script)) fail(`card ${i} (${c.slug}): script "${c.script}" is not one of ${SCRIPTS.join(", ")}.`);
});

if (!dryRun) mkdirSync(OUT_DIR, { recursive: true });

console.log(`\nRendering ${cards.length} language card(s) to ${rel(OUT_DIR)}/${dryRun ? "  (dry run)" : ""}\n`);

for (const { slug, ...props } of cards) {
  const out = resolve(OUT_DIR, `${slug}-card.png`);
  // Remotion merges --props over the composition's defaultProps, so an omitted
  // romanization would fall back to the default rather than emptying the line.
  // Normalize a missing value to "" so Latin-script endonyms render without it.
  if (props.romanization === undefined) props.romanization = "";
  const propsJson = JSON.stringify(props);
  if (dryRun) {
    console.log(`  would render ${slug} -> ${rel(out)}  ${propsJson}`);
    continue;
  }
  process.stdout.write(`  ${slug} ... `);
  execFileSync("npx", ["remotion", "still", "LanguageTitleCard", out, `--props=${propsJson}`], {
    cwd: ROOT,
    stdio: ["ignore", "ignore", "inherit"],
  });
  console.log(`done -> ${rel(out)}`);
}

console.log("");
