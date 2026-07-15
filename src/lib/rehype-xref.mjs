// Auto-crossreference filter: a rehype plugin over every rendered content
// body (name entries, civilization summaries, language descriptions) that
// links the first plain-prose mention of any OTHER entity or language to its
// page. The rules that keep it honest:
//
//   - Case-sensitive whole-word matches only ("Media" links, "media" never).
//   - Longest name wins at any position ("Elamite" beats "Elam"; the word
//     boundaries already keep "Elam" out of "Elamite" and "Syria" out of
//     "Assyria").
//   - First occurrence per entry only, Wikipedia-style; an entity page
//     renders many entry bodies, so each entry gets at most one link per
//     target rather than the page drowning in accent.
//   - Never inside <em>/<i> (italics are transliterated forms, not
//     references), never inside existing links, code, or headings.
//   - Never the entry's own subject or its own language (a name file's civ
//     and language are parsed off its filename against the known slug sets),
//     and never a page linking to itself.
//
// The name→slug table is read from the content folders at module load, so a
// new entity or language joins the linker on the next build with no
// registration step. (The dev server caches this at startup; restart it
// after adding entities.)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function frontmatterName(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^english_name:\s*(.+)$/m);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

// Aliases a reader will actually type in prose. Generic rules first (strip
// a leading "The ", strip a trailing " River"), then the hand-checked cases
// where the generic rules would be wrong or unsafe ("Black Sea" must keep
// "Sea"; "Ionian" alone is an adjective; bare "Egyptian" is adjectival).
const SAFE_BARE_SEAS = new Set(['Mediterranean', 'Aegean', 'Adriatic', 'Caspian']);
const EXTRA_ALIASES = {
  'Byzantium / Constantinople': ['Byzantium', 'Constantinople'],
  'Egyptian (Middle Egyptian)': ['Middle Egyptian'],
  'Mount Lebanon': ['Mount Lebanon', 'Lebanon'],
  'Mount Olympus': ['Mount Olympus', 'Olympus'],
  "Chang'an": ["Chang'an", 'Chang’an'],
  'Gandhāra': ['Gandhāra', 'Gandhara'],
  'Geʽez': ['Geʽez', 'Geʿez', "Ge'ez"],
};
// Bare language shorthands prose uses constantly ("the Greek name", "in
// Arabic"). Conservative: only where the bare word can only mean the
// language (or its obvious default file).
const LANGUAGE_SHORTHANDS = {
  Greek: 'ancient-greek',
  Arabic: 'classical-arabic',
  Hebrew: 'biblical-hebrew',
  Aramaic: 'imperial-aramaic',
  Chinese: 'classical-chinese',
  Armenian: 'classical-armenian',
};

function aliasesFor(name) {
  if (EXTRA_ALIASES[name]) return EXTRA_ALIASES[name];
  const out = [name];
  let base = name;
  if (base.startsWith('The ')) {
    base = base.slice(4);
    out.push(base);
  }
  if (base.endsWith(' River')) out.push(base.slice(0, -6));
  if (base.endsWith(' Sea')) {
    const bare = base.slice(0, -4);
    if (SAFE_BARE_SEAS.has(bare)) out.push(bare);
  }
  return out;
}

function loadTargets() {
  const targets = new Map(); // alias -> { href, civSlug?, langSlug? }
  const slugSets = { civ: new Set(), lang: new Set() };
  const dirs = [
    ['src/content/civilizations', '/civilizations/', 'civ'],
    ['src/content/languages', '/languages/', 'lang'],
  ];
  for (const [dir, base, kind] of dirs) {
    for (const f of fs.readdirSync(path.join(ROOT, dir))) {
      if (!f.endsWith('.md')) continue;
      const slug = f.slice(0, -3);
      slugSets[kind].add(slug);
      const name = frontmatterName(path.join(ROOT, dir, f));
      if (!name) continue;
      for (const alias of aliasesFor(name)) {
        // A civilization name never collides with a language name in this
        // corpus (Sumer/Sumerian, Elam/Elamite); if one ever does, first
        // writer wins and the collision is worth hearing about at build.
        if (!targets.has(alias)) targets.set(alias, { href: base + slug, kind, slug });
      }
    }
  }
  for (const [word, slug] of Object.entries(LANGUAGE_SHORTHANDS)) {
    if (slugSets.lang.has(slug) && !targets.has(word)) {
      targets.set(word, { href: '/languages/' + slug, kind: 'lang', slug });
    }
  }
  return { targets, slugSets };
}

