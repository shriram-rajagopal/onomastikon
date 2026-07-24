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
  hellas: {
    display: 'The Hellás line',
    note: 'The Greeks’ own name for their land, carried from Homer into Byzantine provincial administration and back out into the modern state.',
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
  propontis: {
    display: 'The Propontís family',
    note: 'The Greek "fore-sea," the Marmara named as what comes before the Pontos on the northward voyage, carried unchanged into Latin along with the sea it points to.',
  },
  osman: {
    display: 'The ʿOsmân family',
    note: 'The founder-bey\'s name as the dynasty\'s own Âl-i ʿOsmân and the Arabic chanceries\' Banū ʿUthmān; the source of "Ottoman" itself.',
  },
  saljuq: {
    display: 'The Saljūq family',
    note: 'The Oghuz ancestor\'s name carried as Arabic Āl Saljūq and Persian Saljūqiyān, a dead chieftain naming three centuries of sultans from Baghdad to Konya.',
  },
  ikonion: {
    display: 'The Ikónion family',
    note: 'The unexplained pre-Greek name of Konya, passed with only light re-hearing from Xenophon\'s Ikónion through Latin Iconium and Arabic Qūniya to Turkish Konya.',
  },
  nikaia: {
    display: 'The Níkaia family',
    note: 'A Hellenistic queen\'s name made permanent by two councils; Latin Nicaea turned it into doctrine, and Turkish İznik preserves the phrase eis Níkaian, "to Nicaea."',
  },
  prousa: {
    display: 'The Proûsa family',
    note: 'King Prusias\'s city under the Mysian Olympus, continued through Latin Prusa into Ottoman Bursa, the dynasty\'s first capital and necropolis.',
  },
  hadrianopolis: {
    display: 'The Hadrianoúpolis family',
    note: 'Hadrian\'s Thracian foundation, the Adrianople of the disaster of 378, worn down by Turkish to Edirne with the emperor no longer audible.',
  },
  khurasan: {
    display: 'The Xwarāsān family',
    note: 'The Sasanian quarter-name "sunrise," the east as seen from Ctesiphon; adopted whole by Arabic and continued natively in Persian, still on the map of Iran.',
  },
  margu: {
    display: 'The Margu family',
    note: 'The name of the Merv oasis, unbroken from Old Persian Marguš and Avestan Mouru through Greek Margianē and Sasanian Marw to the Arabic and Persian forms and the modern Mary.',
  },
  nishapur: {
    display: 'The Nēw-Šābuhr family',
    note: 'The Sasanian royal dedication "fair (is) Šābuhr," carried through Arabic Naysābūr and Persian Nīshāpūr with the king\'s name embedded but no longer heard.',
  },
  bukhara: {
    display: 'The Bukhārā family',
    note: 'The city\'s name of disputed origin, Sogdian or the old vihāra proposal, shared by its Arabic and Persian forms and carried worldwide by the adjective of one book of hadith.',
  },
  samarkand: {
    display: 'The Smārkanθ family',
    note: 'The Sogdian "stone fort," heard by Alexander\'s Greeks as Marákanda and opened by Arabic and Persian into Samarqand, the shape the world kept.',
  },
  corduba: {
    display: 'The Corduba family',
    note: 'The pre-Roman name of Córdoba, latinized as Corduba, Strabo\'s Kordýbē, and the Arabic Qurṭuba whose pronunciation the modern Spanish name continues.',
  },
  hispalis: {
    display: 'The Hispalis family',
    note: 'The unexplained ancient name of Seville, Latin Hispalis, reshaped through Romance into the Arabic Išbīliya from which modern Sevilla descends.',
  },
  toletum: {
    display: 'The Toletum family',
    note: 'The Celtiberian name of Toledo, Livy\'s Toletum, Ptolemy\'s Tṓlēton, and the Arabic Ṭulayṭula of the taifa and the translators.',
  },
  baetis: {
    display: 'The Baetis family',
    note: 'The pre-Roman name of the Guadalquivir, which named the province Baetica and then lost the river itself to the Arabic phrase al-Wādī al-Kabīr.',
  },
  tazig: {
    display: 'The Tāzīg family',
    note: 'The Iranian name for the Arabs, from the border tribe of Ṭayyiʾ with the adjectival -īg; carried east as Chinese Dàshí and north as Armenian Tačik, continued in Persian as Tāzī, and drifting in Central Asia to name the Persian-speaking Tajiks.',
  },
  baghdad: {
    display: 'The Baghdād family',
    note: 'The Iranian village-name, "god-given," that outlived the official Madīnat al-Salām to name the Abbasid capital; attested before Islam in the Talmudic Baḡdāṯā and carried to Song China as Báidá.',
  },
  makka: {
    display: 'The Makka family',
    note: 'The Qur\'anic name of Mecca, of unknown etymology and with the scriptural doublet Bakka; carried by the pilgrimage and the sea trade as far as the Chinese Májiā.',
  },
  yathrib: {
    display: 'The Yathrib family',
    note: 'The ancient name of Medina, its consonants y-t-r-b stable from the cuneiform Iatribu of Nabonidus through the Greek Iathrippa to the Arabic Yathrib the new faith retired.',
  },
  yarden: {
    display: 'The Yardēn family',
    note: 'The name of the Jordan, Hebrew Yardēn, "the descender," for the river that falls to the Dead Sea, the lowest point on earth; carried by scripture into the Greek Iordánēs, Latin, Syriac, Geʿez, and the Arabic al-Urdunn that names the modern country.',
  },
  aigaion: {
    display: 'The Aigaîon family',
    note: 'The Greek name of the Aegean, Aigaîon, of contested ancient etymology, and its Latin reflex Aegaeum; the Greek Aigaîon Pélagos was later reshaped into Arkhipélagos, the source of the word "archipelago."',
  },
  parthava: {
    display: 'The Parθava family',
    note: 'The name of Parthia, Old Persian Parθava, a dialectal twin of Pārsa (Persia); the Parthian self-name Parθaw became, by the Iranian rθ→hl shift, the Middle Persian Pahlaw, source of "Pahlavi," and the Sanskrit Pahlava, while Greek Parthía and Latin Parthia gave the English name.',
  },
  baxtri: {
    display: 'The Bāxδī family',
    note: 'The name of Bactria, Avestan Bāxδī (one of the sixteen Aryan lands of the Vendidad) and Old Persian Bāxtriš, carried into Greek Baktría and Latin Bactria and, in the hl-form, the Sanskrit Bāhlika; the Middle Persian Baxl survives as the city Balkh.',
  },
  makedon: {
    display: 'The Makedṓn family',
    note: 'The ethnonym of the Macedonians, Greek Makedṓn and Latin Macedō; the Aramaic-speaking East knew Macedon chiefly through Alexander, giving the q-forms Arabic al-Maqdūnī and Jewish Babylonian Aramaic Mūqdōn, the Greek κ rendered as the q of the Semitic transmission.',
  },
  makedonia: {
    display: 'The Makedonía family',
    note: 'The land-name of Macedonia, Greek Makedonía (built on the ethnonym Makedṓn) and Latin Macedonia, taken east through the Greek of scripture as Syriac Maqedōniyā and Arabic Maqadūniya, all sharing the qōp̄/qof/qāf that marks the Aramaic route.',
  },
  tyrsenoi: {
    display: 'The Tyrrhēnoí family',
    note: 'The outsiders\' name for the Etruscans, Greek Tyrrhēnoí (Ionic Tyrsēnoí) and Latin Etrūscī / Tuscī, both apparently built on a Mediterranean turs- root and quite distinct from the Etruscans\' own self-name Raśna; Latin Tuscī gives the modern "Tuscany," Greek Tyrrhēnía the Tyrrhenian Sea.',
  },
  kaphtor: {
    display: 'The Kaphtor family',
    note: 'The Bronze Age Near Eastern name for Crete and the Aegean world of the Minoans: Egyptian Kftjw, Akkadian Kaptara, Ugaritic kptr, and Hebrew Kaftor (Caphtor, whence the Philistines came). The identification with Crete is the standard view but debated, and the name is unrelated to the later Greek Krḗtē.',
  },
  krete: {
    display: 'The Krḗtē family',
    note: 'The Greek name of the island, Krḗtē, a pre-Greek word unrelated to the Bronze Age Kaphtor, carried into Latin as Creta and, through the Greek of the New Testament, into Syriac as Qreṭē (the Crete of Paul\'s shipwreck voyage in Acts).',
  },
  mykenai: {
    display: 'The Mykēnai family',
    note: 'The name of the citadel of Mycenae, Greek Mykēnai (Homer\'s "well-built Mycenae, rich in gold") and Latin Mycēnae; a pre-Greek place-name that gave its name to the whole Mycenaean civilization and age.',
  },
  knossos: {
    display: 'The Knossos family',
    note: 'The name of the great Cretan palace-city, attested in its own Linear B archive as ko-no-so and carried on into Greek Knōsós and Latin Cnosus; a pre-Greek name, recorded by the Mycenaeans who ruled Knossos centuries before Homer made it the city of Minos.',
  },
  byzantion: {
    display: 'The Byzántion family',
    note: 'The original name of the city on the Bosphorus, Greek Byzántion after its Megarian founder Byzas and Latin Byzantium; the name of the Greek colony of 657 BCE, before Constantine refounded it as Constantinople.',
  },
  constantinople: {
    display: 'The Constantinople family',
    note: 'The name Constantine gave the city he refounded in 330 CE, Greek Kōnstantinoúpolis, "the city of Constantine" (and Néa Rhōmē, "New Rome"), carried into Latin Constantinopolis, Arabic al-Qusṭanṭīniyya, and Syriac Qusṭanṭīnupolis; the colloquial "to the City," eis tēn pólin, would later become Istanbul.',
  },
  tarchna: {
    display: 'The Tarχna family',
    note: 'The name of the Etruscan city Tarquinia, Etruscan Tarχna (attested in the gens Tarchunies, the family whence Rome took its Tarquin kings) and Latin Tarquiniī; the dynastic Tarquinius and the modern Tarquinia both descend from it.',
  },
  veii: {
    display: 'The Veii family',
    note: 'The name of the Etruscan city of Veii, Rome\'s great rival until its fall in 396 BCE: Latin Veiī and Greek Ouioí; the Etruscan city-form is inferred from the attested name of the goddess Vei, its eponym.',
  },
  syrakousai: {
    display: 'The Syrákousai family',
    note: 'The name of Syracuse, Greek Syrákousai (from the Sicel marsh Syrakō by its harbour), carried into Latin Syrācūsae and, through the Romance of Islamic Sicily, the Arabic Saraqūsa; the modern Siracusa continues the Latin line.',
  },
  ephesos: {
    display: 'The Éphesos family',
    note: 'The name of Ephesus, the great Ionian city of the Temple of Artemis, Greek Éphesos (a pre-Greek Anatolian name) carried into Latin Ephesus, Syriac Efesos, and Arabic Afsūs; the Bronze Age Arzawan capital Apaša of the Hittite archives is widely, though not certainly, identified as its ancestor.',
  },
  miletos: {
    display: 'The Mílētos family',
    note: 'The name of Miletus, the great Ionian city, Greek Mílētos (a pre-Greek Anatolian name) carried into Latin Miletus; uniquely it has two Bronze Age witnesses, the Hittite Milawanda of the Aḫḫiyawa texts and the Mycenaean Linear B mi-ra-ti-ja, "the Milesian women," of the Pylos tablets.',
  },
  tiberis: {
    display: 'The Tiberis family',
    note: 'The name of the Tiber, Rome\'s river, Latin Tiberis (of uncertain, probably pre-Latin Italic origin) and its Greek forms Tíberis and the poetic Thýbris; the river\'s archaic Latin name was the unrelated Albula, "the whitish."',
  },
  padus: {
    display: 'The Padus family',
    note: 'The name of the Po, the great river of northern Italy, Latin Padus (probably pre-Latin Ligurian) and its Greek transcription Pádos; the Ligurians called its upper course Bodincus, "the bottomless," and the modern Italian Po descends from Padus.',
  },
  eridanos: {
    display: 'The Ēridanós family',
    note: 'The Ēridanós, the mythical amber-river of the Phaethon legend into which the sun-god\'s son fell; Herodotus doubted any such river existed, but the Greek geographers identified it with the real Po, at whose delta the Baltic amber trade reached the Mediterranean.',
  },
  adrias: {
    display: 'The Adrías family',
    note: 'The name of the Adriatic Sea, Greek Adrías and Latin Hadria / mare Hadriāticum, named after the Etruscan-and-Venetic port-city of Adria near the Po delta, since left inland by the silting of the coast.',
  },
  olympos: {
    display: 'The Ólympos family',
    note: 'The name of Mount Olympus, Greek Ólympos and Latin Olympus; a pre-Greek substrate word (its -mp- cluster the mark, like the -nth- of Korinthos), meaning roughly "the high place" and reused for many mountains, but reserved in its most famous instance for the seat of the gods.',
  },
  ionios: {
    display: 'The Iónios family',
    note: 'The name of the Ionian Sea, Greek Iónios and Latin mare Ionium; the Greeks derived it from Io, the heifer-maiden who swam it fleeing Hera. It is NOT named after the Ionians of Ionia (the Iōnes, whose own name-family is separate), a coincidence of sound that has long confused the two.',
  },
  korinthos: {
    display: 'The Kórinthos family',
    note: 'The name of Corinth, Greek Kórinthos (a pre-Greek name, its -nth- cluster the substrate tell, like Olympos\'s -mp-), carried into Latin Corinthus and, through Paul\'s Epistles to the Corinthians, the Syriac Qurintos.',
  },
  thebai: {
    display: 'The Thêbai family',
    note: 'The name of Boeotian Thebes, the city of Oedipus and Cadmus, Greek Thêbai and Latin Thēbae; the Mycenaean Linear B te-qa (Thēgʷai) preserves the Bronze Age labiovelar that classical Greek later turned into the b of Thêbai.',
  },
  pella: {
    display: 'The Pélla family',
    note: 'The name of Pella, the Macedonian royal capital and birthplace of Alexander, Greek Pélla and Latin Pella; the name is sometimes connected to a word for stony ground, but the etymology is uncertain.',
  },
  neapolis: {
    display: 'The Neápolis family',
    note: 'The name of Naples, Greek Neápolis, "new city" (néos + pólis), and Latin Neapolis, whence the modern Napoli; the "new" city was founded beside an older settlement that bore the name Parthenópē.',
  },
  parthenope: {
    display: 'The Parthenópē family',
    note: 'The older name of Naples, Greek Parthenópē, after the Siren Parthenope, whose body was said to have washed ashore at the site; when the "new city" of Neápolis grew up beside it, the older town was called Palaepolis, "old city."',
  },
  taras: {
    display: 'The Táras family',
    note: 'The name of Tarentum, the only Spartan colony, Greek Táras after the hero Taras, son of Poseidon, saved by a dolphin; Latin Tarentum is built on the Greek oblique stem Tarant-, whence the modern Taranto.',
  },
  'magna-graecia': {
    display: 'The Magna Graecia family',
    note: 'The name of the Greek-colonized south of Italy, Greek Megálē Hellás, "Great Greece," and Latin Magna Graecia; unusually for this atlas the Latin is a calque of the Greek, not the other way round, the Greeks having named the density of their own colonies.',
  },
  latium: {
    display: 'The Latium family',
    note: 'The name of Latium, the plain of the Latins around Rome, Latin Latium and its Greek transcription Látion; derived in legend from where Saturn lay hidden (lateo) or from king Latinus, but most likely from latus, "the flat, broad land."',
  },
  sikelia: {
    display: 'The Sikelía family',
    note: 'The name of Sicily after the Sikeloi (Sicels), Greek Sikelía, carried into Latin Sicilia and, under the medieval emirate, the Arabic Ṣiqilliya; the mainline name, beside the older Sikanía and the shape-name Trinakría.',
  },
  sikania: {
    display: 'The Sikanía family',
    note: 'The older name of Sicily, Greek Sikanía, after the Sicani, the island\'s earlier inhabitants; Thucydides records that the whole island was once called Sikania before the Sikels gave it the name Sikelía.',
  },
  trinakria: {
    display: 'The Trinakría family',
    note: 'The shape-name of Sicily, Greek Trinakría, "three-cornered" (tri- + akra, for the island\'s three capes), reanalyzed from the older opaque Homeric Thrinakíē; carried into Latin as Trinacria.',
  },
  cina: {
    display: 'The Cīna family',
    note: 'The name of China from the Qín (秦) dynasty, carried out of India as Sanskrit Cīna and through Iran into Persian Čīn, Greek Sînai, Latin Sīnae, Arabic al-Ṣīn, and Syriac Bēth Sīnāyē; the source, through the sea-route form, of the English "China" and the prefix Sino-.',
  },
  seres: {
    display: 'The Sêres family',
    note: 'The Greco-Roman name for the China reached overland, the "silk people" (Greek Sêres, Latin Sēres) and their land Sērikḗ / Sērica, from Greek sḗr, "silk"; the overland twin of the maritime Sînai, and, through Latin sēricum, the hidden source of the word "silk."',
  },
  yamuna: {
    display: 'The Yamunā family',
    note: 'The name of the Yamuna, Sanskrit Yamunā (the river and the goddess, twin of Yama), which fragmented in every language that met it: two rival Greek spellings (Iōmánēs from Megasthenes, Diámouna from Ptolemy), Latin Iomanes, and a scatter of Chinese Buddhist transcriptions — the mirror of its sister Gaṅgā, whose name held intact everywhere.',
  },
  himalaya: {
    display: 'The Himālaya family',
    note: 'The name of the Himalayas, from the Sanskrit himá, "snow," inside both Himālaya ("abode of snow") and Himavat ("the snowy one," the personified mountain, father of Gaṅgā and Pārvatī); the Greeks and Romans caught the snow-word twice, as Imaus and Emodos, two names for one range that Pliny correctly glossed as meaning "snowy."',
  },
  dakshinapatha: {
    display: 'The Dakṣiṇāpatha family',
    note: 'The name of the Deccan, Sanskrit Dakṣiṇāpatha, "the southern road/region" (dakṣiṇa "south" + patha "road"), transcribed by the Greek merchant of the Periplus as Dachinabádēs with the correct gloss "dachanos means south"; the same dakṣiṇa, through Prakrit dakkhiṇa, gives the modern "Deccan."',
  },
  ganga: {
    display: 'The Gaṅgā family',
    note: 'The name of the Ganges, Sanskrit Gaṅgā (the sacred river and its goddess), carried almost unchanged into Greek Gángēs and Latin Ganges and transcribed in the Chinese Buddhist canon as 恒河 (Hénghé); unlike the Indus, whose name fragmented across the languages that crossed it, the holy Ganges kept its name everywhere it traveled.',
  },
  sindhu: {
    display: 'The Sindhu family',
    note: 'The world\'s name for India, from the Indus river: Sanskrit Sindhu became Old Persian Hinduš, the Achaemenid frontier province generalized to the whole subcontinent, and forks into Elamite Hinduš and Babylonian Indû, Avestan Hapta Həṇdu, Greek Indía and Latin India, Hebrew Hōddû, Geʿez Hendekē, and the Iranian Hind that yields Syriac Hendu, Arabic al-Hind, and the Chinese transcriptions Shēndú, Tiānzhú, and Yìndù; the source of English "India" and, through Hinduš, the word "Hindu." India\'s own name for itself, Bhārata, stands outside it.',
  },
  'lower-sea': {
    display: 'The Lower Sea',
    note: 'The Mesopotamian name for the Persian Gulf by its position relative to the rivers, Sumerian a-ab-ba sig, "lower sea," calqued into Akkadian tâmtu šaplītu; paired with the "Upper Sea" of the Mediterranean, the two bracketing the land a king claimed to rule from edge to edge.',
  },
  'persian-sea': {
    display: 'The Persian Sea',
    note: 'The Gulf named for the land on its shore, from Darius\'s Old Persian "the sea that goes from Persia" through Greek Persikòs Kólpos and Latin Sinus Persicus to the Arabic Baḥr Fāris of the medieval geographers; the naming that prevailed and gives the modern Persian Gulf.',
  },
  suph: {
    display: 'The Yam Sūph family',
    note: 'The Hebrew name of the Red Sea, yam sūph, "sea of reeds" (or "of the end"), the water of the Exodus, carried into the Syriac Peshitta as yammā d-sōp; a name describing the marsh-reeds of its head, not the colour the Greeks saw.',
  },
  erythra: {
    display: 'The Erythrà Thálassa family',
    note: 'The Greek "Red Sea," Erythrà Thálassa, and its Latin renderings Mare Rubrum and Mare Erythraeum; classically the name spanned the whole north-western Indian Ocean, and the Greeks explained the colour by an eponymous king Erythras rather than the water itself.',
  },
  'salt-sea': {
    display: 'The Salt Sea family',
    note: 'The Hebrew name of the Dead Sea, yam ha-melaḥ, "sea of salt," rendered in the Aramaic Targum as yammā de-milḥā; a flat description of the one quality that made the water lifeless and the name that anchors the lake in the Hebrew Bible.',
  },
  asphaltitis: {
    display: 'The Asphaltîtis family',
    note: 'The Greco-Roman name of the Dead Sea by the bitumen that floated on it, Greek (Límnē) Asphaltîtis, "Asphalt Lake," and Latin Lacus Asphaltites; the classical world named the lake for the asphalt it traded out of it, beside the parallel "Dead Sea" of Pausanias and Galen.',
  },
  lbn: {
    display: 'The lbn family',
    note: 'The Northwest Semitic name of Mount Lebanon, from the root lbn, "white," for its snow and pale limestone: Hebrew Lᵊḇānōn, Akkadian Labnānu, Ugaritic and Phoenician lbnn, Syriac Lebnān, Arabic Lubnān, and the Greek Líbanos and Latin Libanus borrowed from the Semitic; the cedar mountain named for its colour.',
  },
  aram: {
    display: 'The Aram family',
    note: 'The Semitic name of the Arameans and their land, Hebrew Ărām, Aramaic Aram, Akkadian Aramu; the people\'s own name for inland Syria, distinct from the Greek Syria the outside world fixed on the same region.',
  },
  syria: {
    display: 'The Syría family',
    note: 'The Greek Syría and its heirs Latin Syria and Syriac Sūryā; widely held to be a clipped form of Assyria, the northern Mesopotamian power\'s name extended by the Greeks to the whole Aramean west, an identification the Çineköy bilingual supports.',
  },
  phrygia: {
    display: 'The Phrygía family',
    note: 'The Greek Phrygía and Latin Phrygia, the kingdom of Midas and Gordion in west-central Anatolia.',
  },
  mushku: {
    display: 'The Mušku family',
    note: 'The Assyrian Mušku and Hebrew Mešek for the Phrygians, the eastern name of the people whose king Mita (Midas) the Assyrian annals recorded, beside the Greek Phrygía.',
  },
  lydia: {
    display: 'The Lydía family',
    note: 'The Greek Lydía and Latin Lydia, the kingdom of the Mermnad kings and Croesus at Sardis; the Greeks knew its people in Homer as the Maeonians.',
  },
  luddu: {
    display: 'The Luddu family',
    note: 'The Assyrian Luddu and Hebrew Lud for Lydia, the eastern name of the kingdom of Sardis, whose king Gugu (Gyges) opened relations with Ashurbanipal.',
  },
  katpatuka: {
    display: 'The Katpatuka family',
    note: 'The Old Persian satrapy-name Katpatuka, taken into Greek as Kappadokía and Latin Cappadocia; an Achaemenid administrative name that became the region\'s name in the classical world.',
  },
  kilikia: {
    display: 'The Kilikía family',
    note: 'The Greek Kilikía and Latin Cilicia, the southeastern Anatolian coast, perhaps connected with the Assyrian Ḫilakku of the same rough country.',
  },
  lykia: {
    display: 'The Lykía family',
    note: 'The Greek Lykía and Latin Lycia, the outside world\'s name for the people who called themselves Trm̃mili; the exonym bears no resemblance to that endonym.',
  },
  peleset: {
    display: 'The Peleset family',
    note: 'The name of the Philistines and their coast, from Egyptian Peleset, the Sea People of the Medinet Habu reliefs, and Hebrew Pᵊlešet through Assyrian Palaštu to Greek Palaistínē, Latin Palaestina, and Arabic Filasṭīn; one Sea People\'s name generalized into the name of a land.',
  },
  pontos: {
    display: 'The Póntos family',
    note: 'The Greek name of the Black Sea, Póntos Eúxeinos, "the Hospitable Sea," a superstitious euphemism replacing the older Áxeinos, "Inhospitable"; carried into Latin Pontus Euxinus and, through Póntos, the Arabic Baḥr Nīṭas.',
  },
  kaspia: {
    display: 'The Kaspía family',
    note: 'The Greek Kaspía and Latin Mare Caspium, the Caspian Sea named after the Caspii who lived on its shores, beside the rival Greek Hyrkanía that named it for the province of Hyrcania; Armenian Kaspicʿ cov declines the same people\'s name in native grammar, and medieval Latin carried Mare Caspium to Rubruck\'s correction of Isidore.',
  },
  graikoi: {
    display: 'The Graikoí family',
    note: 'The western name of the Greeks: the old ethnic Graikoí that Aristotle remembered, carried into Latin as Graeci and Graecia and into Etruscan as Creice, the root of the English "Greek" — the West\'s answer to the East\'s Yawan family.',
  },
  tsigane: {
    display: 'The Tsigane family',
    note: 'The name Europe gave the Romani by mistake: the Byzantine Atsínganoi, a dead heretical sect\'s label slid onto a new itinerant people, worn down through the Balkans into the Latin Cigani of Sigismund\'s 1423 safe-conduct and, beyond 1453, into Tsigane, Zigeuner, Cigány, and țigan.',
  },
  gihon: {
    display: 'The Gîḥôn family',
    note: 'The second river of Eden landed on the Nile: Hebrew Gîḥôn, "the Gusher," which Genesis winds through the land of Kush, identified with Egypt\'s river by the Septuagint, Ben Sira, and Josephus, and carried into Geʿez as Giyon, the Blue Nile rising in paradise.',
  },
  sarakenoi: {
    display: 'The Sarakēnoí family',
    note: 'The name Christendom used for the Islamic world: Greek Sarakēnoí, a Ptolemaic label for Arabian nomads stretched over the caliphate, and its Latin echo Sarraceni; John of Damascus supplied the medieval etymology, "empty of Sarah," filing the new power into Abraham\'s family tree.',
  },
  mediterraneum: {
    display: 'The Mediterraneum family',
    note: 'The sea in the middle of the lands: the late-antique Mare Mediterraneum of Solinus, carried into the Middle Ages by Isidore of Seville, whose Etymologiae fixed it as the name the European languages inherited.',
  },
  khazar: {
    display: 'The Khazar family',
    note: 'The Sea of the Khazars: Arabic Baḥr al-Khazar and Persian Daryā-yi Khazarān, the Caspian named for the Turkic khaganate of its northern steppe. The khaganate fell within a century of the name\'s first Persian attestation, and Persian alone still calls the sea by it.',
  },
  halys: {
    display: 'The Hálys family',
    note: 'The Greek Hálys and Latin Halys, the great looping river of central Anatolia and the boundary of Croesus\'s kingdom, perhaps from Greek háls, "salt"; the Hittites knew it as the Maraššantiya.',
  },
  ararat: {
    display: 'The Ararat family',
    note: 'The Hebrew Ăraraṭ and the Greek Ararát of the Septuagint, the mountains on which the ark came to rest; the same name as the Assyrian kingdom of Urarṭu, of which it is the Hebrew form.',
  },
  kaukasos: {
    display: 'The Kaúkasos family',
    note: 'The Greek Kaúkasos and Latin Caucasus, the great range between the Black Sea and the Caspian where Prometheus was chained; the name later doubled westward as the "Indian Caucasus," the Hindu Kush.',
  },
  hellespontos: {
    display: 'The Hellḗspontos family',
    note: 'The Greek Hellḗspontos, "sea of Helle," and Latin Hellespontus, the strait named for Helle, who fell from the golden ram into its water; the modern Dardanelles.',
  },
  bosporos: {
    display: 'The Bósporos family',
    note: 'The Greek Bósporos, "ox-ford," and Latin Bosporus, the strait named for Io, whom Hera had turned into a heifer and who swam across it in her wanderings.',
  },
  tauros: {
    display: 'The Taûros family',
    note: 'The Greek Taûros, "the Bull," and Latin Taurus, the mountain wall that divides the Anatolian plateau from the southern coast, pierced by the pass of the Cilician Gates.',
  },
  vaxshu: {
    display: 'The Vaxšu family',
    note: 'The Iranian river-name of the Oxus (Amu Darya): Avestan Vaxšu and its river-spirit, Sanskrit Vakṣu, carried into Greek Ōxos and Latin Oxus; the great river and northern boundary of Bactria.',
  },
  jaxartes: {
    display: 'The Iaxártēs family',
    note: 'The Greek Iaxártēs and Latin Iaxartes, the Syr Darya, the northern of the two great rivers of Central Asia, beyond which lay the steppe of the Saka.',
  },
  paropamisos: {
    display: 'The Paropámisos family',
    note: 'The Greek Paropámisos and Latin Paropamisus, the range Alexander\'s geographers also called the Indian Caucasus, the modern Hindu Kush.',
  },
  suguda: {
    display: 'The Suguda family',
    note: 'The name of Sogdiana: Old Persian Suguda, Avestan Suγδa of the Vendidad\'s list of lands, Greek Sogdianḗ, Latin Sogdiana, and Arabic al-Sughd; the land of Samarkand between the Oxus and the Jaxartes.',
  },
  gandhara: {
    display: 'The Gandhāra family',
    note: 'The name of Gandhāra: Sanskrit Gandhāra, Old Persian Gandāra, Greek Gandárioi, Latin Gandaris, and the Chinese Jiàntuóluó of the Buddhist pilgrims; the region of Taxila at the northwestern gate of India.',
  },
  panchanada: {
    display: 'The Pañcanada family',
    note: 'The "five rivers" of the Punjab, Sanskrit Pañcanada calqued into Persian Panjāb; the land of the five eastern tributaries of the Indus.',
  },
  skuda: {
    display: 'The *Skuda family',
    note: 'The western name-tradition for the Scythians, from an Iranian *Skuda: the Assyrian Iškuza and the Hebrew Aškenaz, the Greek Skýthai and Latin Scythae; the name by which the Near East and the Greeks knew the steppe nomads.',
  },
  saka: {
    display: 'The Saka family',
    note: 'The Iranian self-name *Saka of the eastern Scythians: Old Persian Sakā, Sanskrit Śaka, Chinese Sài, and Latin Sacae; the Achaemenid and Indian name for the steppe nomads, beside the Greek Skýthai.',
  },
  gomer: {
    display: 'The Gomer family',
    note: 'The name of the Cimmerians, from a single *Gimir-: the Assyrian Gimirru and Hebrew Gomer, the Greek Kimmérioi and Latin Cimmerii; the steppe raiders who broke into Anatolia in the early first millennium.',
  },
  tochari: {
    display: 'The Tóchari family',
    note: 'The Greek Tócharoi, Latin Tochari, and Sanskrit Tukhāra, the nomads who took Bactria from the Greeks, widely identified with the Chinese Yuèzhī; the source of the name Tokharistan.',
  },
  mada: {
    display: 'The Māda family',
    note: 'The name of the Medes, from the Old Persian Māda: the Elamite and Akkadian forms of the Achaemenid trilingual, the Hebrew Māday of Genesis 10, and the Greek Mēdía whence Latin Media; the people whose name fused with Persia in the formula "the Medes and the Persians."',
  },
  armina: {
    display: 'The Armina family',
    note: 'The exonym for Armenia, from the Old Persian Armina of the Behistun inscription: the Greek Armenía and Latin Armenia by which the land has always been known abroad, beside the native self-name Haykʿ.',
  },
  pataliputra: {
    display: 'The Pāṭaliputra family',
    note: 'The name of the Mauryan capital in every register of contact: Sanskrit Pāṭaliputra and Pali Pāṭaliputta at home, the Greek Palíbothra of Megasthenes’ embassy and its Latin echo, and the Chinese Bāliánfú of the pilgrim Faxian.',
  },
  takshashila: {
    display: 'The Takṣaśilā family',
    note: 'The city of Gandhāra as Sanskrit Takṣaśilā and Pali Takkasilā, clipped by Alexander’s historians to the Greek Táxila that Latin and modern archaeology inherited, and transcribed by Faxian with the Buddhist legend of the severed head attached.',
  },
  khumdan: {
    display: 'The Khumdān family',
    note: 'The road’s name for Chang’an: the Sogdian ʾxwmtʾn of the Ancient Letters, echoed across Asia in the Byzantine Greek Khoubdán; an Iranian name of disputed origin that the West knew better than the city’s own.',
  },
  urartu: {
    display: 'The Urarṭu family',
    note: 'The Assyrian Urarṭu for the kingdom of Van, reaching the Hebrew Bible as Ararat; the Behistun Babylonian reused it (Uraštu) to render the Old Persian Armina, binding the old highland name to its successor.',
  },
  dilmun: {
    display: 'The Dilmun family',
    note: 'The name of the Gulf trade-land, among the oldest toponyms in writing: the Sumerian Dilmun of the archaic Uruk tablets and the Akkadian Tilmun that carried the name through two millennia of commerce and annals.',
  },
  tylos: {
    display: 'The Týlos pair',
    note: 'The classical name of Bahrain, the Greek Týlos of Alexander’s surveyors and its Latin echo in Pliny; generally taken as old Tilmun in Greek dress, the Bronze Age name crossing into the alphabet.',
  },
  magan: {
    display: 'The Magan family',
    note: 'The name of the Bronze Age copper-land of the Oman peninsula: Sumerian Magan and Akkadian Makkan, one name in the two languages of the Gulf trade, later archaized by Assyrian scribes to mean Egypt.',
  },
  meluhha: {
    display: 'The Meluḫḫa family',
    note: 'The name of the farthest Bronze Age trade-land, most likely the Indus civilization, shared by Sumerian and Akkadian; possibly the only surviving name the Indus world was called while it lived.',
  },
};

export function familyDisplay(slug: string): { display: string; note?: string } {
  return FAMILIES[slug] ?? { display: `The ${slug} family` };
}
