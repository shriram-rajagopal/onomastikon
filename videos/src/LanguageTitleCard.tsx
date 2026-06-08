import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadCoptic } from "@remotion/google-fonts/NotoSansCoptic";
import { loadFont as loadHebrew } from "@remotion/google-fonts/NotoSansHebrew";
import { loadFont as loadArabic } from "@remotion/google-fonts/NotoSansArabic";
import { loadFont as loadSyriac } from "@remotion/google-fonts/NotoSansSyriac";
import { loadFont as loadDevanagari } from "@remotion/google-fonts/NotoSansDevanagari";
import { loadFont as loadEthiopic } from "@remotion/google-fonts/NotoSansEthiopic";
import { loadFont as loadSC } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadPhoenician } from "@remotion/google-fonts/NotoSansPhoenician";
import { loadFont as loadCuneiform } from "@remotion/google-fonts/NotoSansCuneiform";
import { loadFont as loadOldPersian } from "@remotion/google-fonts/NotoSansOldPersian";
import { loadFont as loadPahlavi } from "@remotion/google-fonts/NotoSansInscriptionalPahlavi";
import { loadFont as loadHieroglyphs } from "@remotion/google-fonts/NotoSansEgyptianHieroglyphs";
import { loadFont as loadUgaritic } from "@remotion/google-fonts/NotoSansUgaritic";
import { loadFont as loadParthian } from "@remotion/google-fonts/NotoSansInscriptionalParthian";

// Language entry title card. A thin sibling of the civ TitleCard: same parchment,
// same vertical rhythm and tokens, but it leads with the LANGUAGE's own name
// (native_name) in its own script as the hero, anchors the English name at the
// bottom, and replaces the civ card's single "which language" caption with an
// alphabet · family · era metadata strip. Endonym-first, exactly as the civ cards.
//
// Only languages whose native_name is a real original-script endonym get a card.
// Held back (no honest hero): Parthian, Demotic, Ugaritic (no native_name);
// Akkadian, Egyptian (native_name stored romanized, not in script).

const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek", "greek-ext"],
});
const { fontFamily: coptic } = loadCoptic("normal", { weights: ["400"], subsets: ["coptic"] });
const { fontFamily: hebrew } = loadHebrew("normal", { weights: ["400"], subsets: ["hebrew"] });
const { fontFamily: arabic } = loadArabic("normal", { weights: ["400"], subsets: ["arabic"] });
const { fontFamily: syriac } = loadSyriac("normal", { weights: ["400"], subsets: ["syriac"] });
const { fontFamily: devanagari } = loadDevanagari("normal", { weights: ["400"], subsets: ["devanagari"] });
const { fontFamily: ethiopic } = loadEthiopic("normal", { weights: ["400"], subsets: ["ethiopic"] });
const { fontFamily: sc } = loadSC("normal", { weights: ["400"], subsets: ["chinese-simplified"] });
const { fontFamily: phoenician } = loadPhoenician("normal", { weights: ["400"], subsets: ["phoenician"] });
const { fontFamily: cuneiform } = loadCuneiform("normal", { weights: ["400"], subsets: ["cuneiform"] });
const { fontFamily: oldPersian } = loadOldPersian("normal", { weights: ["400"], subsets: ["old-persian"] });
const { fontFamily: pahlavi } = loadPahlavi("normal", { weights: ["400"], subsets: ["inscriptional-pahlavi"] });
const { fontFamily: hieroglyphs } = loadHieroglyphs("normal", { weights: ["400"], subsets: ["egyptian-hieroglyphs"] });
const { fontFamily: ugaritic } = loadUgaritic("normal", { weights: ["400"], subsets: ["ugaritic"] });
const { fontFamily: parthian } = loadParthian("normal", { weights: ["400"], subsets: ["inscriptional-parthian"] });

const PARCHMENT = "#f5efe4";
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

