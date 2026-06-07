import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadHieroglyphs } from "@remotion/google-fonts/NotoSansEgyptianHieroglyphs";
import { loadFont as loadOldPersian } from "@remotion/google-fonts/NotoSansOldPersian";
import { loadFont as loadPahlavi } from "@remotion/google-fonts/NotoSansInscriptionalPahlavi";

// PROTOTYPE — a two-column title card for entities with multiple endonyms across
// time periods (e.g. Persia: Old Persian Pārsa and Middle Persian Ērān). Each
// column carries its own script line, transliteration, and a small period caption;
// a single English label sits below a shared rule. The single-endonym TitleCard is
// left untouched — this is purely additive, for evaluating the idea on Persia.

const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek", "greek-ext"],
});
const { fontFamily: hieroglyphs } = loadHieroglyphs("normal", { weights: ["400"], subsets: ["egyptian-hieroglyphs"] });
const { fontFamily: oldPersian } = loadOldPersian("normal", { weights: ["400"], subsets: ["old-persian"] });
const { fontFamily: pahlavi } = loadPahlavi("normal", { weights: ["400"], subsets: ["inscriptional-pahlavi"] });

const PARCHMENT = "#f5efe4";
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

// A touch smaller than the single-endonym card so two columns sit comfortably on
// the 1920×720 banner.
const SCRIPTS = {
  "egyptian-hieroglyphs": { fontFamily: hieroglyphs, fontSize: 168, letterSpacing: 10 },
  "old-persian": { fontFamily: oldPersian, fontSize: 140, letterSpacing: 10 },
  "inscriptional-pahlavi": { fontFamily: pahlavi, fontSize: 140, letterSpacing: 8 },
  greek: { fontFamily: garamond, fontSize: 150, letterSpacing: 0 },
  latin: { fontFamily: garamond, fontSize: 132, letterSpacing: 0 },
} as const;

type Endonym = {
  script: keyof typeof SCRIPTS;
  glyphs: string;
  transliteration: string;
  caption?: string;
};

export const DualTitleCard: React.FC<{ endonyms: Endonym[]; label: string }> = ({ endonyms, label }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: PARCHMENT, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          {endonyms.map((e, i) => {
            const line = SCRIPTS[e.script];
            return (
              <div key={i} style={{ width: 540, textAlign: "center" }}>
                {/* fixed-height glyph row so the transliteration lines align across columns
                    even when the two scripts differ in height */}
                <div style={{ height: 178, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <div
                    style={{
                      fontFamily: line.fontFamily,
                      fontWeight: 400,
                      fontSize: line.fontSize,
                      lineHeight: 1,
                      letterSpacing: line.letterSpacing,
                      paddingLeft: line.letterSpacing,
                      whiteSpace: "nowrap",
                      color: INK,
                    }}
                  >
                    {e.glyphs}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: garamond,
                    fontWeight: 600,
                    fontStyle: "italic",
                    fontSize: 66,
                    lineHeight: 1,
                    marginTop: 26,
                    color: ACCENT,
                  }}
                >
                  {e.transliteration}
                </div>
                {e.caption ? (
                  <div
                    style={{
                      fontFamily: garamond,
                      fontWeight: 400,
                      fontSize: 24,
                      lineHeight: 1,
                      marginTop: 18,
                      letterSpacing: 7,
                      paddingLeft: 7,
                      textTransform: "uppercase",
                      color: INK_SOFT,
                    }}
                  >
                    {e.caption}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 46, height: 3, width: "100%", backgroundColor: RULE }} />

        <div
          style={{
            fontFamily: garamond,
            fontWeight: 400,
            fontSize: 44,
            lineHeight: 1,
            marginTop: 30,
            letterSpacing: 16,
            paddingLeft: 16,
            textTransform: "uppercase",
            color: INK_SOFT,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
