// Coarse geographic buckets for the homepage's "browse by region" filter.
// This is presentation-layer grouping, not content: the per-entity `region`
// frontmatter stays the authored prose, and this map assigns each slug to one
// broad shelf so the index can be filtered. Kept as an explicit slug map (no
// keyword heuristics) so every assignment is deliberate and reviewable.
//
// Entities that genuinely straddle every shelf (the Mediterranean itself) are
// left out and appear only under "All regions" — an honest non-answer beats a
// forced one.

export const MACRO_REGION_LABELS: Record<string, string> = {
  mesopotamia: 'Mesopotamia',
  'egypt-africa': 'Egypt & North Africa',
  levant: 'The Levant',
  anatolia: 'Anatolia',
  'greek-world': 'The Greek world',
  'italy-west': 'Italy & the West',
  'iran-caucasus': 'Iran & the Caucasus',
  'central-asia': 'Central Asia & the Steppe',
  'south-asia': 'South Asia',
  'east-asia': 'East Asia',
};

export const MACRO_REGION_OF: Record<string, string> = {
  // Mesopotamia
  akkad: 'mesopotamia',
  assyria: 'mesopotamia',
  babylon: 'mesopotamia',
  babylonia: 'mesopotamia',
  dilmun: 'mesopotamia',
  euphrates: 'mesopotamia',
  magan: 'mesopotamia',
  mesopotamia: 'mesopotamia',
  mitanni: 'mesopotamia',
  nineveh: 'mesopotamia',
  'persian-gulf': 'mesopotamia',
  sumer: 'mesopotamia',
  tigris: 'mesopotamia',
  ur: 'mesopotamia',
  uruk: 'mesopotamia',
  // Egypt & North Africa
  alexandria: 'egypt-africa',
  carthage: 'egypt-africa',
  egypt: 'egypt-africa',
  memphis: 'egypt-africa',
  nile: 'egypt-africa',
  'red-sea': 'egypt-africa',
  // The Levant
  canaan: 'levant',
  damascus: 'levant',
  'dead-sea': 'levant',
  israel: 'levant',
  jerusalem: 'levant',
  jordan: 'levant',
  judah: 'levant',
  lebanon: 'levant',
  philistia: 'levant',
  phoenicia: 'levant',
  sidon: 'levant',
  syria: 'levant',
  tyre: 'levant',
  // Anatolia (the Black Sea shelves here as Pontus, its ancient framing)
  anatolia: 'anatolia',
  'black-sea': 'anatolia',
  bosporus: 'anatolia',
  byzantium: 'anatolia',
  cappadocia: 'anatolia',
  cilicia: 'anatolia',
  ephesus: 'anatolia',
  halys: 'anatolia',
  hellespont: 'anatolia',
  hittites: 'anatolia',
  ionia: 'anatolia',
  lycia: 'anatolia',
  lydia: 'anatolia',
  miletus: 'anatolia',
  phrygia: 'anatolia',
  taurus: 'anatolia',
  troy: 'anatolia',
  // The Greek world
  aegean: 'greek-world',
  athens: 'greek-world',
  corinth: 'greek-world',
  greece: 'greek-world',
  knossos: 'greek-world',
  macedon: 'greek-world',
  macedonia: 'greek-world',
  'minoan-crete': 'greek-world',
  mycenae: 'greek-world',
  olympus: 'greek-world',
  pella: 'greek-world',
  sparta: 'greek-world',
  thebes: 'greek-world',
  // Italy & the West
  adriatic: 'italy-west',
  etruscans: 'italy-west',
  'ionian-sea': 'italy-west',
  italia: 'italy-west',
  latium: 'italy-west',
  'magna-graecia': 'italy-west',
  neapolis: 'italy-west',
  po: 'italy-west',
  rome: 'italy-west',
  sicily: 'italy-west',
  syracuse: 'italy-west',
  tarentum: 'italy-west',
  tarquinia: 'italy-west',
  tiber: 'italy-west',
  veii: 'italy-west',
  // Iran & the Caucasus
  ararat: 'iran-caucasus',
  armenia: 'iran-caucasus',
  'caspian-sea': 'iran-caucasus',
  caucasus: 'iran-caucasus',
  elam: 'iran-caucasus',
  iran: 'iran-caucasus',
  media: 'iran-caucasus',
  parthia: 'iran-caucasus',
  persepolis: 'iran-caucasus',
  persia: 'iran-caucasus',
  susa: 'iran-caucasus',
  urartu: 'iran-caucasus',
  // Central Asia & the Steppe
  bactra: 'central-asia',
  bactria: 'central-asia',
  cimmerians: 'central-asia',
  'hindu-kush': 'central-asia',
  jaxartes: 'central-asia',
  oxus: 'central-asia',
  scythia: 'central-asia',
  sogdiana: 'central-asia',
  xiongnu: 'central-asia',
  yuezhi: 'central-asia',
  // South Asia
  deccan: 'south-asia',
  meluhha: 'south-asia',
  pataliputra: 'south-asia',
  taxila: 'south-asia',
  gandhara: 'south-asia',
  ganges: 'south-asia',
  himalayas: 'south-asia',
  india: 'south-asia',
  indus: 'south-asia',
  punjab: 'south-asia',
  sindh: 'south-asia',
  yamuna: 'south-asia',
  // East Asia
  'chang-an': 'east-asia',
  china: 'east-asia',
};

// Era shelves for the homepage's "browse by era" filter. An entity matches a
// shelf when its attested span overlaps the shelf's range; spans come straight
// from era_start/era_end, so nothing is stored. Boundaries follow the usual
// coarse periodization of the atlas's temporal scope.
export const ERAS: Array<{ key: string; label: string; start: number; end: number }> = [
  { key: 'bronze', label: 'Bronze Age (to c. 1200 BCE)', start: -3500, end: -1200 },
  { key: 'iron', label: 'Iron Age (c. 1200–550 BCE)', start: -1200, end: -550 },
  { key: 'classical', label: 'Classical & Hellenistic (c. 550–30 BCE)', start: -550, end: -30 },
  { key: 'late', label: 'Roman & Late Antique (c. 30 BCE–600 CE)', start: -30, end: 600 },
  { key: 'medieval', label: 'Medieval (c. 600–1453 CE)', start: 600, end: 1453 },
];
