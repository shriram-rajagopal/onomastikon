import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadHieroglyphs } from "@remotion/google-fonts/NotoSansEgyptianHieroglyphs";
import { loadFont as loadOldPersian } from "@remotion/google-fonts/NotoSansOldPersian";
import { loadFont as loadCuneiform } from "@remotion/google-fonts/NotoSansCuneiform";
import { loadFont as loadPhoenician } from "@remotion/google-fonts/NotoSansPhoenician";
import { loadFont as loadHebrew } from "@remotion/google-fonts/NotoSerifHebrew";
import { loadFont as loadAvestan } from "@remotion/google-fonts/NotoSansAvestan";
import { loadFont as loadOldItalic } from "@remotion/google-fonts/NotoSansOldItalic";
import { loadFont as loadParthian } from "@remotion/google-fonts/NotoSansInscriptionalParthian";
import { loadFont as loadDevanagari } from "@remotion/google-fonts/NotoSerifDevanagari";
import { loadFont as loadSC } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadLycian } from "@remotion/google-fonts/NotoSansLycian";
import { loadFont as loadArmenian } from "@remotion/google-fonts/NotoSerifArmenian";

// Data-driven version of the hand-built EgyptTitleCard / GreeceTitleCard /
// PersiaTitleCard. Those three share an identical layout and differ only in four
// values: the original-script glyphs, the font that renders them, the italic
// transliteration, and the uppercase English label. This composition takes those
// four as props so per-entity cards can be rendered without a new component each.
// The three originals are left in place; this is additive.

// EB Garamond carries the transliteration and English label on every card, and the
// script line itself for Greek- and Latin-script endonyms. greek/greek-ext subsets
// are needed for polytonic glyphs (e.g. the rough-breathing Ἑ).
const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek", "greek-ext"],
});
const { fontFamily: hieroglyphs } = loadHieroglyphs("normal", {
  weights: ["400"],
  subsets: ["egyptian-hieroglyphs"],
});
const { fontFamily: oldPersian } = loadOldPersian("normal", {
  weights: ["400"],
  subsets: ["old-persian"],
});
const { fontFamily: cuneiform } = loadCuneiform("normal", {
  weights: ["400"],
  subsets: ["cuneiform"],
});
const { fontFamily: phoenician } = loadPhoenician("normal", {
  weights: ["400"],
  subsets: ["phoenician"],
});
// Hebrew rides Noto Serif Hebrew to match the site's on-page Hebrew face.
const { fontFamily: hebrew } = loadHebrew("normal", {
  weights: ["400", "600"],
  subsets: ["hebrew"],
});
// Avestan: a cursive joining RTL script. Its codepoints are strong bidi-R, so the
// glyphs order right-to-left here without an explicit direction (as Hebrew/Phoenician do).
const { fontFamily: avestan } = loadAvestan("normal", {
  weights: ["400"],
  subsets: ["avestan"],
});
// Old Italic carries Etruscan (Raśna). Its codepoints are bidi-L, so the glyphs
// render left-to-right here, matching how the site presents Etruscan (logical order).
const { fontFamily: oldItalic } = loadOldItalic("normal", {
  weights: ["400"],
  subsets: ["old-italic"],
});
// Inscriptional Parthian (Parθaw) is bidi-R, so it orders right-to-left without an
// explicit direction, as Avestan/Hebrew/Phoenician do.
const { fontFamily: parthian } = loadParthian("normal", {
  weights: ["400"],
  subsets: ["inscriptional-parthian"],
});
// Devanagari (Bhārata) rides Noto Serif Devanagari to match the site's on-page face.
// One connected word under the shirorekha, so it takes no letter-spacing.
const { fontFamily: devanagari } = loadDevanagari("normal", {
  weights: ["400"],
  subsets: ["devanagari"],
});
// Chinese (Xiōngnú, Yuèzhī) rides Noto Sans SC; the simplified subset renders the
// traditional forms used here fine. One connected block, light letter-spacing.
const { fontFamily: sc } = loadSC("normal", { weights: ["400"], subsets: ["chinese-simplified"] });
// Lycian (Trm̃mili) is an alphabet, bidi-L, rendered left-to-right like Old Italic.
const { fontFamily: lycian } = loadLycian("normal", { weights: ["400"], subsets: ["lycian"] });
// Armenian (Hayerēn, Haykʿ) rides Noto Serif Armenian, a fully phonemic LTR alphabet.
const { fontFamily: armenian } = loadArmenian("normal", { weights: ["400", "600"], subsets: ["armenian"] });

