// Coarse geographic buckets for the homepage's "browse by region" filter.
// This is presentation-layer grouping, not content: the per-entity `region`
// frontmatter stays the authored prose, and this map assigns each slug to one
// or more broad shelves so the index can be filtered. Kept as an explicit slug
// map (no keyword heuristics) so every assignment is deliberate and reviewable.
//
// The shelves tile the whole ancient world with no gaps: every entity has at
// least one home. Labels are region names, never a specific place plus a vague
// direction ("North Africa", not "Egypt & North Africa"; "Europe", not "Italy
// & the West"), so a reader knows what each covers.
//
// Membership is MANY, not one: an entity belongs to every shelf it genuinely
// occupied. A single-place entity (a city, a river) lists one shelf; a body of
// water lists every region it borders (the Mediterranean the most, all five of
// its shores); a trans-regional polity (the Caliphate, the Byzantines) lists
// its core and every region it ruled, so browsing any of them surfaces it.
// Every entity has at least one home; nothing is left to "All regions" only.

export const MACRO_REGION_LABELS: Record<string, string> = {
  mesopotamia: 'Mesopotamia',
  arabia: 'Arabia',
  levant: 'The Levant',
  'north-africa': 'North Africa',
  anatolia: 'Anatolia',
  'greek-world': 'The Greek world',
  europe: 'Europe',
  'iran-caucasus': 'Iran & the Caucasus',
  'central-asia': 'Central Asia & the Steppe',
  'south-asia': 'South Asia',
  'east-asia': 'East Asia',
};

