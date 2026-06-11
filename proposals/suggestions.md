# Suggestions — review session 2026-06-10

Tier 3: features and structural ideas, ranked by impact. Opinionated; all
respect the existing visual identity. None of these were implemented.

## Status (2026-06-11)

The author retired the entity-shipping feature gate; this list is now a live
worklist. Shipped so far: **item 4** (native_name surfaced on language pages)
and a **dark mode toggle** (author-requested; not on the original list since it
was barred at the time — parchment identity inverted to a lamplit-dark palette,
all pairings WCAG AA, prefers-color-scheme default, persisted toggle, title
cards re-aimed via filter). Still open: fonts self-hosting (1), language
summary field (2), JSON-LD (3), and the rest below.

## High impact

1. **Self-host the fonts.** Every page pulls 17 families from Google Fonts via
   a render-blocking stylesheet plus two extra connections. The script fonts
   (hieroglyphs, cuneiform, Phoenician...) are only needed on pages whose
   entries use them. Self-hosting subsets with `unicode-range` (or Fontsource
   packages) would cut first-render latency on every page and remove the
   third-party dependency entirely. This is the single biggest performance
   lever the site has, and it is invisible to design.

2. **Give languages a `summary` field.** The 21 language pages all share the
   generic site meta description ("A digital atlas of ancient names"), because
   BaseLayout only accepts authored text and languages have none. A
   one-sentence authored summary per language (like civilizations already
   have) would fix meta descriptions, OG previews, and could feed the homepage
   list. Cheap to add, pays off across SEO and sharing.

3. **JSON-LD structured data.** OG and sitemap are shipped; the natural next
   step is `schema.org` markup: `WebSite` + `SearchAction` on the homepage,
   and per-entity `Article`/`DefinedTerm` with `inLanguage` per name entry.
   This is the kind of unusually-structured scholarly content that search
   engines and AI answer engines reward heavily.

4. **Surface `native_name` on language pages.** The frontmatter stores each
   language's self-name in its own script (עִבְרִית, ܣܘܪܝܝܐ...) but the site
   never renders it as text — it only appears baked into the card PNGs, where
   it is invisible to readers without images, to screen readers, to search,
   and to copy-paste. A line under the h1 (with the new `lang`/`dir`
   attributes) would make the endonym real content. Fits the project's whole
   thesis: the language's own name for itself should be first-class.

## Medium impact

5. **Copy button for transliterations.** The brief asked about copy-friendliness;
   selection is clean today, but a small per-entry copy affordance (original +
   transliteration) would serve the citing-researcher use case. Kept here
   rather than Tier 1 because it adds UI to a deliberately quiet design.

6. **RSS/Atom feed.** `@astrojs/rss` is a one-file addition. A "new entries"
   feed suits the project's audience (people who want to be told when Ugaritic
   lands, not to check back).

7. **Sync `roadmap.md`.** It predates Parthian/Syriac/Classical Chinese and the
   language title cards; the open-work memory note and the roadmap currently
   disagree. (Tracked already; listing here so it doesn't get lost.)

8. **`era_end` display for ongoing-relevance entries.** `formatEra` renders
   "c. 100 CE – 700 CE" style ranges everywhere; some entries (Coptic, Arabic
   continuity cases) might warrant an explicit "in continued use" convention
   eventually. Worth deciding once, before the corpus doubles.

## Lower impact / infrastructure

9. **Pre-deploy QA harness in CI.** `lint:content` + `astro build` run locally;
   a GitHub Action running both on push would catch breakage before Vercel
   does. (The browser-level checks stay manual via the deploy-QA skill.)

10. **`apple-touch-icon`.** SHIPPED 2026-06-11, together with a favicon
    replacement: the `.svg`/`.ico` on disk turned out to be the stock Astro
    rocket, now replaced by a sigma mark (oxblood on parchment, dark-scheme
    variant in the SVG) with a matching 180×180 touch icon.

11. **Search index growth plan.** The single JSON index is ~63 names and loads
    on the search page only — fine now, fine at 500 entries. Past that,
    consider splitting by collection or lazy-loading on first keystroke. No
    action needed yet; noting the threshold so it's a decision, not a surprise.

## Contrast note (per the brief)

All palette combinations were checked against WCAG AA and pass: body ink 12.6:1,
ink-soft 7.7:1, accent 8.1:1 on parchment; all four badge pairs sit between
5.5:1 and 6.5:1. The two failures found (era text and the permalink `#` at
reduced opacity) were opacity artifacts, not palette problems, and were fixed
in Tier 1. No palette change is needed.
