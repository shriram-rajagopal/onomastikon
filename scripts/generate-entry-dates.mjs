// Maintains the two freshness ledgers, committed because Vercel's shallow
// clone can't ask git at deploy time:
//
//   src/data/entry-dates.json — the date each entity and language file was
//     first added, keyed by "<collection>/<slug>". Append-only: an entry's
//     "added" date is a historical fact and is never rewritten. Read by the
//     RSS feed and by page schema as datePublished.
//
//   src/data/modified-dates.json — the date each page's content last
//     changed, recomputed on every run. An entity or language page's date is
//     the max over its own file and every name entry that feeds it; name
//     entries also get their own "names/<slug>" key for per-entry citations.
//     Read by page schema (dateModified), the visible "Updated" line,
//     citations, and the sitemap's lastmod.
//
// Run it after adding or editing content: npm run dates:update
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ledgerPath = join(root, 'src/data/entry-dates.json');
const modifiedPath = join(root, 'src/data/modified-dates.json');

const ledger = existsSync(ledgerPath)
  ? JSON.parse(readFileSync(ledgerPath, 'utf8'))
  : {};

const collections = ['civilizations', 'languages'];
const seen = new Set();
let added = 0;

for (const collection of collections) {
  const dir = join(root, 'src/content', collection);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const key = `${collection}/${file.replace(/\.md$/, '')}`;
    seen.add(key);
    if (ledger[key]) continue;
    let date;
    try {
      // Oldest commit touching the file (last line of --follow log) = added.
      const log = execFileSync(
        'git',
        ['log', '--follow', '--diff-filter=A', '--format=%aI', '--', join('src/content', collection, file)],
        { cwd: root, encoding: 'utf8' }
      ).trim();
      date = log.split('\n').filter(Boolean).pop();
    } catch {
      // Not a git checkout (or git unavailable); fall through.
    }
    ledger[key] = (date ?? new Date().toISOString()).slice(0, 10);
    added++;
  }
}

// Drop ledger entries whose files are gone, so renames don't leave ghosts.
const pruned = Object.fromEntries(
  Object.entries(ledger)
    .filter(([key]) => seen.has(key))
    .sort(([a], [b]) => a.localeCompare(b))
);

mkdirSync(dirname(ledgerPath), { recursive: true });
writeFileSync(ledgerPath, JSON.stringify(pruned, null, 2) + '\n');

// ——— Modified dates ———
// One git pass, newest commit first: the first time a path appears is its
// last-commit date. Uncommitted changes stamp today, so regenerating right
// before a content commit lands the correct date.
const lastCommit = new Map();
try {
  const log = execFileSync(
    'git',
    ['log', '--format=%x00%cI', '--name-only', '--', 'src/content'],
    { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  let current = null;
  for (const raw of log.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('\0')) current = line.slice(1, 11);
    else if (line && current && !lastCommit.has(line)) lastCommit.set(line, current);
  }
  const today = new Date().toISOString().slice(0, 10);
  const dirty = execFileSync('git', ['status', '--porcelain', '--', 'src/content'], { cwd: root, encoding: 'utf8' });
  for (const line of dirty.split('\n')) {
    const p = line.slice(3).split(' -> ').pop()?.trim();
    if (p) lastCommit.set(p, today);
  }
} catch {
  // Without git history the map stays empty and pages simply omit the date.
}

const modified = {};
const bump = (key, date) => {
  if (date && (!modified[key] || date > modified[key])) modified[key] = date;
};
for (const key of seen) bump(key, lastCommit.get(`src/content/${key}.md`));
const namesDir = join(root, 'src/content/names');
for (const file of readdirSync(namesDir).filter((f) => f.endsWith('.md'))) {
  const date = lastCommit.get(`src/content/names/${file}`);
  if (!date) continue;
  const src = readFileSync(join(namesDir, file), 'utf8');
  bump(`names/${file.replace(/\.md$/, '')}`, date);
  const civ = src.match(/^civilization:\s*(\S+)/m)?.[1];
  const lang = src.match(/^language:\s*(\S+)/m)?.[1];
  if (civ) bump(`civilizations/${civ}`, date);
  if (lang) bump(`languages/${lang}`, date);
}

const sortedModified = Object.fromEntries(
  Object.entries(modified).sort(([a], [b]) => a.localeCompare(b))
);
writeFileSync(modifiedPath, JSON.stringify(sortedModified, null, 2) + '\n');

console.log(
  `entry-dates: ${Object.keys(pruned).length} entries (${added} added, ${
    Object.keys(ledger).length - Object.keys(pruned).length
  } pruned); modified-dates: ${Object.keys(sortedModified).length} keys`
);
