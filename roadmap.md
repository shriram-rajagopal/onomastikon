# Onomastikon Roadmap

A working document for the project's intended scope and direction. This is a plan; revisions are expected as the project matures.

## Scope sentence

Onomastikon catalogues the named entities of the ancient world — civilizations, cities, regions, and geographic features — across the languages of antiquity. The unit of interest is the name itself as a linguistic and historical artifact, presented with the rigor of a scholarly lexicon and the navigability of a modern atlas.

## Temporal scope

Bronze Age through Late Antiquity (roughly 3100 BCE to c. 600 CE), with later attestations included where they preserve continuity with ancient naming traditions (Sasanian Persian, Byzantine Greek, Late Antique Coptic, Classic Maya). Modern reflexes of ancient names are noted per entry where they descend directly from the ancient form, but modern names are not first-class subjects.

## Phase 1: Core Mediterranean and Near East

Target: 12-15 civilizations + supporting cities, regions, and geographic features. Goal completion: end of January 2026. **Status: complete (2026-06) — all 14 civilizations, 15 cities, 4 regions, and 6 geographic features done, with the full Phase-1 language inventory (Hurrian last). A few entities remain `developing` where a single in-scope form is real but not yet digitally sourceable (Geʿez NT minor forms, some Bronze Age Egyptian glyphs, Syriac Maccabees, Imperial Aramaic Hermopolis); these are prose-noted and closed opportunistically as sources surface.**

### Civilizations
- [x] Egypt
- [x] Greece
- [x] Persia
- [x] Sumer
- [x] Akkad
- [x] Babylonia
- [x] Assyria
- [x] Rome
- [x] Phoenicia
- [x] Carthage
- [x] The Hittites
- [x] Mitanni
- [x] Elam
- [x] Israel and Judah (treat as separate entries)

### Cities
- [x] Babylon
- [x] Ur
- [x] Uruk
- [x] Nineveh
- [x] Memphis
- [x] Alexandria
- [x] Athens
- [x] Sparta
- [x] Troy / Ilion
- [x] Damascus
- [x] Jerusalem
- [x] Susa
- [x] Persepolis
- [x] Tyre
- [x] Sidon

### Regions
- [x] Mesopotamia
- [x] Canaan
- [x] Anatolia / Asia Minor
- [x] Italia (originally only southern Italy)

### Geographic features
- [x] The Nile
- [x] The Tigris
- [x] The Euphrates
- [x] The Jordan
- [x] The Mediterranean Sea
- [x] The Aegean Sea

### Languages needed for Phase 1
- [x] Egyptian (Middle Egyptian)
- [x] Akkadian
- [x] Ancient Greek
- [x] Latin
- [x] Old Persian
- [x] Sanskrit
- [x] Biblical Hebrew
- [x] Sumerian
- [x] Aramaic (as Imperial Aramaic)
- [x] Phoenician
- [x] Hittite
- [x] Elamite
- [x] Hurrian

Added beyond the original Phase 1 list, pulled in by entries that needed them:
- [x] Demotic
- [x] Ugaritic
- [x] Classical Arabic
- [x] Syriac
- [x] Parthian

## Phase 2: Expanding the eastern axis

Target: 5-8 additional civilizations, primarily covering Inner Asia, the Iranian world, and India. Goal: end of April 2026.

### Civilizations
- [ ] India / Bhārata (separate entry from "Hinduš/India" — they refer to different conceptual units)
- [ ] Hinduš / India (the geographic-Indus name as transmitted westward)
- [ ] Media
- [ ] Parthia
- [ ] Bactria
- [ ] Scythia / Saka
- [ ] Armenia
- [ ] China (Han / Zhōngguó)
- [ ] Urartu / Biainili

### Cities
- [ ] Pataliputra
- [ ] Taxila
- [ ] Chang'an
- [ ] Bactra / Balkh

### Regions
- [ ] Iran (cultural-Iranian framing distinct from Persia/Pārsa)
- [ ] Sogdiana
- [ ] The Punjab
- [ ] Sindh

### Geographic features
- [ ] The Indus
- [ ] The Oxus / Amu Darya
- [ ] The Ganges
- [ ] The Himalayas
- [ ] The Caspian Sea
- [ ] The Black Sea / Pontus

