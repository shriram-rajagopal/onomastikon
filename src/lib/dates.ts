// Freshness dates for pages and entries, read from the committed ledgers
// (scripts/generate-entry-dates.mjs) because Vercel's shallow clone can't
// ask git at deploy time. Keys: "civilizations/<id>", "languages/<id>",
// "names/<id>". Regenerate with npm run dates:update after content changes.
import added from '../data/entry-dates.json';
import modified from '../data/modified-dates.json';

const addedMap = added as Record<string, string>;
const modifiedMap = modified as Record<string, string>;

/** Last content change for any ledger key (undefined when unknown). */
export const modifiedOf = (key: string): string | undefined => modifiedMap[key];

/** Both dates for an entity or language page. */
export function pageDates(collection: 'civilizations' | 'languages', id: string) {
  return { published: addedMap[`${collection}/${id}`], modified: modifiedMap[`${collection}/${id}`] };
}

/** Site-wide latest content change, for the homepage. */
export const latestModified: string | undefined = Object.values(modifiedMap).sort().at(-1);

export const formatMonthYear = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatFullDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
