// Display metadata for name families (the `family` slug on name entries).
// The slug is the data key; this map only carries how a family is presented.
// A slug missing here still renders, falling back to the slug itself.
export const FAMILIES: Record<string, { display: string; note?: string }> = {
  msr: {
    display: 'The mṣr family',
    note: 'The Semitic root mṣr, "border, frontier," carried across the Semitic family and into the Iranian chancellery languages.',
  },
  kemet: {
    display: 'The km.t arc',
    note: 'The Egyptian self-name passing through its own language’s stages, from hieroglyphic km.t to Coptic.',
  },
  aigyptos: {
    display: 'The Aígyptos tradition',
    note: 'The Greek name and its descendants, the chain that produces the modern European names for Egypt.',
  },
  ionian: {
    display: 'The Ionian family',
    note: 'The name of the Ionian Greeks, spread eastward through Semitic and Iranian transmission.',
  },
  hellas: {
    display: 'The Hellas tradition',
    note: 'The Greek self-designation and the forms taken directly from it.',
  },
  parsa: {
    display: 'The Pārsa family',
    note: 'The Old Persian heartland name, radiating outward through the languages of the empire and its neighbors.',
  },
  eran: {
    display: 'The Ērān tradition',
    note: 'The Iranian self-designation from Old Iranian aryānām, parallel to and distinct from Pārsa.',
  },
  roma: {
    display: 'The Roma family',
    note: 'The Latin endonym carried abroad with little more than phonetic adjustment, mostly through Greek.',
  },
  neilos: {
    display: 'The Neîlos tradition',
    note: 'The Greek river-name of contested etymology, source of the name the modern world uses.',
  },
  jtrw: {
    display: 'The jtrw (river) family',
    note: 'The plain Egyptian word for "the river," surviving natively into Coptic and borrowed into Hebrew.',
  },
  shinar: {
    display: 'The Šinʿar family',
    note: 'The second-millennium international name for southern Mesopotamia, of contested origin, shared by Egyptian, Hittite, and Hebrew scribes.',
  },
  ashur: {
    display: 'The Aššur family',
    note: 'The name of the god, city, and land of Aššur, carried across the Semitic and Iranian languages; an Aramaic t-form, ʾĀtūr, feeds Old Persian and Syriac, while the form behind Greek Assyría gives the modern world both "Assyria" and "Syria."',
  },
  babili: {
    display: 'The Bābilu family',
    note: 'The name of Babylon, written with the Sumerian "gate of god" logogram and traditionally read in Akkadian as Bāb-ilim, spread as the name of the land of Babylonia across the Semitic, Iranian, and classical languages, giving Greek Babylṓn and the modern "Babylon."',
  },
  akkad: {
    display: 'The Akkad family',
    note: 'The name of the city of Agade and the land of Akkad, of uncertain origin, that gave the Akkadian language its name; an empire of the third millennium BCE, it was gone before the classical world arose and survives in the wider tradition only through the Hebrew Bible.',
  },
  elam: {
    display: 'The Elam family',
    note: 'The Mesopotamian name for the highland country east of Sumer, from Sumerian Elam and Akkadian Elamtu, carried through Hebrew and the Bible into Greek Elymaís and the Semitic and Ethiopic traditions; distinct from the Elamites’ own self-name, Haltamti.',
  },
  uvja: {
    display: 'The Ūvja family',
    note: 'The Iranian name for Elam, from Old Persian Ūvja, that becomes Middle Persian Hūz and gives the region its lasting name: Sasanian Hūzestān and Arabic al-Ahwāz, the modern Khuzistan.',
  },
  hatti: {
    display: 'The Ḫatti family',
    note: 'The Anatolian land-name Hatti, taken by the Indo-European Hittites from the earlier Hattians and used by the wider Bronze Age world; the name of the empire as it actually called itself and as Mesopotamia knew it.',
  },
  het: {
    display: 'The Ḥēt family',
    note: 'The biblical name of the sons of Heth, a people of Canaan, carried from Hebrew through the Greek and Latin Bibles; nineteenth-century scholars borrowed it for the Anatolian empire of Hatti, and so the modern world calls them "Hittites." Whether biblical Ḥēt and Anatolian Ḫatti are truly the same name is debated.',
  },
  phoinix: {
    display: 'The Phoiníkē family',
    note: 'The Greek name for the Levantine coast, from phoînix ("crimson-purple," the Tyrian dye, and "date-palm"), source of Latin Phoenīcē and the modern "Phoenicia" — a name the Phoenicians never used of themselves, calling their land Canaan.',
  },
  qarthadasht: {
    display: 'The Qart-ḥadašt family',
    note: 'The Punic self-name of Carthage, "New City," carried into Greek as Karkhēdṓn, Latin as Carthāgō, and Arabic as Qarṭāj — the modern "Carthage." Every later form descends from the one Phoenician name.',
  },
  mittani: {
    display: 'The Mittani family',
    note: 'The kingdom\'s own name, used by its kings in Hurrian and Akkadian and adopted by the Hittites — one of Mitanni\'s several unrelated names, set apart from the Assyrian Ḫanigalbat and the Egyptian Naharina.',
  },
  yisrael: {
    display: 'The Yiśrāʾēl family',
    note: 'The Hebrew self-name of Israel, carried through the Greek and Latin Bibles into Syriac, Geʿez, and the Arabic of the Qurʾān; the Assyrians alone named the northern kingdom otherwise, after its dynasty, as the "House of Omri."',
  },
  yehudah: {
    display: 'The Yĕhûdāh family',
    note: 'The Hebrew name of Judah, rendered in Assyrian as Yāʾudu and in the Persian province as Aramaic Yĕhûd, then carried through Greek Ioudaía and Latin Iudaea — the line that gives the modern words "Jew," "Judaea," and "Judaism."',
  },
  yerushalem: {
    display: 'The Yĕrûšālēm family',
    note: 'The ancient name of Jerusalem, "foundation of Shalem," attested from the Bronze Age and carried through Hebrew, Aramaic, Greek (where it was refolded as Hierosólyma, "the holy"), Latin, Syriac, and Geʿez.',
  },
  aelia: {
    display: 'The Aelia family',
    note: 'The Roman renaming of Jerusalem, Aelia Capitolina, after the emperor Hadrian (Aelius); it survived the Roman city as the Arabic Īliyāʾ, an early Islamic name for the city.',
  },
  mesopotamia: {
    display: 'The Mesopotamía family',
    note: 'The Greek name for the land "between the rivers," meso- + potamós, a calque of the local Semitic idea that gave Latin Mesopotamia and the modern name.',
  },
  naharin: {
    display: 'The Naharin family',
    note: 'The Semitic "(land) of the rivers," from the root nhr, naming Mesopotamia: Hebrew Aram-Naharaim and Syriac Bēth Nahrīn, the idea the Greek Mesopotamía translates.',
  },
  susa: {
    display: 'The Šušan family',
    note: 'The native Elamite name of Susa, Šušun/Šušan, taken up by nearly every neighbor and conqueror: the Sumerian and Akkadian Šušin/Šušan, the Old Persian Çūšā, the Hebrew and Syriac Šūšan, the Greek Soûsa and Latin Susa, and the later Šuš of Sasanian and Islamic times that survives as the modern town.',
  },
  ur: {
    display: 'The Ur family',
    note: 'The name of the Sumerian city Urim, the cult-center of the moon-god Nanna, read in Akkadian as Uru; its later survival is almost entirely scriptural, as the Hebrew ʾŪr "of the Chaldees," kept in the Syriac and Latin Bibles that translated from the Hebrew but lost in the Greek Septuagint, which rendered it "the land of the Chaldeans."',
  },
  unug: {
    display: 'The Unug family',
    note: 'The name of the city of Gilgamesh, Sumerian Unug and Akkadian Uruk, that reached the wider world by two roads which never met: the Semitic Erech of the Hebrew and Syriac Bibles (and the Septuagint\'s Orech), and the Hellenistic Orchoē of the Greek and Latin geographers, taken from the living Babylonian city.',
  },
  ninua: {
    display: 'The Ninua family',
    note: 'The name of the Assyrian capital, Akkadian Ninua, written with a sign that pictures a fish within a house; carried into the Hebrew, Syriac, Arabic, and Ethiopic Bibles as Nineveh and into the Greek and Latin both as the toponym Nineuē and as the legendary founder-king Ninos, whom the classical historians made the city\'s eponym.',
  },
  mennefer: {
    display: 'The Men-nefer family',
    note: 'The name of Memphis, Egyptian Mn-nfr ("enduring and beautiful," from the pyramid-town of Pepi I), carried through Demotic and Coptic and out to the Akkadian Mempi, the Hebrew Nōph and Mōph, the Greek and Latin Memphis, and the Arabic Manf; the city\'s other name, Ḥwt-kꜣ-Ptḥ, took a separate road and became the Greek name of all Egypt.',
  },
  rakote: {
    display: 'The Rakote family',
    note: 'The native Egyptian name of the site of Alexandria, Rꜥ-qd ("building site"), the village that preceded the Greek city; kept by the Greeks as Rhakōtis for the Egyptian quarter and by the Copts as Rakoti for the whole metropolis, the name the Egyptians used where the rest of the world said Alexandria.',
  },
  alexandreia: {
    display: 'The Alexandreia family',
    note: 'The name of Alexander\'s Egyptian foundation, Greek Alexandreia, that unlike most of his many cities kept his name and carried it across the world: Latin Alexandria, Syriac Aleksandriya, the Geʿez Ǝskǝndǝryā of the mother see, and, through the personal name Iskandar, the Arabic al-Iskandariyya.',
  },
  athenai: {
    display: 'The Athēnai family',
    note: 'The name of Athens, the plural Greek Athēnai shared with its patron goddess Athena, carried with little change into Latin Athēnae, Syriac, and Arabic; a name that, entering the other languages late and through Greek prestige, never fragmented as the older Near Eastern toponyms did.',
  },
  sparte: {
    display: 'The Spártē family',
    note: 'The Greek name of the town on the Eurotas, Spártē, carried into Latin Sparta and the Arabic historical tradition; one of the two names of the Spartan state, paired with Lakedaímōn, the city beside the polity.',
  },
  lakedaimon: {
    display: 'The Lakedaímōn family',
    note: 'The other name of Sparta, Lakedaímōn, the Homeric and official name of the state and its people, the Lakedaimonioi; carried into Latin Lacedaemon and the Arabic tradition, the polity beside the city Spártē.',
  },
  ilios: {
    display: 'The Wiluša / Ílios family',
    note: 'One of Troy\'s two names, the Bronze Age Anatolian Wiluša of the Hittite archives, the same name as Homer\'s Ílios (originally Wilios, with the digamma the meter still preserves), and the Latin Ilium; the city of the legendary Ilus.',
  },
  troia: {
    display: 'The Troía family',
    note: 'Troy\'s other name, Homer\'s Troíā and the Latin Troia, perhaps reaching back to the Hittite Truwiša; the city of the legendary Tros, paired in epic with Ílios as two names for one citadel.',
  },
  dimashq: {
    display: 'The Dimašq family',
    note: 'The name of Damascus, a stable d-m-ś-q skeleton attested from the Bronze Age (Egyptian ṯmsqw, Amarna Akkadian Dimašqa) through Aramaic, Hebrew, Greek, Latin, Syriac, and the Arabic Dimashq; the later Aramaic, Chronicles Hebrew, and Syriac forms insert an intrusive resh (Darmeśeq, Darmsuq) that the Greek-Latin-Arabic line never carried.',
  },
  persepolis: {
    display: 'The Persépolis family',
    note: 'The Greek name for the Achaemenid ceremonial capital, Persépolis, "city of the Persians," with its dark echo of pérthō, "to sack"; a Greek coinage distinct from the Persians\' own name for the place, which was simply Pārsa, the name of Persia itself.',
  },
  sor: {
    display: 'The Ṣūr family',
    note: 'The name of Tyre, Phoenician Ṣūr, "rock," for the island-rock the city stood on; kept with the emphatic ṣ across the Semitic languages (Akkadian Ṣurru, Hebrew Ṣōr, Syriac and Arabic Ṣūr) but reshaped with an initial t in the Greek Týros, Latin Tyrus, and the English Tyre, one name down two phonetic roads.',
  },
  sidon: {
    display: 'The Ṣīdōn family',
    note: 'The name of Sidon, Phoenician Ṣīdūn, "fishery," carried with its emphatic ṣ across Akkadian, Hebrew, Syriac, and the Arabic Ṣaydā; unlike its sister-city Tyre, whose ṣ the Greeks turned to t, Sidon kept a plain s in the Greek Sidṓn and Latin Sidon.',
  },
  kanaan: {
    display: 'The Kĕnaʿan family',
    note: 'The Bronze Age name of the Levant, attested in Ugaritic Knʿn, the Amarna Akkadian Kinaḫḫi, and Hebrew Kĕnaʿan, and carried through the Greek, Latin, Syriac, Geʿez, and Arabic Bibles; possibly "the land of purple" after the murex dye, the same idea the Greeks expressed in Phoinikē.',
  },
  asia: {
    display: 'The Asía family',
    note: 'The name Asia, taken by the Greeks from the Bronze Age Anatolian league the Hittites called Aššuwa; first the name of western Anatolia alone, it expanded to name the whole continent, so that the peninsula had to be renamed Asia Minor.',
  },
  anatole: {
    display: 'The Anatolḗ family',
    note: 'The Greek Anatolḗ, "the east, sunrise," the Byzantine name for the lands east of Constantinople that narrowed to mean the Anatolian peninsula; source of the Arabic Anāḍūl and the modern Anatolia.',
  },
  italia: {
    display: 'The Italia family',
    note: 'The name of Italy, probably "the land of calves" (Latin vitulus, Oscan Víteliú), at first the Greek name of the southern toe of the peninsula and then, as Rome unified the land, of the whole; carried through Latin into the Syriac, Geʿez, and Arabic Bibles and the modern world.',
  },
  hesperia: {
    display: 'The Hespería tradition',
    note: 'The poetic name of Italy as "the western land," Greek Hespería, taken up by the Latin epic poets; a relative name, like Anatolia\'s "east," calling the peninsula by its direction from Greece.',
  },
  idigna: {
    display: 'The Idigna family',
    note: 'The Semitic name of the Tigris, from Sumerian Idigna, "the swift river," borrowed into Akkadian as Idiqlat and from there into Aramaic, the Hebrew Ḥiddeqel, Syriac Deqlaṯ, and the Arabic Dijla that names the river today.',
  },
  tigris: {
    display: 'The Tígris family',
    note: 'The western name of the Tigris, from the Old Persian Tigrā, a reanalysis of the Sumerian river-name as "arrow"; carried into Greek Tígris, Latin, and Geʿez, and giving English Tigris, with the river imagined to run as swift as an arrow.',
  },
  purattu: {
    display: 'The Purattu family',
    note: 'The Semitic name of the Euphrates, the cuneiform Buranun (Sumerian) and Purattu (Akkadian), continued in the Hebrew and Syriac Pĕrāt and the Arabic al-Furāt; the eastern, faithful branch of the river\'s name.',
  },
  euphrates: {
    display: 'The Euphrátēs family',
    note: 'The western name of the Euphrates, from the Akkadian Purattu by way of Elamite Úipratuiš and Old Persian Ufrātu, which the Greeks reshaped into Euphrátēs, as if "good-flowing" from eu, "good"; the source of the Latin, Geʿez, and modern names.',
  },
};

export function familyDisplay(slug: string): { display: string; note?: string } {
  return FAMILIES[slug] ?? { display: `The ${slug} family` };
}