### Languages needed for Phase 2
- [ ] Avestan
- [x] Middle Persian (Pahlavi) (added early, during Phase 1)
- [ ] Sogdian
- [ ] Pali
- [x] Classical Chinese (added early, with the Rome and Persia entries)
- [ ] Urartian

## Phase 3: The Americas, Africa, and edge cases

Target: by end of summer 2026, before junior-year application work intensifies.

### Civilizations
- [ ] Kush / Nubia
- [ ] Aksum
- [ ] The Maya
- [ ] The Mexica / Aztec
- [ ] The Inka / Tawantinsuyu
- [ ] The Olmec
- [ ] Punt

### Cities
- [ ] Meroë
- [ ] Tenochtitlán
- [ ] Tikal
- [ ] Cuzco
- [ ] Teotihuacán

### Languages needed for Phase 3
- [x] Coptic (added early, during Phase 1)
- [x] Geʽez (added early, during Phase 1)
- [ ] Nahuatl
- [ ] Quechua
- [ ] Mayan languages / glyphic Maya

## Feature roadmap

### Soon (after ~10-15 entities)
- [ ] Mobile font fix for missing characters (note: cuneiform/Old Persian/Devanagari rendering on some mobile devices needs verification; webfonts now load for all scripts in the inventory, including Inscriptional Parthian, Manichaean, and Syriac, but device verification is still owed)
- [x] Custom favicon (the wordmark's sigma in oxblood on a parchment tile, dark-scheme variant in the SVG, plus a 180×180 apple-touch-icon; replaced the Astro starter rocket that had silently shipped)
- [x] Open Graph preview image for social link sharing (per-entity title cards with a site-wide fallback)
- [x] Endonym title cards for all language pages (rendered through the Remotion setup in videos/)
- [ ] DNS cleanup to Vercel's recommended new records
- [ ] LinkedIn Featured + Projects entries (no feed post yet)
- [ ] Pin Onomastikon on GitHub profile
- [ ] `modern_etymology` field per civilization, populated as entries are added or revisited
- [x] Client-side search across English names, transliterations, and original scripts
- [ ] Polished homepage hero with rotating "name of the day"
- [ ] Browse by region or era (filtered views of existing data)

### Mid-term (after ~20-25 entities)
- [ ] Comparison view: pick 2-4 entities, see them side-by-side across shared languages
- [ ] Timeline visualization: horizontal axis showing when each name for an entity was in use
- [ ] Improved mobile design (responsive CSS pass)
- [ ] Simple JSON API at predictable URLs (e.g., `/api/civilizations/egypt.json`)
- [ ] Possibly: a dedicated "From ancient names to modern English" page tracing etymological routes
- [ ] Possibly: relationships between entities (Nile *flows through* Egypt; Babylon *capital of* Babylonia)

### Long-term, only if the project grows
- [ ] Audio pronunciations (commissioned from scholars or graduate students)
- [ ] Maps integration with Pleiades coordinates
- [ ] User submissions and editorial review via GitHub PRs (only after 2-3 unsolicited correction PRs arrive)
- [ ] Browser extension for highlighting ancient names on any webpage
- [ ] Citation export in Zotero / BibTeX format
- [ ] PDF "fact sheets" per civilization for classroom use

## Editorial discipline

- **The boundary:** Don't expand temporal scope past Late Antiquity. Don't expand entity types beyond civilization/city/region/geographic feature without serious justification.
- **The audience:** Onomastikon is for students, language enthusiasts, history teachers, and anyone curious. Assume an intelligent reader who appreciates nuance but is not already a specialist.

## Things deliberately out of scope

These are out of scope so I don't get distracted by them:
- Individual people (kings, gods, philosophers) — would balloon to biographical scope
- Deities and their cross-language equations (interpretatio) — editorially fraught and a different kind of project
- Modern names as primary entries (handled only via `modern_etymology` per civilization)
- Names of ancient ethnonyms/peoples below the civilization level (the Aramaeans, Scythians, Goths, etc., except where they are themselves civilizational units)
- Roads, monuments, walls, temples, individual artifacts
- Conceptual or abstract terms (kingship, the underworld, the gods)
- Alphabets and scripts as named entities