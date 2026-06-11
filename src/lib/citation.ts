// Citations are stored with markdown-style *italics* around work titles and
// s.v. headwords (see the citation policy in the entry conventions), but the
// sources list renders the raw string, so the asterisks would print literally.
// Split the string into alternating plain/emphasized segments for the template.
export function citationParts(citation: string): Array<{ text: string; em: boolean }> {
  return citation
    .split(/\*([^*]+)\*/g)
    .map((text, i) => ({ text, em: i % 2 === 1 }))
    .filter((part) => part.text !== '');
}
