// Shared "c. 3100 BCE – 30 BCE" formatter for era ranges. One definition so the
// index and entity pages can't drift on the date convention.
//
// era_end: null is the deliberate "in continued use" claim — for names that
// never fell out of use (Coptic, Arabic, Devanagari continuity cases). It is
// an editorial judgment applied per entry, never a default.
export function formatEra(start: number, end: number | null): string {
  const fmt = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);
  return end === null ? `c. ${fmt(start)} – in continued use` : `c. ${fmt(start)} – ${fmt(end)}`;
}

// Where the atlas's temporal scope closes (the fall of Constantinople);
// open-ended ranges clamp here for timeline/map geometry so the axes stay
// within scope.
export const SCOPE_END = 1453;