// Per-script hero styling. Sizes are tuned smaller than the civ card because
// language endonyms are often multi-word (al-ʿArabiyya al-Fuṣḥā, ti-met-rem-en-kēmi)
// and must fit the 1920-wide card on one line. rtl marks scripts whose hero reads
// right-to-left, so surrounding layout stays correct.
const SCRIPTS = {
  greek: { fontFamily: garamond, fontSize: 168, letterSpacing: 0, fontWeight: 600, rtl: false },
  latin: { fontFamily: garamond, fontSize: 140, letterSpacing: 0, fontWeight: 600, rtl: false },
  coptic: { fontFamily: coptic, fontSize: 132, letterSpacing: 2, fontWeight: 400, rtl: false },
  hebrew: { fontFamily: hebrew, fontSize: 150, letterSpacing: 0, fontWeight: 400, rtl: true },
  arabic: { fontFamily: arabic, fontSize: 140, letterSpacing: 0, fontWeight: 400, rtl: true },
  syriac: { fontFamily: syriac, fontSize: 140, letterSpacing: 0, fontWeight: 400, rtl: true },
  devanagari: { fontFamily: devanagari, fontSize: 150, letterSpacing: 0, fontWeight: 400, rtl: false },
  ethiopic: { fontFamily: ethiopic, fontSize: 140, letterSpacing: 0, fontWeight: 400, rtl: false },
  chinese: { fontFamily: sc, fontSize: 180, letterSpacing: 10, fontWeight: 400, rtl: false },
  phoenician: { fontFamily: phoenician, fontSize: 120, letterSpacing: 8, fontWeight: 400, rtl: true },
  cuneiform: { fontFamily: cuneiform, fontSize: 150, letterSpacing: 14, fontWeight: 400, rtl: false },
  "egyptian-hieroglyphs": { fontFamily: hieroglyphs, fontSize: 168, letterSpacing: 10, fontWeight: 400, rtl: false },
  ugaritic: { fontFamily: ugaritic, fontSize: 150, letterSpacing: 12, fontWeight: 400, rtl: false },
  "inscriptional-parthian": { fontFamily: parthian, fontSize: 140, letterSpacing: 10, fontWeight: 400, rtl: true },
  "old-persian": { fontFamily: oldPersian, fontSize: 150, letterSpacing: 12, fontWeight: 400, rtl: false },
  "inscriptional-pahlavi": { fontFamily: pahlavi, fontSize: 140, letterSpacing: 8, fontWeight: 400, rtl: true },
} as const;

export const languageCardSchema = z.object({
  script: z.enum([
    "greek",
    "latin",
    "coptic",
    "hebrew",
    "arabic",
    "syriac",
    "devanagari",
    "ethiopic",
    "chinese",
    "phoenician",
    "cuneiform",
    "old-persian",
    "inscriptional-pahlavi",
    "egyptian-hieroglyphs",
    "ugaritic",
    "inscriptional-parthian",
  ]),
  glyphs: z.string(), // the language's own name in its own script (native_name)
  romanization: z.string().optional(), // italic accent line; omit for Latin-script endonyms (Lingua Latina)
  name: z.string(), // the English language name, the uppercase anchor (SYRIAC)
  meta: z.string(), // alphabet · family · era, e.g. "Syriac alphabet · Northwest Semitic · c. 100–700 CE"
});

export const LanguageTitleCard: React.FC<z.infer<typeof languageCardSchema>> = ({
  script,
  glyphs,
  romanization,
  name,
  meta,
}) => {
  const line = SCRIPTS[script];
  return (
    <AbsoluteFill style={{ backgroundColor: PARCHMENT, justifyContent: "center", alignItems: "center" }}>
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
            direction: line.rtl ? "rtl" : "ltr",
            color: INK,
          }}
        >
          {glyphs}
        </div>

        {romanization ? (
          <div
            style={{
              fontFamily: garamond,
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: 96,
              lineHeight: 1,
              marginTop: 36,
              color: ACCENT,
            }}
          >
            {romanization}
          </div>
        ) : null}

        <div style={{ marginTop: romanization ? 34 : 40, height: 3, width: "100%", backgroundColor: RULE }} />

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
          {name}
        </div>

        {/* New element vs. the civ card: the language's identity facts. Sentence
            case (not uppercase) so the era reads naturally as "c. 100–700 CE". */}
        <div
          style={{
            fontFamily: garamond,
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1,
            marginTop: 20,
            letterSpacing: 2,
            color: INK_SOFT,
          }}
        >
          {meta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
