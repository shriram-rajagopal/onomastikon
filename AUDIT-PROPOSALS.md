# Audit proposals — July 2026 external audit

Proposal-only items from the July 2026 external audit, awaiting sign-off.
Implemented items are recorded in AUDIT-REPORT.md; nothing in this file has
been implemented unless explicitly marked.

## 4b. URL taxonomy migration (PROPOSAL ONLY)

Today every entity lives under `/civilizations/<slug>`, rivers and seas
included. The frontmatter `type` field (civilization | city | region |
geographic_feature) can drive a four-way split:

| type | proposed path |
|---|---|
| civilization | `/civilizations/<slug>` (unchanged) |
| city | `/places/<slug>` |
| region | `/regions/<slug>` |
| geographic_feature | `/features/<slug>` |

Mechanics: rename the route to a spread parameter or generate all four from
one `[...path].astro` via `getStaticPaths` mapping `type → prefix`; add 301s
in `vercel.json` (`/civilizations/:slug` → typed path, one redirect rule per
non-civilization entity, generated at build or maintained as a static list of
~75 rules).

Blast radius (measured against the current code):

- **Internal links**: 21 occurrences of `/civilizations/` across 8 source
  files (index, names-of-the-day, feed.xml.ts, onomastikon.json.ts, compare,
  languages/[slug], search-index.json.ts, civilizations/[slug] itself —
  pager, ghost cards, breadcrumbs, cite URLs).
- **Sitemap**: regenerates automatically from routes; no manual work, but
  the old URLs drop out and need the 301 layer to hold rank.
- **JSON export**: every `url` field changes for ~75 non-civilization
  entities; consumers pinning URLs break unless the export keeps the old
  path as an `alias` field for a deprecation window.
- **RSS**: item links for past entries change; feeds that stored old GUIDs
  will re-show items unless GUIDs are pinned to the old URLs.
- **Hardcoded paths**: citation lines and BibTeX blocks bake the URL into
  copyable text; every previously copied citation goes stale (mitigated by
  the 301s). The locator SVG endpoint (`/locators/<slug>.svg`) is
  slug-keyed, not path-keyed, and survives unchanged.
- **External**: inbound links and search-engine indexation ride the 301s.

Recommendation if approved: implement behind a single `entityPath(type,
slug)` helper swapped in one commit, generate the redirect list from the
collections at build time, and keep `alias_url` in the JSON export for one
release cycle.

## 4c. External-authority IDs (PROPOSAL ONLY)

Add to the civilizations schema three optional fields:

```ts
pleiades_id: z.string().optional(),      // Pleiades gazetteer
trismegistos_id: z.string().optional(),  // Trismegistos GEO
wikidata_id: z.string().optional(),      // Wikidata Q-number
```

Entity pages would render a "Cross-references" section only when at least
one ID exists, linking to the authority records; the JSON export would carry
the raw IDs. No IDs have been looked up or populated — that is deliberate:
populating them is a per-entity scholarly verification task (Pleiades and
Trismegistos IDs are easy to mis-assign between homonymous places), so it
should go through the usual confirm-checkpoint workflow, a batch at a time.

## 5a. "Ancient" branding inventory

The scope runs Bronze Age–1453; "ancient" undersells the medieval half.
Full inventory of branding strings, with dispositions:

**Implemented (mechanical tagline/description swaps):**

| Location | Old | New |
|---|---|---|
| BaseLayout homepage `<title>` suffix | A digital atlas of ancient names | A digital atlas of ancient and medieval names |
| BaseLayout footer line | A digital atlas of ancient names | A digital atlas of ancient and medieval names |
| BaseLayout default meta description | …of antiquity. | …of the ancient and medieval worlds, from the Bronze Age to the fall of Constantinople. |
| Homepage `<h1>` tagline | A digital atlas of ancient names | A digital atlas of ancient and medieval names |
| Homepage tagline paragraph + WebSite JSON-LD description | …of antiquity. | same swap as the meta description |
| feed.xml channel description | …atlas of ancient names…of antiquity. | both swaps |
| README tagline + description lines | ancient names / ancient entities / in the ancient world | ancient and medieval names / entities of the ancient and medieval worlds / in the ancient and medieval worlds |

**Proposal-only (owner's call, not mechanical):**

- The site's formal name as it appears in citations, BibTeX `note` fields,
  the JSON export `title`, and JSON-LD (`Onomastikon: A Digital Atlas of
  Ancient Names`). Renaming changes what every visitor has already copied
  into their bibliographies; if renamed, old citation strings stay valid as
  pointers but diverge from the site's self-description. Suggested if
  desired: "Onomastikon: A Digital Atlas of Ancient and Medieval Names".
- The About page's prose ("catalogues the names of ancient entities…",
  "covers entities of the ancient world…"): essay text, stays with the
  author.
- The era-portrait sentence "…closes where naming began: with an ancient
  city under a new name" is editorial voice about Constantinople, not scope
  branding; no change proposed.

## 5c. IPA methodology note for the About page (owner-authored)

The audit asks that the About page state, per language, which phonological
reconstruction system the IPA follows (e.g. Allen's *Vox Graeca* for Greek,
the conventional Assyriological values for Akkadian, the italianate register
for Medieval Latin), and that IPA-less entries say why they carry none
(policy per language: Sumerian and Classical Chinese by editorial policy,
Lycian/Moabite for want of a reading tradition, etc.). The per-language
tables already exist in the project's internal transliteration reference;
the About page section should be authored by the owner from that material.
