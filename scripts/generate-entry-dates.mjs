// Maintains src/data/entry-dates.json: the date each entity and language file
// was first added, keyed by "<collection>/<slug>". The RSS feed reads this
// ledger, because frontmatter carries no dates and Vercel's shallow clone
// can't ask git at deploy time.
//
// Idempotent and append-only: existing dates are never rewritten (an entry's
// "added" date is a historical fact), files no longer on disk are dropped,
// and new files get their first-commit date from git — or today, for a file
// not yet committed. Run it after adding entries: npm run dates:update
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ledgerPath = join(root, 'src/data/entry-dates.json');

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
console.log(
  `entry-dates: ${Object.keys(pruned).length} entries (${added} added, ${
    Object.keys(ledger).length - Object.keys(pruned).length
  } pruned)`
);
