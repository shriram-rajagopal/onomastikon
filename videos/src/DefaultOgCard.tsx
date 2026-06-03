import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";

// EB Garamond, same as the homepage wordmark. The "greek" subset is required so
// the Greek capital sigma (Σ) in ONOMAΣTIKON renders instead of a missing glyph.
const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek"],
});

// Onomastikon design tokens (mirrored from src/layouts/BaseLayout.astro :root).
// Opaque parchment: this is the Open Graph fallback image for pages without
// their own title card, so it must render with a solid background.
const PARCHMENT = "#f5efe4";
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

const WORD = "ONOMAΣTIKON";

// Static still (no animation): the settled wordmark plus the tagline, used as
// the site-wide social-share fallback. Mirrors the homepage masthead at rest.
export const DefaultOgCard: React.FC = () => {
  const letters = WORD.split("");
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
            fontFamily: garamond,
            fontWeight: 600,
            fontSize: 184,
            lineHeight: 1,
            letterSpacing: 11,
            paddingLeft: 11,
            whiteSpace: "nowrap",
            color: INK,
          }}
        >
          {letters.map((char, i) => (
            <span key={i} style={{ color: char === "Σ" ? ACCENT : INK }}>
              {char}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            height: 3,
            width: "100%",
            backgroundColor: RULE,
          }}
        />

        <div
          style={{
            fontFamily: garamond,
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 52,
            lineHeight: 1.2,
            marginTop: 40,
            color: INK_SOFT,
          }}
        >
          A digital atlas of ancient names
        </div>
      </div>
    </AbsoluteFill>
  );
};
