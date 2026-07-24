// The inscribed monuments this atlas's names actually stand on. A monument
// belongs here only as the attestation source of name entries in the
// collection: `entries` lists the entry ids whose forms the object carries,
// as supported by those entries' own citations and prose, and the entity
// pages derive their Monuments section from that linkage. Descriptions stay
// about what the stone writes, not its art history; monuments remain out of
// scope as entities.
export interface Monument {
  title: string;
  date: string;
  place: string;
  location: string;
  description: string;
  entries: string[];
}

export const MONUMENTS: Record<string, Monument> = {
  behistun: {
    title: 'The Behistun inscription',
    date: 'c. 520 BCE',
    place: 'Mount Bisotun, western Iran',
    location: 'in situ',
    description:
      'Darius I\'s account of his accession, cut into a cliff face in Old Persian, Elamite, and Babylonian Akkadian, with the empire\'s subject lands catalogued in all three. It is the single richest source of names in this atlas: each province is named three times over, once in the king\'s own tongue and twice in the chancellery languages of his empire, and the disagreements between the columns are themselves philological evidence. The trilingual furnished the key to cuneiform as the Rosetta Stone did to hieroglyphs.',
    entries: [
      'armenia-akkadian-urashtu',
      'armenia-elamite-harminuya',
      'armenia-old-persian-armina',
      'assyria-elamite-ashura',
      'assyria-old-persian-athura',
      'babylon-elamite-babili',
      'babylon-old-persian-babirus',
      'babylonia-elamite-babili',
      'babylonia-old-persian-babirus',
      'bactria-akkadian-bahtar',
      'bactria-elamite-baksis',
      'bactria-old-persian-baxtrish',
      'cappadocia-akkadian-katpatukka',
      'cappadocia-old-persian-katpatuka',
      'egypt-elamite-mudraya',
      'egypt-old-persian-mudraya',
      'elam-old-persian-uvja',
      'euphrates-elamite-uipratuis',
      'gandhara-akkadian-gandari',
      'gandhara-elamite-gandara',
      'gandhara-old-persian-gandara',
      'greece-elamite-yauna',
      'greece-old-persian-yauna',
      'india-old-persian-hindus',
      'indus-old-persian-hindus',
      'ionia-old-persian-yauna',
      'lydia-old-persian-sparda',
      'macedonia-old-persian-skudra',
      'magan-old-persian-maka',
      'media-elamite-mada',
      'media-old-persian-mada',
      'merv-elamite-markuis',
      'merv-old-persian-margush',
      'parthia-akkadian-partu',
      'parthia-elamite-partuma',
      'parthia-old-persian-parthava',
      'persia-elamite-parsan',
      'persia-old-persian-parsa',
      'scythia-old-persian-saka',
      'sogdiana-old-persian-suguda',
      'susa-old-persian-cusa',
      'tigris-old-persian-tigra',
      'urartu-akkadian-urashtu',
    ],
  },
  'naqsh-e-rostam': {
    title: 'The tomb of Darius I at Naqsh-e Rostam',
    date: 'c. 486 BCE',
    place: 'Naqsh-e Rostam, near Persepolis, Iran',
    location: 'in situ',
    description:
      'The rock-cut tomb of Darius I, its facade inscribed (DNa) with the king\'s creed and a catalogue of the lands that carried his throne, each people named and carved bearing the platform. The list overlaps Behistun\'s but reaches further, adding peoples the earlier monument had not yet counted, and its figures are labeled: the name and the subject stand together in stone.',
    entries: [
      'assyria-old-persian-athura',
      'babylonia-old-persian-babirus',
      'bactria-elamite-baksis',
      'cappadocia-akkadian-katpatukka',
      'cappadocia-old-persian-katpatuka',
      'egypt-elamite-mudraya',
      'egypt-old-persian-mudraya',
      'gandhara-old-persian-gandara',
      'greece-elamite-yauna',
      'greece-old-persian-yauna',
      'india-akkadian-indu',
      'india-elamite-hindus',
      'india-old-persian-hindus',
      'indus-old-persian-hindus',
      'ionia-old-persian-yauna',
      'iran-old-persian-ariya',
      'lydia-old-persian-sparda',
      'macedonia-old-persian-skudra',
      'magan-old-persian-maka',
      'persia-elamite-parsan',
      'persia-old-persian-parsa',
      'scythia-old-persian-saka',
      'sindh-old-persian-hindus',
      'sogdiana-old-persian-suguda',
    ],
  },
  'xanthos-pillar': {
    title: 'The Xanthos inscribed pillar',
    date: 'c. 400 BCE',
    place: 'acropolis of Xanthos, Lycia',
    location: 'in situ',
    description:
      'The longest of all Lycian texts, a dynast\'s tomb pillar carrying his wars in Lycian prose, a Greek epigram, and a poem in Milyan. Its narrative names the powers of the Peloponnesian War from the Anatolian shore: Athens, Sparta, the Persians, and the Ionians all stand in Lycian letters on one stone, the war recorded in a language none of the combatants could read.',
    entries: [
      'athens-lycian-atana',
      'ionia-lycian-ijana',
      'media-lycian-medese',
      'persia-lycian-parzza',
      'sparta-lycian-sppartazi',
    ],
  },
  'letoon-trilingual': {
    title: 'The Letoon trilingual stele',
    date: 'c. 337 BCE',
    place: 'sanctuary of Leto near Xanthos, Lycia',
    location: 'Fethiye Museum, Turkey',
    description:
      'A cult decree carved three times on one stele, in Lycian, Greek, and Aramaic, and the keystone of Lycian decipherment. Its Lycian text preserves the people\'s own name for themselves beside the Greek name the world used, the endonym and the exonym sharing a single stone.',
    entries: ['lycia-lycian-trmmili'],
  },
  'rosetta-stone': {
    title: 'The Rosetta Stone',
    date: '196 BCE',
    place: 'found at Rashid (Rosetta), Egypt',
    location: 'British Museum, London',
    description:
      'A priestly decree for Ptolemy V written in hieroglyphic Egyptian, Demotic, and Greek, and the key that unlocked the Egyptian scripts. Among the words its Demotic text carries is the Egyptian name for the Greeks themselves, the decree naming its own ruling dynasty\'s people in the language of the ruled.',
    entries: ['greece-demotic-wynn'],
  },
  skz: {
    title: 'The Kaʿba-ye Zartosht inscription of Shapur I (ŠKZ)',
    date: 'c. 260 CE',
    place: 'Naqsh-e Rostam, Iran',
    location: 'in situ',
    description:
      'Shapur I\'s account of his empire and his three wars with Rome, carved on the tower at Naqsh-e Rostam in Middle Persian, Parthian, and Greek: the Sasanian answer to the Achaemenid trilingual habit, on the same ground. Its provinces and enemies supply this atlas a run of names, Iran\'s own name for itself among them, beside the Rome its armies fought.',
    entries: [
      'armenia-middle-persian-armin',
      'armenia-parthian-armin',
      'assyria-parthian-asoristan',
      'iran-middle-persian-eran',
      'media-middle-persian-mad',
      'persia-parthian-aryan',
      'rome-middle-persian-hrom',
      'rome-parthian-frwm',
    ],
  },
  'amarna-letters': {
    title: 'The Amarna letters',
    date: 'c. 1360–1330 BCE',
    place: 'found at Tell el-Amarna, Egypt',
    location: 'dispersed: Berlin, London, Cairo, and elsewhere',
    description:
      'The clay-tablet diplomatic archive of Akhenaten\'s court: some 380 letters, most in the Akkadian lingua franca of the age, exchanged between Egypt and the kings and vassals of the Near East. The correspondence fixes the Late Bronze Age\'s political map in writing, and city after city in this atlas is first or best attested in its lines.',
    entries: [
      'canaan-akkadian-kinahhi',
      'damascus-akkadian-dimashqa',
      'egypt-akkadian-misru',
      'hittites-akkadian-hatti',
      'jerusalem-akkadian-urusalim',
      'mitanni-hurrian-maittani',
      'sidon-akkadian-siduna',
      'sumer-hittite-shanhara',
      'tyre-akkadian-surru',
    ],
  },
  'tel-dan-stele': {
    title: 'The Tel Dan stele',
    date: 'ninth century BCE',
    place: 'found at Tel Dan, northern Israel',
    location: 'Israel Museum, Jerusalem',
    description:
      'Fragments of a basalt victory stele erected by an Aramaean king, in Old Aramaic. Famous for naming the "House of David," it also carries the names this atlas draws from it: the Aram of the king who raised it and the Damascus he ruled from, an enemy\'s monument standing inside the land it claimed to defeat.',
    entries: ['damascus-imperial-aramaic-damashq', 'syria-imperial-aramaic-aram'],
  },
  'cyrus-cylinder': {
    title: 'The Cyrus Cylinder',
    date: '539 BCE',
    place: 'foundation deposit, Babylon',
    location: 'British Museum, London',
    description:
      'Cyrus\'s foundation text for the walls of Babylon, written in Babylonian Akkadian in the voice of a Mesopotamian king though the king was Persian. It names the conqueror\'s homeland in the conquered city\'s language and styles him king of Sumer and Akkad, an old title taken over with the country it named.',
    entries: ['mesopotamia-akkadian-mat-shumeri-u-akkadi', 'persia-akkadian-parsa'],
  },
  'francois-tomb': {
    title: 'The François Tomb',
    date: 'late fourth century BCE',
    place: 'Vulci, Etruria',
    location: 'frescoes in the Villa Albani Torlonia, Rome',
    description:
      'A painted Etruscan tomb whose battle frescoes label their figures, and in the labels lie names: a warrior from Rome is captioned with the Etruscan ethnic for the city, and Tarquinia\'s name stands in its own language. The tomb paints the wars of early central Italy from the Etruscan side and names the participants in Etruscan letters.',
    entries: ['rome-etruscan-ruma', 'tarquinia-etruscan-tarchna'],
  },
  'sefire-stelae': {
    title: 'The Sefire stelae',
    date: 'mid-eighth century BCE',
    place: 'found at Sfire, near Aleppo, Syria',
    location: 'National Museum of Damascus and National Museum of Beirut',
    description:
      'Three basalt stelae carrying the longest early Aramaic inscription known: a treaty binding the king of Arpad, its curses and its gods enumerated at length. The text is a principal early witness to Aram as a name written by Aramaic speakers themselves.',
    entries: ['syria-imperial-aramaic-aram'],
  },
  'suez-stelae': {
    title: 'The Suez canal stelae of Darius I',
    date: 'c. 500 BCE',
    place: 'along the ancient canal route, Egypt',
    location: 'Cairo and elsewhere; the Chalouf stele in the Louvre',
    description:
      'Stelae Darius set up to mark the canal he completed from the Nile to the Red Sea, inscribed in Old Persian, Elamite, Babylonian, and hieroglyphic Egyptian. On them the king says his ships sailed to Persia by the sea that went from Egypt: the "sea of Persia," the phrase this atlas records as the oldest ancestor of the Persian Gulf\'s name.',
    entries: ['persian-gulf-old-persian-drayah'],
  },
};