const { targets, slugSets } = loadTargets();

// Language names that double as polity adjectives: "the Parthian centuries"
// means the empire, not the tongue. When one of these is followed by a
// polity word, the link swaps to the sibling civilization page.
const LANG_TO_CIV = {
  'ancient-greek': 'greece',
  parthian: 'parthia',
  phoenician: 'phoenicia',
  sumerian: 'sumer',
  akkadian: 'akkad',
  elamite: 'elam',
  hittite: 'hittites',
  etruscan: 'etruscans',
  lycian: 'lycia',
  urartian: 'urartu',
  sogdian: 'sogdiana',
};
const POLITY_CONTEXT =
  /^\s*(empire|empires|kingdom|kingdoms|state|states|era|period|century|centuries|king|kings|queen|dynasty|dynasties|rule|rulers?|court|courts|throne|power|conquest|army|armies|world|heartland|capital|mainland|city|cities|colony|colonies)\b/;
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Hyphens count as word characters at the boundary so royal names like
// Ur-Nanshe or compounds like Greco-Bactrian never get partially linked.
const PATTERN = new RegExp(
  '(?<![\\p{L}\\p{N}-])(' +
    [...targets.keys()].sort((a, b) => b.length - a.length).map(escape).join('|') +
    ')(?![\\p{L}\\p{N}-])',
  'gu'
);

// Elements whose subtrees never get links: existing links, italic forms,
// code, and headings.
const SKIP = new Set(['a', 'em', 'i', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

// A name file is <civ>-<lang>-<name>.md where every part can itself contain
// hyphens; resolve greedily against the known slug sets.
function selfSlugs(filePath) {
  if (!filePath) return { civ: null, lang: null };
  const rel = filePath.split(`src${path.sep}content${path.sep}`)[1];
  if (!rel) return { civ: null, lang: null };
  const [collection, fileName] = rel.split(path.sep);
  const stem = fileName?.replace(/\.md$/, '') ?? '';
  if (collection === 'civilizations') return { civ: stem, lang: null };
  if (collection === 'languages') return { civ: null, lang: stem };
  if (collection === 'names') {
    const civ = [...slugSets.civ].filter((s) => stem.startsWith(s + '-')).sort((a, b) => b.length - a.length)[0];
    const rest = civ ? stem.slice(civ.length + 1) : stem;
    const lang = [...slugSets.lang].filter((s) => rest.startsWith(s + '-')).sort((a, b) => b.length - a.length)[0];
    return { civ: civ ?? null, lang: lang ?? null };
  }
  return { civ: null, lang: null };
}

export default function rehypeXref() {
  return (tree, file) => {
    const self = selfSlugs(file?.path ?? file?.history?.[0]);
    const seen = new Set();

    const excluded = (t) =>
      (t.kind === 'civ' && t.slug === self.civ) || (t.kind === 'lang' && t.slug === self.lang);

    const transformText = (node) => {
      const value = node.value;
      PATTERN.lastIndex = 0;
      let out = [];
      let last = 0;
      let m;
      while ((m = PATTERN.exec(value))) {
        let t = targets.get(m[1]);
        if (t && t.kind === 'lang' && LANG_TO_CIV[t.slug] && POLITY_CONTEXT.test(value.slice(m.index + m[1].length))) {
          const civSlug = LANG_TO_CIV[t.slug];
          t = { href: '/civilizations/' + civSlug, kind: 'civ', slug: civSlug };
        }
        if (!t || excluded(t) || seen.has(t.href)) continue;
        seen.add(t.href);
        if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
        out.push({
          type: 'element',
          tagName: 'a',
          properties: { href: t.href, className: ['xref'] },
          children: [{ type: 'text', value: m[1] }],
        });
        last = m.index + m[1].length;
      }
      if (!out.length) return null;
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
      return out;
    };

    const walk = (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element') {
          if (SKIP.has(child.tagName)) continue;
          walk(child);
        } else if (child.type === 'text') {
          const replaced = transformText(child);
          if (replaced) {
            node.children.splice(i, 1, ...replaced);
            i += replaced.length - 1;
          }
        }
      }
    };

    walk(tree);
  };
}
