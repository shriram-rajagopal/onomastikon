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
};

export function familyDisplay(slug: string): { display: string; note?: string } {
  return FAMILIES[slug] ?? { display: `The ${slug} family` };
}
