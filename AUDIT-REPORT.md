# Audit implementation report — July 2026 external audit

Six phases, committed in sequence, local commits only (not pushed, per
instructions). Full `astro build` run and passing after every phase.
Companion file: AUDIT-PROPOSALS.md (everything awaiting sign-off).

## Phase 1 — WCAG failures (implemented)

- **1a** Help panel title is no longer a heading (styled `<p>` labelled via
  `aria-labelledby`), so nothing precedes the `<h1>` at any panel state; the
  empty `<h3>` was the entity popover's JS-filled name, now a styled `<p>`.
  The closed panel was already `hidden` (display-none semantics), not
  offscreen-positioned.
- **1b** Help panel is `role="dialog" aria-modal="true"` with
  `aria-labelledby`, a Tab focus trap over panel + opener, focus into the
  panel on open, focus returned to the button on close, Escape to close
  (Escape already existed). The "?" button gained an `aria-label`.
- **1c** Era slider: `aria-label="Attestation year"` plus `aria-valuetext`
  rendered as "2000 BCE"-style eras, set at render and on every input.
- **1d** Search: a visually-hidden `role="status"` / `aria-live="polite"`
  region announces "24 results: 3 entities, 5 languages, 16 names" (with
  correct singulars), "No results.", and clears with the query.
- **1e** See *Discrepancies* — the audited SVG does not exist as described.
- **1f** See *Discrepancies* — already conformant in code.

## Phase 2 — remaining a11y + mobile (implemented)

- **2a** Entity popover: opens on row link focus (matching hover), closes on
  focusout and on Escape; the panel carries `aria-live="polite"`.
- **2b** Cite buttons (page-level and the per-entry "Cite this entry"
  drawers, which share the component): contextual `aria-label`s naming what
  is copied and for which page, plus a shared visually-hidden live region
  announcing "Copied to clipboard." The visible Copied state already
  existed and is unchanged; the per-language-card copy buttons were not
  touched visually (they share the wiring, so they gain the announcement).
- **2c** Theme toggle: glyph wrapped in an `aria-hidden` span, action named
  in `aria-label` ("Switch to light mode"), rebuilt on every toggle.
- **2d** See *Discrepancies* — already conformant in code.
- **2e** Transmission map SVG carries a `<desc>` enumerating every borrowing
  path in text ("Pārsa (Old Persian) to Persís (Ancient Greek); …"),
  generated from the same arcs array that draws them.
- **2f** See *Discrepancies* — already conformant; the help-callout arrow
  was additionally hardened with `aria-hidden` + `focusable="false"`.
- **2g** At ≤480px the era rule keeps only its endpoint year labels
  (`display:none` on intermediates), removing the "550 BCE/0 CE" collision.
  Nav untouched.

## Phase 3 — SEO / structured data (implemented)

- **3a** BreadcrumbList JSON-LD on every entity page: Home → type section
  (`/#city` etc.) → entity.
- **3b** FAQPage JSON-LD on entity pages with ≥2 name entries, generated
  strictly from frontmatter: "What is the oldest recorded name of X?"
  (answer phrased by the entry's confidence: *is attested as / is
  reconstructed as / is recorded (with a disputed reading) as*) and "How
  many historical names of X are recorded?" (count + language list). Pages
  without the data get no FAQ block. **Deviation:** the audit's example
  pair ("What did the [demonym] call themselves?") needs an endonym flag
  the data model does not have; rather than guess endonyms, the questions
  were chosen so every answer is mechanically truthful. If an
  `endonym: true` field is ever added, that pair becomes generatable.
