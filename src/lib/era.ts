// Shared "c. 3100 BCE – 30 BCE" formatter for era ranges. One definition so the
// index and entity pages can't drift on the date convention.
export function formatEra(start: number, end: number): string {
  const fmt = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);
  return `c. ${fmt(start)} – ${fmt(end)}`;
}
