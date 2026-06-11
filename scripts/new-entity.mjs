#!/usr/bin/env node
// Scaffold a new deliberate record: a civilization (entity) or a language file.
//
//   npm run new:civ  -- <slug> [type]          (type: civilization|city|region|geographic_feature)
//   npm run new:lang -- <slug> [direction]      (direction: ltr|rtl|btt)
//   e.g. npm run new:civ  -- sumer
//        npm run new:civ  -- tigris geographic_feature
//        npm run new:lang -- aramaic rtl
//
// This is the counterpart to new-name.mjs. A name entry is a join record and
// new-name.mjs REFUSES to conjure the civ/lang files it references, because those
// are deliberate authored records. This script scaffolds exactly those records:
// the frontmatter skeleton mirrors the schema in src/content.config.ts, values are
// left blank with TODO markers (so `npm run lint:content` keeps reminding you until
// they are filled), and the body is stubbed as a comment describing its job.
//
// A civilization is publishable at endonym + 2-3 major exonyms; a new language
// carries a backfill obligation. This script does not author those name entries —
// it prints the next step. The judgment (which exonyms, which civs to backfill)
// lives with the author and the onomastikon-new-entity skill.

import { existsSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, relative } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CIV_DIR = resolve(ROOT, 'src/content/civilizations');
const LANG_DIR = resolve(ROOT, 'src/content/languages');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ENTITY_TYPES = ['civilization', 'city', 'region', 'geographic_feature'];
const DIRECTIONS = ['ltr', 'rtl', 'btt'];
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

function fail(message) {
  console.error(`\nRefusing: ${message}\n`);
  process.exit(1);
}

// --- Parse and validate arguments --------------------------------------------
// argv: <kind> <slug> [modifier].  kind is supplied by the npm alias
// (new:civ -> civilization, new:lang -> language), not typed by the user.

const [kind, slug, modifier, ...extra] = process.argv.slice(2);

if (kind !== 'civilization' && kind !== 'language') {
  // Should never happen via the npm aliases; guards direct invocation.
  console.error(
    '\nUsage:' +
      '\n  npm run new:civ  -- <slug> [type]        (type: civilization|city|region|geographic_feature)' +
      '\n  npm run new:lang -- <slug> [direction]   (direction: ltr|rtl|btt)\n'
  );
  process.exit(1);
}

const verb = kind === 'civilization' ? 'new:civ' : 'new:lang';

if (!slug || extra.length > 0) {
  console.error(`\nUsage: npm run ${verb} -- <slug>${kind === 'civilization' ? ' [type]' : ' [direction]'}\n`);
  process.exit(1);
}

if (!SLUG_RE.test(slug)) {
  fail(`"${slug}" is not a valid slug (use lowercase kebab-case).`);
}

// --- Build the record, by kind -----------------------------------------------

let dir, outPath, template, nextSteps;

if (kind === 'civilization') {
  const type = modifier ?? 'civilization';
  if (!ENTITY_TYPES.includes(type)) {
    fail(`"${type}" is not a valid entity type (one of: ${ENTITY_TYPES.join(', ')}).`);
  }

  dir = CIV_DIR;
  outPath = resolve(CIV_DIR, `${slug}.md`);
  if (existsSync(outPath)) fail(`civilization file already exists: ${rel(outPath)}`);

  // Frontmatter mirrors the civilizations schema. era values are 0/TODO like the
  // name scaffold; type is written explicitly even when it is the default, so the
  // file is self-documenting.
  template = `---
english_name: ""        # TODO modern English name for the entity
type: ${type}
entry_status: developing # developing | complete (promote only once every in-inventory language with a real attested name is present)
region: ""              # TODO geographic anchor shown in the page meta line
era_start: 0            # TODO start year of the entity's span (negative = BCE)
era_end: 0              # TODO end year
summary: ""             # TODO one-sentence summary for cards and meta tags
# featured_image: "/${slug}-title.png"   # optional title-card image
---

<!-- Entity-level summary: a longer prose overview, comparable in depth to the name
     entries that will appear below it. Cover what the entity is, its span, and its
     onomastic situation: the endonym, the major exonyms, and the transmission
     story that ties them together. No em dashes; no apologizing for scope. -->
`;

  nextSteps =
    `  1. Fill the frontmatter (replace every TODO) and write the summary prose.\n` +
    `  2. Minimum to publish: endonym + 2-3 major exonyms. Scaffold each name with\n` +
    `       npm run new:name -- ${slug} <lang> <name-slug>\n` +
    `     (each <lang> must already exist in src/content/languages/).\n` +
    `  3. Run npm run lint:content, then astro build.`;
} else {
  const direction = modifier ?? 'ltr';
  if (!DIRECTIONS.includes(direction)) {
    fail(`"${direction}" is not a valid direction (one of: ${DIRECTIONS.join(', ')}).`);
  }

  dir = LANG_DIR;
  outPath = resolve(LANG_DIR, `${slug}.md`);
  if (existsSync(outPath)) fail(`language file already exists: ${rel(outPath)}`);

  // Frontmatter mirrors the languages schema. native_name is commented because it
  // is optional and belongs in the language's own script once known.
  template = `---
english_name: ""        # TODO modern English name of the language
# native_name: ""        # optional; the language's name in its own script
language_family: ""     # TODO e.g. "Indo-European (Iranian)", "Afro-Asiatic (Semitic)"
script: ""              # TODO e.g. "Old Persian cuneiform", "Aramaic alphabet"
lang_code: ""           # TODO BCP-47 / ISO 639-3 code, e.g. grc, akk, hbo
era_start: 0            # TODO start of the language's documented life (negative = BCE)
era_end: 0              # TODO end
direction: ${direction} # ltr | rtl | btt
---

<!-- Prose describing the language, its writing system, and any scholarly
     conventions for representing it in modern texts. -->
`;

  // A new language's whole point is the backfill it enables, so surface the
  // existing civilizations as candidates. Which ones it MEANINGFULLY attests is a
  // judgment call left to the author.
  let civList = '';
  try {
    const civs = readdirSync(CIV_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .sort();
    if (civs.length) civList = `\n  Existing entities to consider for backfill:\n` +
      civs.map((c) => `    - ${c}`).join('\n') + '\n';
  } catch {
    /* civ dir absent; skip the hint */
  }

  nextSteps =
    `  1. Fill the frontmatter (replace every TODO) and write the description prose.\n` +
    `  2. Backfill: a new language obliges you to add name entries for the existing\n` +
    `     entities it meaningfully attests. Scaffold each with\n` +
    `       npm run new:name -- <civ> ${slug} <name-slug>\n` +
    civList +
    `  3. Run npm run lint:content, then astro build.`;
}

// --- Write and report --------------------------------------------------------

writeFileSync(outPath, template);

console.log(`\nCreated ${rel(outPath)}\n\nNext:\n${nextSteps}\n`);
