// Deterministic anchor for a name entry: the record slug with its civ prefix
// stripped (egypt-coptic-keme -> coptic-keme). Falls back to the full slug if
// the prefix isn't present, so it is always content-derived, never index-based.
//
// Single source of truth for the anchor scheme. Used by the entity page (which
// emits the id), the language page (which builds the hash link), and the search
// index (whose results deep-link to the anchor). Keeping one definition means
// the three call sites can't silently disagree on how a slug is derived.
export function entryAnchor(nameId: string, civId: string): string {
  const prefix = `${civId}-`;
  return nameId.startsWith(prefix) ? nameId.slice(prefix.length) : nameId;
}