- **3c** Entity titles lead with the earliest-attested form where the line
  stays ≤52 chars before the site suffix ("Sumer — Kengir and the Names of
  Sumer — Onomastikon"), falling back to the plain name otherwise.
  "Primary endonym" is not modeled; the earliest attested form is the
  defensible mechanical stand-in.
- **3d** `hreflang="en"` and `x-default` alternates on every page.

## Phase 4 — data model (4a implemented; 4b/4c proposal-only)

- **4a** Optional `meaning_confidence` field (house snake_case for the
  audit's `meaningConfidence`) on the names schema, documented as the
  meaning axis split out of the conflated label. Set to `disputed` on the
  eight attested entries whose own prose concedes the gloss is debated:
  Kengir (the named case), Bābilu ×2 (gate of the god), Haltamti (the lord
  country), Ḥau-nebut (the island-peoples), Upāiri.saēna (higher than the
  eagle), Ḫanigalbat, Zion. Entries whose gloss is a bare toponym
  identification with an inline hedge assert no meaning and were left
  unmarked. Rendered as a lowercase "meaning disputed" badge beside the
  gloss (existing confidence-badge dress); carried in the JSON export as
  `meaning_confidence` (null when absent). No existing `confidence` value
  changed.
- **4b / 4c** Drafted in AUDIT-PROPOSALS.md with migration mechanics and a
  measured blast radius (21 internal `/civilizations/` references across 8
  files, JSON/RSS/citation implications). No implementation.

## Phase 5 — branding, export, roadmap

- **5a** Mechanical swaps implemented: homepage `<title>` suffix, footer
  line, default meta description, homepage `<h1>` + tagline + WebSite
  JSON-LD description, feed description, README tagline/description — all
  now "ancient and medieval". Full inventory with dispositions in
  AUDIT-PROPOSALS.md. Proposal-only: the site's formal citation name
  ("…Atlas of Ancient Names") and the About page prose.
- **5b** Already largely conformant (see *Discrepancies*): the export
  carried `confidence`, per-entity `type` (via the entity spread), and
  explicit `"ipa": null` before the audit. Added: `meaning_confidence`.
- **5c** Noted in AUDIT-PROPOSALS.md for owner authorship.
- **5d** Coverage gaps appended to roadmap.md under an audit-sourced
  heading, African–Arabian corridor flagged highest priority, nothing
  existing reordered. Aksum and Punt were already queued in Phase 3 of the
  roadmap and are cross-referenced rather than duplicated as new plans.
  Luwian is listed with its standing hold (Anatolian-hieroglyph Unicode
  encodes sign numbers, not verifiable glyphs — hold of 2026-06-30).

## Phase 6 — verification

- Full build passes: 189 pages.
- axe-core 4.x run via jsdom against the built homepage, search page, and
  the Sumer entity page, with the ruleset covering the Phase 1 failure
  classes (heading-order, empty-heading, button-name, label, svg-img-alt,
  aria-* validity, aria-hidden-focus): **0 violations on all three pages.**
  (Full-browser runners — pa11y/puppeteer — were not used to avoid a
  headless-browser download; jsdom covers the structural rules at issue.
  Color-contrast rules, which need real rendering, were not in the audited
  failure list.)

## TODOs inserted

None — no implemented fix required scholarly content that could not be
verified from the repo. (Items that would have, e.g. endonym-based FAQ
phrasing, were redesigned to be mechanically truthful instead; see 3b.)

## Skipped / already-conformant findings (code vs. live-site audit)

| Finding | Disposition |
|---|---|
| 1e "Name of the Day cuneiform SVG (class ca-svg)" | No such element: `ca-svg` is the decorative "First time here?" callout arrow inside an `aria-hidden` container (hardened anyway); the Name-of-the-Day card is text-based and already carries `aria-label="Name of the day"`. Audit presumed stale or misattributed. |
| 1f skip link "stays at left:-9999px" | Already conformant: `.skip-link:focus { left: 1rem; }` was present before the audit. No change. |
| 2d era filter buttons lack aria-pressed | Region chips already rendered `aria-pressed` and the script already toggled it. The era-age buttons are disclosure controls (they open era notes) and correctly use `aria-expanded` instead. No change. |
| 2f decorative 14×14 SVGs | The only inline 14×14 (map export icon) already carried `aria-hidden="true"`; a sweep found no unlabelled decorative SVG anywhere in src. |
| 2c "◐/☀ glyphs" | Code uses ◐/◑ (stale audit detail); fix applied to the actual glyphs. |
| 5b ipa nulls / per-entity type / confidence in export | All present before the audit; only `meaning_confidence` was genuinely new. |
