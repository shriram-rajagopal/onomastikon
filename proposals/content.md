# Content proposals — review session 2026-06-10

Tier 2 findings: everything here touches `original_text`, `transliteration`, `ipa`,
`confidence`, `sources`, or the substantive claims of an entry, so nothing was
changed. Each item is a proposal for you to accept, adapt, or reject. Findings
come from a full-corpus review pass (all 63 name entries, 6 entity files); the
corpus is in very good shape overall, and nothing below is a blocker.

## Notation and field consistency

1. **Akkadian IPA notation is split between conventions.**
   `egypt-akkadian-misru` (/misˤ.ru/), `persia-akkadian-parsa` (/ˈpaːr.sa/), and
   `sumer-akkadian-shumeru` (/ʃuˈme.ru/) use attested-style slashes, while
   `greece-akkadian-yaman` uses the reconstructed asterisk form (*jaːˈmaːn).
   This may be deliberate (form-specific certainty: *Yāmān*'s vocalization is
   less directly evidenced than dictionary-normalized *miṣru*), or drift.
   Decision is yours; if deliberate, it may be worth a sentence in the
   `akkadian.md` language file so the next reviewer doesn't reflag it.

2. **Four entries have no `ipa` field:**
   - `persia-demotic-mty` — its sibling `egypt-demotic-kmy` carries `*kmiː`,
     so the omission looks unintentional. Add only if a sourced reconstruction
     exists; otherwise hold (do not invent one).
   - `persia-classical-chinese-bosi` and `rome-classical-chinese-daqin` —
     Middle Chinese reconstructions (Baxter–Sagart) exist for 波斯 and 大秦 if
     you want them, with the asterisk convention; defensible to leave absent.
   - `sumer-sumerian-kengir` — Sumerian vocalization is genuinely insecure;
     absence is defensible.

3. **Coptic transliteration style varies.** `Kēme`, `Uweinin`, `Hrōmē` are
   capitalized with macrons; `nile-coptic-eioor` is lowercase `eioor` without.
   Since Coptic vowels are directly attested, the macron treatment should
   probably be uniform either way; pick one and note the convention in
   `coptic.md`.

## Citations

4. **`egypt-coptic-keme` cites Crum with a specific page (p. 110).** Crum is
   organized by lemma; the project's own convention prefers `s.v. ⲕⲏⲙⲉ`, which
   is also the more verifiable form. Suggest converting unless p. 110 was
   actually checked.

5. **`nile-ancient-greek-neilos` cites Beekes with `s.v.` but no headword.**
   Add the headword (`s.v. *Neîlos*`) for verifiability.

6. **`persia-classical-chinese-bosi` cites Kotyk 2024 (Brill).** Recent and
   specific; worth a citation-check pass to confirm the title and that it
   supports the claim, per the source-authorities playbook.

## Prose and structure (judgment items)

7. **`egypt-coptic-keme` second paragraph lacks a payoff.** It restates the
   descent facts. Suggested direction: *Kēme* is the last native stage of a
   three-millennium naming tradition, and the first where the vocalization
   surfaces in writing — which is what lets *km.t* be reconstructed at all.

8. **`rome-biblical-hebrew-kittim`** — the prose addresses the dispute well,
   but only after P1 has treated Rome as the primary referent. Suggest leading
   with the referent range (Cyprus → Seleucids → Rome) before settling on Rome.

9. **`nile-geez-gihon`** — the disputed framing reads slightly defensive
   ("the entry is marked disputed because..."). Suggest stating the
   identification question as a scholarly matter first, per the no-apology
   convention.

10. **`persia-demotic-mty` second paragraph buries its observation** (Egypt
    naming its own occupiers, metonymically, as "the Mede"). Suggest leading
    with it.

11. **`egypt-elamite-mudraya` / `egypt-old-persian-mudraya`** — both touch the
    trilingual Achaemenid structure but neither names all three chancellery
    languages or points at its sibling. A sentence each would complete the
    pattern the skill asks for.

12. **`greece-egyptian-hau-nebut`** — era range −2000 → −300 is fine, but the
    referent shifts across it (Minoans → Mycenaeans → Greeks broadly); the
    prose could make explicit that the early attestations do not yet mean
    "Greeks."

## Noted, no action proposed

- Confidence labels are honest throughout; `ahhiyawa`'s `attested` is correct
  (the form is attested; the identification is what was contested, and the
  prose handles it).
- No transliteration/original-script mismatches found; no cross-entry drift in
  repeated forms (Yauna, Pārsa families checked).
- All entity (civilization) files reviewed clean.
