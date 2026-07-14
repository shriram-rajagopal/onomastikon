# Experience pass — proposals, 2026-07-14

## Status (2026-07-14, same day)

Implemented in one pass, all build- and browser-verified: every item below
**except** the era_end convention (QoL 6 — awaiting an editorial decision),
dark-mode title cards (Visual 3 — deferred behind the title-card gate, as
proposed), and the audio *recordings* themselves (Audio 1 — the schema
fields, player UI, and no-TTS rule are in place; the pilot needs recorded
readings). Notable deltas from the proposal text: the search shortcut is a
page-hop, not an overlay; region filtering uses an explicit slug→shelf map in
src/lib/macro-regions.ts (no keyword heuristics; the Mediterranean is
deliberately unshelved); homepage endonyms are served from a generated
few-KB subset face (scripts/subset-endonyms.mjs, prebuild) rather than the
full script fonts; the mini locator renders on all located pages, since every
entity page turned out to qualify for the transmission map; RSS dates come
from a committed git-derived ledger (npm run dates:update).

UI/UX, quality-of-life, performance, visual, and audio proposals from a review
of the current site (668 name entries, ~70 entities, 30 languages). Opinionated
and ranked within each section; everything respects the lamplit-study identity
and the roadmap's editorial discipline. Overlaps with `suggestions.md` are
marked; that file's open items (fonts, language summaries) still stand and are
not repeated here except where they've grown teeth.

## UI/UX changes

1. **Global search access.** Search is a destination page; it should be a
   reflex. Add a `/` (and `Cmd/Ctrl+K`) shortcut that jumps to `/search` from
   any page, and note the shortcut in the header link's `title`/`aria-keyshortcuts`.
   With prefetch (below) the page-hop is instant, so no overlay/modal is
   needed — the quiet design survives intact.

2. **Homepage filters — the roadmap's "browse by region or era", made small.**
   The index is now ~70 entities in four flat alphabetical groups; at Phase 3
   it will be ~90. Rather than new pages, add a single row of filter chips
   above the index (All · by region · by era) that regroups the existing lists
   client-side from data already in the DOM (`data-region`, `data-era`
   attributes on the rows). No new routes, no new data, degrades to the
   current list without JS.

3. **Pager and contents parity on language pages.** Civilization pages have a
   prev/next pager, a contents rail, and scrollspy; language pages have none
   of the three. A language page with 40+ entries (Akkadian, Greek) is now a
   long scroll with no in-page navigation. Add the same pager (ordered as the
   homepage lists languages) and a compact contents block grouping by entity
   type.

4. **Keyboard prev/next on entity pages.** The pager exists top and bottom;
   `←`/`→` (when focus is not in an input) should drive it. Cheap, and the
   "walk the whole atlas" reading pattern the pager was built for becomes
   genuinely fluid.

5. **Link the "Also known as" line.** Each transliteration in the aka line
   already has an anchor target below; make each one a link to its entry.
   Today the line is inert text that duplicates the TOC's job without its
   function.

6. **Copy affordances** (suggestions.md item 5, still right). One small copy
   button per name entry covering original + transliteration, and one on each
   CiteThis block. Reveal on hover/focus like the existing `#` permalink so
   the cards stay quiet.

7. **Search results grouped by kind.** Results currently interleave entities,
   languages, and name forms. Group under small headers (Entities · Languages
   · Names) or add a right-aligned kind label; the reader scanning for "the
   Egypt page" shouldn't wade through eight name-form matches first.

8. **Live-update the search URL.** `?q=` is read on load but not written while
   typing. A `history.replaceState` per input keeps results shareable and
   makes back-button behavior match expectation.

