# Onomastikon

**A digital atlas of ancient names.**

What the great civilizations of antiquity called themselves and what their neighbors referred to them as. Each entry records the original script, transliteration, IPA pronunciation, literal meaning, and primary sources, with explicit attention to uncertainty and reconstruction.

**Live site:** [onomastikon.org](https://onomastikon.org)

**Methodology:** [onomastikon.org/about](https://onomastikon.org/about)

## What this is

Onomastikon catalogues the names of ancient civilizations across the languages of antiquity all on one page. The unit of interest is the name itself as a linguistic artifact, presented with the rigor of a scholarly lexicon and the navigability of a modern atlas.

The project is intended for students, language enthusiasts, history teachers, and anyone curious about how civilizations identified themselves and one another in the ancient world.

## Editorial principles

- **Citations on every claim.** Each name entry lists the standard reference works and primary sources it draws from. Tertiary aggregators are used as starting points for navigation only.
- **Honest about uncertainty.** Every entry carries one of three confidence labels: *attested*, *reconstructed*, or *disputed*. Reconstructed pronunciations are marked with the conventional leading asterisk. All dates are flagged as approximate with the *circa* convention.
- **Original scripts displayed prominently.** Egyptian hieroglyphs, cuneiform, Devanagari, Hebrew, and Greek are rendered in their original writing systems alongside transliterations and IPA.

Read the full [methodology](https://onomastikon.org/about) for details on source tiers, reconstruction conventions, and editorial scope.

## Project structure

Onomastikon is built as a static site using [Astro](https://astro.build). All content is stored as Markdown files with YAML frontmatter, validated against a strict type schema. Each entry is therefore citable, version-controlled, and improvable by pull request.

    src/
    ├── content/
    │   ├── civilizations/   # one Markdown file per civilization
    │   ├── languages/       # one Markdown file per language
    │   └── names/           # one Markdown file per attested name
    ├── content.config.ts    # the schema for all three collections
    ├── layouts/             # shared page chrome
    └── pages/               # routes (homepage, civilization pages, language pages, about)

The schema enforces that every name entry has a civilization, a language, a transliteration, a confidence label, and at least one source.

## Contributing

Corrections, missing entries, and substantive disagreements with how a name is presented are welcome. Two options:

- **Open an issue** describing the problem and citing the source you would reference for the correction.
- **Submit a pull request** with the proposed change.

Corrections should be sourced to standard reference works in the relevant philological tradition wherever possible.

## License

- **Code:** [MIT](LICENSE)
- **Content:** [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Citation of any name entry should reference both the project and the specific scholarly sources listed in that entry.

## Acknowledgements

Onomastikon is a personal project of [Shriram Rajagopal](https://github.com/shriram-rajagopal), in active development. It stands on the shoulders of the standard reference works listed in each entry, particularly the *Oxford Classical Dictionary*, the Chicago Assyrian Dictionary, the *Lexikon der Ägyptologie*, and *Encyclopaedia Iranica*, and on the open-access scholarly databases that make ancient linguistic data publicly available (CDLI, ORACC, Perseus, *Thesaurus Linguae Aegyptiae*).