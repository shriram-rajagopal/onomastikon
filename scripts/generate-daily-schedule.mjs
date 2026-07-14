// Maintains src/data/daily-schedule.json: the name-of-the-day schedule as
// rounds of picks, one name per US-Eastern day. This is the fix for the
// corpus-growth caveat — a pure function of (day, corpus) forgets who already
// had a turn whenever the corpus changes, so the schedule is stateful instead,
// with card-dealing semantics:
//
//   - Days already dealt (before today) are FROZEN history and never move.
//   - New names are inserted at seeded positions in the UNDEALT tail of the
//     current round, so they get their turn this round without costing anyone
//     else theirs. Every name still gets exactly one turn per round.
//   - Deleted names are dropped from undealt days only; history stands.
//   - Future rounds are fresh seeded shuffles of the full pool, appended
//     until the schedule covers a comfortable horizon past today.
//
// Every mutation is seeded from stable values (round start day, name URL), so
// any build machine regenerates the identical file — a forgotten commit costs
// nothing. Corpus changes always arrive via a build, which is exactly when
// this runs (prebuild). Committing the ledger keeps it inspectable and makes
// the guarantee survive even generator changes.
//
// Run directly: npm run schedule:update
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ledgerPath = join(root, 'src/data/daily-schedule.json');

// How far past today the schedule must reach. The client falls back to a
// hash pick beyond the horizon, which only matters if the site goes this
// long without a single build.
const HORIZON_DAYS = 500;

// ---------------------------------------------------------------------------
// Deterministic helpers (exported for the simulation test).

export const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const fnv = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h | 0;
};

export const shuffled = (pool, seed) => {
  const arr = [...pool];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const k = Math.floor(rand() * (i + 1));
    [arr[i], arr[k]] = [arr[k], arr[i]];
  }
  return arr;
};

/** Today as a running day count, rolling at midnight US Eastern. */
export const nyDay = (now = new Date()) => {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' })
    .format(now)
    .split('-')
    .map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
};

// ---------------------------------------------------------------------------
// The core update, pure so the simulation test can drive it with fake pools
// and clocks: takes the previous ledger, the current pool (sorted URLs), and
// today's day number; returns the synced ledger.

export function updateSchedule(ledger, pool, today) {
  const poolSet = new Set(pool);
  // Keep the round containing today and everything after; completed rounds
  // are history the round-fairness guarantee no longer needs.
  let rounds = (ledger?.rounds ?? []).filter((r) => r.start + r.picks.length > today);
  if (!rounds.length || rounds[0].start > today) {
    rounds = [{ start: today, picks: shuffled(pool, today) }];
  }

  for (const r of rounds) {
    // Through today inclusive: today's pick may already be on screen.
    const frozenCount = Math.max(0, Math.min(today - r.start + 1, r.picks.length));
    const frozen = r.picks.slice(0, frozenCount);
    // Today's own pick must still resolve; replace it (seeded) if deleted.
    if (frozenCount > 0 && !poolSet.has(frozen[frozenCount - 1])) {
      const used = new Set(frozen);
      const candidates = pool.filter((p) => !used.has(p));
      if (candidates.length) {
        frozen[frozenCount - 1] =
          candidates[Math.floor(mulberry32(r.start ^ today)() * candidates.length)];
      }
    }
    const seen = new Set(frozen);
    // Undealt tail: drop deletions and anything already dealt this round.
    const tail = r.picks.slice(frozenCount).filter((p) => poolSet.has(p) && !seen.has(p));
    tail.forEach((p) => seen.add(p));
    // New names: a seeded slot in the undealt tail, one turn like everyone.
    for (const p of pool) {
      if (seen.has(p)) continue;
      const pos = Math.floor(mulberry32(fnv(p) ^ Math.imul(r.start, 2654435761))() * (tail.length + 1));
      tail.splice(pos, 0, p);
      seen.add(p);
    }
    r.picks = frozen.concat(tail);
  }

  // Future rounds keep consecutive starts after the syncs above resized picks.
  for (let i = 1; i < rounds.length; i++) {
    rounds[i].start = rounds[i - 1].start + rounds[i - 1].picks.length;
  }
  // Extend coverage to the horizon with fresh full-pool shuffles.
  let end = rounds[rounds.length - 1].start + rounds[rounds.length - 1].picks.length;
  while (end < today + HORIZON_DAYS && pool.length) {
    rounds.push({ start: end, picks: shuffled(pool, end) });
    end += pool.length;
  }
  return { rounds };
}

// ---------------------------------------------------------------------------
// Pool: the same URLs the search index emits for name records, in the same
// URL-sorted order the homepage resolves indices against.
//
// Eligibility: only names with an original-script form. The card leads with
// the script at 3rem; a name whose original is unencodable (empty
// original_text — Demotic and kin) would open the day with a blank plate,
// so those stay out of the rotation entirely.

const anchorOf = (nameId, civId) =>
  nameId.startsWith(`${civId}-`) ? nameId.slice(civId.length + 1) : nameId;

export function readPool() {
  const dir = join(root, 'src/content/names');
  const urls = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const id = file.replace(/\.md$/, '');
    const fm = readFileSync(join(dir, file), 'utf8');
    const civ = fm.match(/^civilization:\s*(\S+)\s*$/m)?.[1];
    const original = (fm.match(/^original_text:\s*(.*)$/m)?.[1] ?? '')
      .trim()
      .replace(/^["']|["']$/g, '');
    if (civ && original) urls.push(`/civilizations/${civ}#${anchorOf(id, civ)}`);
  }
  // Plain codepoint order, NOT localeCompare: collation varies by build
  // machine locale, and the homepage resolves schedule indices against a
  // list sorted the same way — the two must never disagree.
  return urls.sort();
}

// ---------------------------------------------------------------------------
// CLI entry (skipped when imported by the simulation test).

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const prev = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, 'utf8')) : null;
  const pool = readPool();
  const today = nyDay();
  const next = updateSchedule(prev, pool, today);
  mkdirSync(dirname(ledgerPath), { recursive: true });
  writeFileSync(ledgerPath, JSON.stringify(next) + '\n');
  const days = next.rounds.reduce((n, r) => n + r.picks.length, 0);
  console.log(
    `daily-schedule: ${next.rounds.length} rounds, ${days} days scheduled, pool ${pool.length}, today ${today}`
  );
}