export const MACRO_REGION_OF: Record<string, string[]> = {
  // Mesopotamia
  akkad: ['mesopotamia'],
  assyria: ['mesopotamia'],
  babylon: ['mesopotamia'],
  babylonia: ['mesopotamia'],
  baghdad: ['mesopotamia'],
  euphrates: ['mesopotamia'],
  mesopotamia: ['mesopotamia'],
  mitanni: ['mesopotamia'],
  nineveh: ['mesopotamia'],
  sumer: ['mesopotamia'],
  tigris: ['mesopotamia'],
  ur: ['mesopotamia'],
  uruk: ['mesopotamia'],
  // Arabia (the peninsula and the Gulf; Dilmun and Magan move here from
  // Mesopotamia, the Persian Gulf is shared water listed under every shore)
  mecca: ['arabia'],
  medina: ['arabia'],
  dilmun: ['arabia'],
  magan: ['arabia'],
  'persian-gulf': ['arabia', 'mesopotamia', 'iran-caucasus'],
  // The Levant
  canaan: ['levant'],
  'crusader-states': ['levant'],
  damascus: ['levant'],
  'dead-sea': ['levant'],
  israel: ['levant'],
  jerusalem: ['levant'],
  jordan: ['levant'],
  judah: ['levant'],
  lebanon: ['levant'],
  philistia: ['levant'],
  phoenicia: ['levant'],
  sidon: ['levant'],
  syria: ['levant'],
  tyre: ['levant'],
  // North Africa (Egypt is in it; the Maghreb and its Islamic cities join)
  alexandria: ['north-africa'],
  cairo: ['north-africa'],
  carthage: ['north-africa'],
  egypt: ['north-africa'],
  fez: ['north-africa'],
  kairouan: ['north-africa'],
  maghreb: ['north-africa'],
  memphis: ['north-africa'],
  nile: ['north-africa'],
  'red-sea': ['north-africa', 'arabia'],
  // Anatolia (the straits and Thrace shelve here, the ancient Pontic framing;
  // the Ionian Greek cities also list under the Greek world)
  anatolia: ['anatolia'],
  'black-sea': ['anatolia', 'central-asia', 'iran-caucasus', 'greek-world'],
  bosporus: ['anatolia'],
  bursa: ['anatolia'],
  byzantium: ['anatolia'],
  cappadocia: ['anatolia'],
  cilicia: ['anatolia'],
  edirne: ['anatolia'],
  ephesus: ['anatolia', 'greek-world'],
  halys: ['anatolia'],
  hellespont: ['anatolia'],
  hittites: ['anatolia'],
  ionia: ['anatolia', 'greek-world'],
  konya: ['anatolia'],
  lycia: ['anatolia'],
  lydia: ['anatolia'],
  marmara: ['anatolia'],
  miletus: ['anatolia', 'greek-world'],
  nicaea: ['anatolia'],
  phrygia: ['anatolia'],
  taurus: ['anatolia'],
  troy: ['anatolia'],
  // The Greek world
  aegean: ['greek-world', 'anatolia'],
  athens: ['greek-world'],
  corinth: ['greek-world'],
  greece: ['greek-world'],
  knossos: ['greek-world'],
  macedon: ['greek-world'],
  macedonia: ['greek-world'],
  'minoan-crete': ['greek-world'],
  mycenae: ['greek-world'],
  olympus: ['greek-world'],
  pella: ['greek-world'],
  sparta: ['greek-world'],
  thebes: ['greek-world'],
  // Europe (the Latin West and Iberia; the western Greek colonies also list
  // under the Greek world)
  adriatic: ['europe'],
  'al-andalus': ['europe'],
  cordoba: ['europe'],
  etruscans: ['europe'],
  granada: ['europe'],
  guadalquivir: ['europe'],
  'ionian-sea': ['europe', 'greek-world'],
  italia: ['europe'],
  latium: ['europe'],
  'magna-graecia': ['europe', 'greek-world'],
  neapolis: ['europe', 'greek-world'],
  po: ['europe'],
  rome: ['europe'],
  seville: ['europe'],
  sicily: ['europe', 'greek-world'],
  syracuse: ['europe', 'greek-world'],
  tarentum: ['europe', 'greek-world'],
  tarquinia: ['europe'],
  tiber: ['europe'],
  toledo: ['europe'],
  veii: ['europe'],
  // Iran & the Caucasus (Khurasan and Nishapur bridge into Central Asia)
  ararat: ['iran-caucasus'],
  armenia: ['iran-caucasus'],
  'caspian-sea': ['iran-caucasus', 'central-asia'],
  caucasus: ['iran-caucasus'],
  elam: ['iran-caucasus'],
  iran: ['iran-caucasus'],
  khurasan: ['iran-caucasus', 'central-asia'],
  media: ['iran-caucasus'],
  nishapur: ['iran-caucasus', 'central-asia'],
  parthia: ['iran-caucasus'],
  persepolis: ['iran-caucasus'],
  persia: ['iran-caucasus'],
  susa: ['iran-caucasus'],
  urartu: ['iran-caucasus'],
  // Central Asia & the Steppe (the ranging steppe peoples list every region
  // their page names reaching)
  alans: ['central-asia', 'iran-caucasus'],
  avars: ['central-asia', 'europe'],
  bactra: ['central-asia'],
  bactria: ['central-asia'],
  bukhara: ['central-asia'],
  cimmerians: ['central-asia', 'anatolia'],
  gokturks: ['central-asia', 'east-asia'],
  hephthalites: ['central-asia', 'iran-caucasus'],
  'hindu-kush': ['central-asia', 'south-asia'],
  huns: ['central-asia', 'europe'],
  jaxartes: ['central-asia'],
  khazars: ['central-asia', 'iran-caucasus'],
  merv: ['central-asia'],
  oxus: ['central-asia'],
  samarkand: ['central-asia'],
  sarmatians: ['central-asia'],
  scythia: ['central-asia'],
  sogdiana: ['central-asia'],
  transoxiana: ['central-asia'],
  xiongnu: ['central-asia', 'east-asia'],
  yuezhi: ['central-asia', 'east-asia'],
  // South Asia
  deccan: ['south-asia'],
  gandhara: ['south-asia'],
  ganges: ['south-asia'],
  himalayas: ['south-asia'],
  india: ['south-asia'],
  indus: ['south-asia'],
  meluhha: ['south-asia'],
  pataliputra: ['south-asia'],
  punjab: ['south-asia'],
  sindh: ['south-asia'],
  taxila: ['south-asia'],
  yamuna: ['south-asia'],
  // East Asia
  'chang-an': ['east-asia'],
  china: ['east-asia'],
  // Trans-regional polities: filed at the core and under every region ruled,
  // so browsing any of them surfaces the polity
  caliphate: ['arabia', 'mesopotamia', 'levant', 'north-africa', 'europe', 'iran-caucasus', 'central-asia', 'south-asia'],
  byzantines: ['anatolia', 'greek-world', 'europe'],
  ottomans: ['anatolia', 'greek-world'],
  seljuks: ['central-asia', 'iran-caucasus', 'anatolia'],
  romani: ['south-asia', 'iran-caucasus', 'anatolia', 'europe'],
  // The Mediterranean, like every sea here, lists each region it borders; it
  // simply borders more of them than the others.
  mediterranean: ['levant', 'north-africa', 'anatolia', 'greek-world', 'europe'],
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