9. **404 with a way forward.** Give the 404 the search input (it's one include)
   and links to the four index sections, so a dead deep link — the likeliest
   arrival — costs one keystroke instead of a dead end.

## Quality-of-life

1. **"Random entry" link** in the footer or homepage hero. Client-side pick
   from the already-shipped search index; zero build cost. This is the single
   cheapest way to make the atlas browsable rather than only consultable, and
   it feeds the same curiosity the "name of the day" roadmap item targets.

2. **Name of the day** (roadmap). Deterministic date-hash over the name
   collection, rendered client-side from the search index into the hero — no
   daily rebuild, no CMS. Shows original script + transliteration + link.
   Pairs with (1); ship together as one small hero module.

3. **RSS/Atom feed** (suggestions.md item 6, unshipped). `@astrojs/rss`, one
   file, sorted by git-derived or frontmatter date. The audience is exactly
   "tell me when Sogdian lands."

4. **Back-to-top affordance** on entity pages past ~2 screens, styled like the
   feedback-top line. Long pages (Egypt, Greece) currently require a full
   scroll to re-reach the TOC on mobile, where the rail doesn't exist.

5. **Collapse the mobile TOC.** On narrow viewports wrap the contents block in
   `<details open>` → user-collapsible; on entries with 15 languages the TOC
   alone is a screenful before any content.

6. **Decide the `era_end` convention** (suggestions.md item 8). Still open,
   and the corpus has since doubled; every new Coptic/Arabic-continuity entry
   deepens the eventual migration.

## Performance

1. **Self-host fonts with `unicode-range` subsets** — still the number-one
   lever, unchanged from suggestions.md item 1, and it has grown: the Google
   Fonts request is now 20 families on every page, render-blocking, for
   scripts most pages never use. Fontsource + `unicode-range` means a Latin
   page downloads two families and a cuneiform page lazily adds one more.
   Everything else in this section is a rounding error next to this.

2. **Enable Astro's built-in prefetch.** `prefetch: true` (hover/tap strategy)
   in `astro.config.mjs` is one line; on a fully static site it makes every
   internal navigation feel instant and makes the view-transition morphs land
   without a network beat in the middle.

3. **Defer the search index fetch.** `/search-index.json` is 236 KB raw
   (~35–50 KB over the wire) and is fetched on page load before the reader
   types. Fetch on first `focus`/`input` instead; with `?q=` present, fetch
   immediately as today. Also add `<link rel="preload" as="fetch">` for the
   deep-linked case. (This also re-answers suggestions.md item 11: the growth
   plan is "defer, then split by collection past ~2,000 names.")

4. **Stop downloading the masthead video on phones.** The mobile/touch fallback
   hides `.masthead-motion` with CSS, but a `display: none` `<video>` with
   `autoplay` still fetches in most engines — ~132 KB WebM spent on pixels
   never shown. Gate it in JS (inject the `<source>`s only when the
   hover/pointer media queries pass) or use `preload="none"` + scripted play.

5. **Recompress the title cards.** The `*-title.png` set runs 40–80 KB each and
   `public/og` is 3.2 MB total. Lossless-to-WebP (alpha preserved) typically
   halves these; keep PNG for the OG copies (some scrapers still dislike WebP)
   and switch only the on-page `featured` images. Low priority, pure bytes.

6. **`fetchpriority="high"` on the featured card**, which is the LCP element on
   every entity page, and explicit `width`/`height` alongside the existing
   `aspect-ratio` so the hint costs nothing.

## Visual additions

1. **Endonyms in the homepage language list.** The right column shows
   "Akkadian — Cuneiform"; it could show the language's own name in its own
   script (`native_name`, already in frontmatter and already rendered on the
   language pages) in place of, or beside, the script label. The homepage
   would then *demonstrate* the thesis — every script in the inventory, live
   on arrival — instead of describing it. Costs nothing once fonts are
   self-hosted and subset (do it after Performance 1, not before).

2. **Mini locator map on entity pages.** The TransmissionMap already carries
   coastline geometry and per-language homeland coordinates; a small static
   inline-SVG locator (dot on the coastline, no interaction) under the meta
   line would orient readers on pages that don't qualify for the full map
   (fewer than 2 mapped languages). Reuses `lib/geo` + `lib/coastline`
   wholesale.

3. **True dark-mode title cards, eventually.** The invert-plus-hue-rotate
   filter is a good trick but visibly cooler than the light-mode parchment
   ink. The Remotion setup in `videos/` can render a dark variant per card;
   `<picture>` + `prefers-color-scheme` can't key off the manual toggle, so
   it would be a `data-theme`-driven `src` swap. Defer behind the title-card
   gate (content depth before feature breadth) — listed so it's a decision,
   not a surprise.

4. **Comparison view** (roadmap mid-term) remains the largest visual feature
   worth building: 2–4 entities side-by-side across shared languages. Natural
   URL shape `/compare?a=egypt&b=greece`; the data model already supports it.
   Bigger than everything above; sequence after the corpus-facing items.

5. **Restraint note.** The design's quietness is load-bearing. No textures, no
   drop caps, no decorative borders; the scripts themselves are the ornament.

## Audio additions

1. **Pronunciation audio, honestly labeled — the only audio that belongs.**
   Schema: optional `audio` (path) + `audio_note` (who recorded it, on what
   reconstruction) per name entry; UI: a small play button beside the IPA
   line, `preload="none"`, no custom player chrome. Sourcing is the hard part
   and the roadmap's instinct (commissioned from scholars/graduate students,
   long-term) is correct. An interim path that preserves rigor: self-recorded
   readings of the *reconstructed IPA* for well-understood systems (Latin,
   Greek, Old Persian first), each labeled with the same
   attested/reconstructed/disputed vocabulary the site already uses. Start
   with a pilot of ~10 entries on one civilization page to find out whether
   it earns its place.

2. **No synthetic speech.** TTS has no training data for Akkadian or Egyptian;
   generated audio would be a fabricated primary claim on a site whose whole
   value is sourcing. If a pronunciation can't be recorded from a published
   reconstruction, the entry keeps IPA only.

3. **No UI sounds.** Interface chimes are wrong for the identity; the site
   should stay silent except where a human voice is itself the content.

## Suggested sequencing

| Order | Item | Why first |
|---|---|---|
| 1 | Self-hosted subset fonts (Perf 1) | Biggest win; unblocks Visual 1 |
| 2 | Prefetch + deferred search index (Perf 2–3) | Two tiny diffs, felt everywhere |
| 3 | Search shortcut, URL sync, grouped results (UX 1, 7, 8) | One page, one session |
| 4 | Random entry + name of the day (QoL 1–2) | Small, high-charm, roadmap items |
| 5 | Language-page parity (UX 3) | Fixes the site's one structural inconsistency |
| 6 | Homepage filters (UX 2) | Roadmap item, pre-empts Phase 3 index growth |
| 7 | Audio pilot (Audio 1) | Needs recording workflow; start small |