// Onomastikon design tokens (mirrored from src/layouts/BaseLayout.astro :root).
// The card is filled with parchment rather than left transparent so the same PNG
// can also serve as the page's Open Graph social-share image.
const PARCHMENT = "#f5efe4";
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

// Per-script line styling, carried over from the three originals: hieroglyphs and
// Old Persian cuneiform get extra letter-spacing and render at 200-248px; Greek and
// Latin ride EB Garamond at 600 weight. To add a script: install its
// @remotion/google-fonts package, load it above, and add a row here.
const SCRIPTS = {
  "egyptian-hieroglyphs": { fontFamily: hieroglyphs, fontSize: 248, letterSpacing: 12, fontWeight: 400 },
  "old-persian": { fontFamily: oldPersian, fontSize: 200, letterSpacing: 12, fontWeight: 400 },
  cuneiform: { fontFamily: cuneiform, fontSize: 180, letterSpacing: 14, fontWeight: 400 },
  phoenician: { fontFamily: phoenician, fontSize: 188, letterSpacing: 16, fontWeight: 400 },
  hebrew: { fontFamily: hebrew, fontSize: 208, letterSpacing: 0, fontWeight: 400 },
  avestan: { fontFamily: avestan, fontSize: 200, letterSpacing: 0, fontWeight: 400 },
  "old-italic": { fontFamily: oldItalic, fontSize: 200, letterSpacing: 12, fontWeight: 400 },
  "inscriptional-parthian": { fontFamily: parthian, fontSize: 200, letterSpacing: 12, fontWeight: 400 },
  devanagari: { fontFamily: devanagari, fontSize: 208, letterSpacing: 0, fontWeight: 400 },
  chinese: { fontFamily: sc, fontSize: 168, letterSpacing: 8, fontWeight: 400 },
  lycian: { fontFamily: lycian, fontSize: 200, letterSpacing: 12, fontWeight: 400 },
  armenian: { fontFamily: armenian, fontSize: 200, letterSpacing: 0, fontWeight: 400 },
  greek: { fontFamily: garamond, fontSize: 200, letterSpacing: 0, fontWeight: 600 },
  latin: { fontFamily: garamond, fontSize: 168, letterSpacing: 0, fontWeight: 600 },
} as const;

export const titleCardSchema = z.object({
  script: z.enum(["egyptian-hieroglyphs", "old-persian", "cuneiform", "phoenician", "hebrew", "avestan", "old-italic", "inscriptional-parthian", "devanagari", "chinese", "lycian", "armenian", "greek", "latin"]),
  glyphs: z.string(), // the endonym in its original script (original_text)
  transliteration: z.string().optional(), // italic accent line (Kemet, Hellás, Pārsa); omit for Latin-script endonyms whose original IS the romanization (e.g. Roma)
  language: z.string(), // the endonym's language, shown below the transliteration (Middle Egyptian, Ancient Greek, Latin, ...)
  label: z.string(), // the uppercase English entity name
});

export const TitleCard: React.FC<z.infer<typeof titleCardSchema>> = ({
  script,
  glyphs,
  transliteration,
  language,
  label,
}) => {
  const line = SCRIPTS[script];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: PARCHMENT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <div
          style={{
            fontFamily: line.fontFamily,
            fontWeight: line.fontWeight,
            fontSize: line.fontSize,
            lineHeight: 1,
            letterSpacing: line.letterSpacing,
            paddingLeft: line.letterSpacing,
            whiteSpace: "nowrap",
            color: INK,
          }}
        >
          {glyphs}
        </div>

        {transliteration ? (
          <div
            style={{
              fontFamily: garamond,
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: 104,
              lineHeight: 1,
              marginTop: 36,
              color: ACCENT,
            }}
          >
            {transliteration}
          </div>
        ) : null}

        {/* The endonym's language is always expressed, below the transliteration
            (or below the glyphs when there is no transliteration, as for Latin). */}
        <div
          style={{
            fontFamily: garamond,
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1,
            marginTop: transliteration ? 22 : 34,
            letterSpacing: 8,
            paddingLeft: 8,
            textTransform: "uppercase",
            color: INK_SOFT,
          }}
        >
          {language}
        </div>

        <div style={{ marginTop: 30, height: 3, width: "100%", backgroundColor: RULE }} />

        <div
          style={{
            fontFamily: garamond,
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1,
            marginTop: 30,
            letterSpacing: 16,
            paddingLeft: 16,
            textTransform: "uppercase",
            color: INK,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
