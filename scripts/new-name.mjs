#!/usr/bin/env node
// Scaffold a new name entry: src/content/names/<civ>-<lang>-<slug>.md
//
//   npm run new:name -- <civ> <lang> <slug>
//   e.g. npm run new:name -- egypt old-persian parsa
//
// A name entry is a join record: it presupposes that BOTH its civilization file
// and its (phase-specific) language file already exist. This scaffold enforces
// that ordering as a hard gate. If a referenced file is missing it REFUSES and
// prints what to create — it never auto-creates the language or civilization
// file, because those are deliberate authored records (a language carries its
// own backfill obligation), not side effects of writing a name entry.

import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, relative } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CIV_DIR = resolve(ROOT, 'src/content/civilizations');
const LANG_DIR = resolve(ROOT, 'src/content/languages');
const NAME_DIR = resolve(ROOT, 'src/content/names');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

function fail(message) {
  console.error(`\nRefusing: ${message}\n`);
  process.exit(1);
}

// --- Parse and validate arguments --------------------------------------------

const [civ, lang, slug, ...extra] = process.argv.slice(2);

if (!civ || !lang || !slug || extra.length > 0) {
  console.error(
    '\nUsage: npm run new:name -- <civ> <lang> <slug>' +
      '\n  e.g. npm run new:name -- egypt old-persian parsa\n'
  );
  process.exit(1);
}

for (const [label, value] of [['civ', civ], ['lang', lang], ['slug', slug]]) {
  if (!SLUG_RE.test(value)) {
    fail(`"${value}" is not a valid ${label} slug (use lowercase kebab-case).`);
  }
}

// --- Gate 1: the civilization (entity) file must exist ------------------------

if (!existsSync(resolve(CIV_DIR, `${civ}.md`))) {
  fail(
    `civilization file "${civ}" does not exist.\n` +
      `  Expected: ${rel(resolve(CIV_DIR, `${civ}.md`))}\n` +
      `  Create the entity file first, with frontmatter:\n` +
      `    english_name    (string)\n` +
      `    type            (civilization | city | region | geographic_feature)\n` +
      `    entry_status    (developing | complete, default developing)\n` +
      `    era_start       (number, negative = BCE)\n` +
      `    era_end         (number)\n` +
      `    summary         (string)\n` +
      `    featured_image  (string, optional)`
  );
}

// --- Gate 2: the phase-specific language file must exist ----------------------
// This is the gate that matters most: language refs are phase-grained, and a
// language is a deliberate addition, never conjured from a name slug.

if (!existsSync(resolve(LANG_DIR, `${lang}.md`))) {
  fail(
    `language file "${lang}" does not exist in src/content/languages/.\n` +
      `  Expected: ${rel(resolve(LANG_DIR, `${lang}.md`))}\n` +
      `  Create the language file first — a language is a deliberate addition\n` +
      `  with its own backfill obligation, not a side effect of a name entry.\n` +
      `  Required frontmatter fields:\n` +
      `    english_name    (string)\n` +
      `    native_name     (string, optional)\n` +
      `    language_family (string)\n` +
      `    script          (string)\n` +
      `    era_start       (number, negative = BCE)\n` +
      `    era_end         (number)\n` +
      `    direction       (ltr | rtl | btt, default ltr)`
  );
}

// --- Gate 3: do not overwrite an existing name entry --------------------------

const outPath = resolve(NAME_DIR, `${civ}-${lang}-${slug}.md`);
if (existsSync(outPath)) {
  fail(`name entry already exists: ${rel(outPath)}`);
}

// --- Write the skeleton -------------------------------------------------------
// Frontmatter mirrors the names schema in src/content.config.ts. Strings are
// left empty and the two paragraphs are stubbed as comments describing their
// job; the author fills them in. transliteration/ipa hold bare values (prefix a
// reconstructed form with a single * in the value); confidence is a plain enum.

const template = `---
civilization: ${civ}
language: ${lang}
original_text: ""
transliteration: ""
# ipa: ""               # optional; prefix a reconstructed form with *, e.g. "*kuːmat"
# literal_meaning: ""   # optional
era_start: 0            # TODO attestation start of the NAME (negative = BCE)
era_end: 0              # TODO attestation end of the NAME
confidence: attested    # attested | reconstructed | disputed
sources:
  - citation: ""
---

<!-- Paragraph 1 — linguistic and attestational facts: the form, its derivation,
     dates, attestation context, and sources. Concrete and well-grounded. -->

<!-- Paragraph 2 — philological significance: what makes this entry distinctive,
     how it relates to the larger pattern on the page. End on a memorable
     observation that crystallizes the entry's significance. -->
`;

writeFileSync(outPath, template);

console.log(
  `\nCreated ${rel(outPath)}\n` +
    `  Anchor on the entity page: #${lang}-${slug}\n` +
    `  Next: fill in original_text, transliteration, era_start/era_end, sources,\n` +
    `  and the two paragraphs. Replace the TODO era values before building.\n` +
    `  If the form shares a root with others on the page, set family: (and\n` +
    `  derived_from: only where the prose asserts the borrowing unhedged and the\n` +
    `  parent entry exists); a new family slug needs a label in src/lib/families.ts.\n`
);
