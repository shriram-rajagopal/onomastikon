#!/usr/bin/env node
// Mechanical content lint for Onomastikon entries.
//
//   npm run lint:content
//
// STRICTLY MECHANICAL by design: it only enforces pattern-matchable rules.
// Judgment-based prose rules (no apologizing for inclusion, "ends on a memorable
// observation," scholarly-but-not-posturing tone) are deliberately NOT checked —
// a linter that pretends to judge those produces false positives that train you
// to ignore it. Those rules stay with the author and reviewer.
//
// It also complements the schema rather than duplicating it: `astro build`
// already enforces types, enums, and required fields, so this targets what the
// schema cannot express (cross-field ordering, em dashes, asterisk hygiene,
// emptiness, leftover scaffolding).

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, relative, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = resolve(ROOT, 'src/content');
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

// Collections to scan, and which field-level checks apply to each.
const COLLECTIONS = [
  { dir: 'civilizations', kind: 'entity' },
  { dir: 'languages', kind: 'language' },
  { dir: 'names', kind: 'name' },
];

const violations = [];
let fileCount = 0;

function flag(file, line, message) {
  violations.push({ file: rel(file), line, message });
}

// --- Small frontmatter helpers (no YAML dependency) --------------------------
// The fields these read are always simple single-line scalars in this project,
// so targeted matching is safe and avoids a parser dependency.

function splitFrontmatter(lines) {
  if (lines[0] !== '---') return { fm: '', fmEnd: 0 };
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') return { fm: lines.slice(1, i).join('\n'), fmEnd: i };
  }
  return { fm: '', fmEnd: 0 };
}

function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return null;
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

function intField(fm, key) {
  // Captures the integer even if a trailing "# comment" follows the value.
  const m = fm.match(new RegExp(`^${key}:\\s*(-?\\d+)`, 'm'));
  return m ? parseInt(m[1], 10) : null;
}

// A single leading "*" marks a reconstructed form and is legitimate notation.
// Anything else (wrapping markdown italics, interior asterisks) is not.
function asteriskHygiene(value) {
  const count = (value.match(/\*/g) || []).length;
  if (count === 0) return true;
  return count === 1 && value[0] === '*';
}

// --- Lint one file -----------------------------------------------------------

function lintFile(path, kind) {
  fileCount++;
  const text = readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  const { fm } = splitFrontmatter(lines);

  // Whole-file scans (apply to every collection): em dashes and TODO markers.
  lines.forEach((line, i) => {
    if (line.includes('—')) flag(path, i + 1, 'em dash (—) in content; use commas, semicolons, or a sentence break');
    if (line.includes('TODO')) flag(path, i + 1, 'leftover TODO marker');
  });

  // Cross-field era ordering (all three collections carry these fields).
  const eraStart = intField(fm, 'era_start');
  const eraEnd = intField(fm, 'era_end');
  if (eraStart !== null && eraEnd !== null && eraStart > eraEnd) {
    flag(path, null, `era_start (${eraStart}) is after era_end (${eraEnd})`);
  }

  // Entity-only: the region label is shown as a standalone descriptor in the page
  // meta line, so it reads as a label and must start with a capital letter
  // ("Central Italy ...", not "central Italy ..."). Proper-noun starts already pass.
  if (kind === 'entity') {
    const region = scalar(fm, 'region');
    if (region && /^\p{Ll}/u.test(region)) {
      flag(path, null, `region "${region}" should start with a capital letter`);
    }
  }

  if (kind !== 'name') return;

  // --- Name-only field checks ---
  const original = scalar(fm, 'original_text');
  const unencodable = scalar(fm, 'script_unencodable') === 'true';
  if (original !== null && original === '' && !unencodable)
    flag(path, null, 'original_text is empty (set script_unencodable: true only if the script has no usable Unicode representation)');
  if (original !== null && original !== '' && unencodable)
    flag(path, null, 'script_unencodable is set but original_text is non-empty');

  const translit = scalar(fm, 'transliteration');
  if (translit !== null) {
    if (translit === '') flag(path, null, 'transliteration is empty');
    else if (!asteriskHygiene(translit))
      flag(path, null, `transliteration "${translit}" has stray asterisks; reconstruction uses a single leading * and italics are not stored in the value`);
  }

  const ipa = scalar(fm, 'ipa');
  if (ipa !== null && ipa !== '' && !asteriskHygiene(ipa)) {
    flag(path, null, `ipa "${ipa}" has stray asterisks; reconstruction uses a single leading *`);
  }

  // literal_meaning is rendered as plain text by the entity page, so markdown
  // asterisks (e.g. *mṣr*) would print literally. Forms in the gloss stay unmarked.
  const lit = scalar(fm, 'literal_meaning');
  if (lit && lit.includes('*'))
    flag(path, null, `literal_meaning "${lit}" contains '*'; this field renders as plain text, so write any form without markdown italics`);

  // Unicode normalization. Original scripts and romanizations carry combining
  // marks (emphatic ṣ, pharyngeal ḥ, vowel length aː, Greek breathings). The same
  // glyph can be stored pre-composed (NFC) or decomposed (NFD); they look identical
  // but compare unequal, so a stray NFD value silently breaks cross-entry matching
  // and the search index. Require NFC for the text-bearing fields.
  for (const key of ['original_text', 'transliteration', 'ipa', 'literal_meaning']) {
    const v = scalar(fm, key);
    if (v && v !== v.normalize('NFC')) {
      flag(path, null, `${key} is not in Unicode NFC form; normalize it (NFD combining marks won't match across entries or in search)`);
    }
  }

  // At least one source, each with a non-empty citation.
  const citations = [...fm.matchAll(/^\s*-\s*citation:\s*(.*)$/gm)].map((m) => {
    let v = m[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    return v;
  });
  if (citations.length === 0) flag(path, null, 'no sources (need at least one citation)');
  else if (citations.some((c) => c === '')) flag(path, null, 'a source has an empty citation');
}

// --- Walk the collections ----------------------------------------------------

for (const { dir, kind } of COLLECTIONS) {
  const abs = join(CONTENT, dir);
  let entries;
  try {
    entries = readdirSync(abs);
  } catch {
    continue; // collection dir absent; skip
  }
  for (const file of entries) {
    if (file.endsWith('.md')) lintFile(join(abs, file), kind);
  }
}

// --- Report ------------------------------------------------------------------

if (violations.length === 0) {
  console.log(`\nContent lint: ${fileCount} files checked, no issues.\n`);
  process.exit(0);
}

const byFile = new Map();
for (const v of violations) {
  if (!byFile.has(v.file)) byFile.set(v.file, []);
  byFile.get(v.file).push(v);
}

console.error(`\nContent lint: ${violations.length} issue(s) in ${byFile.size} file(s):\n`);
for (const [file, vs] of byFile) {
  console.error(`  ${file}`);
  for (const v of vs) {
    console.error(`    ${v.line ? `line ${v.line}: ` : ''}${v.message}`);
  }
}
console.error('');
process.exit(1);
