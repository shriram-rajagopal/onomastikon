import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadHieroglyphs } from "@remotion/google-fonts/NotoSansEgyptianHieroglyphs";

// EB Garamond for the transliteration and English label, matching the site body
// typeface and the homepage wordmark.
const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

// Noto Sans Egyptian Hieroglyphs for the endonym 𓆎𓅓𓏏 (km.t). The
// "egyptian-hieroglyphs" subset (U+13000–) is required or the glyphs render as
// missing-glyph boxes. This is the same family the site's .original rule uses.
const { fontFamily: hieroglyphs } = loadHieroglyphs("normal", {
  weights: ["400"],
  subsets: ["egyptian-hieroglyphs"],
});

// Onomastikon design tokens (mirrored from src/layouts/BaseLayout.astro :root).
// The card is filled with parchment rather than left transparent: on the entry
// page the result is identical (the page itself is parchment), but an opaque
// background is required for this PNG to also serve as the page's Open Graph
// social-share image, where transparency renders unpredictably.
const PARCHMENT = "#f5efe4";
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

// The attested Middle Egyptian writing of km.t, "the Black Land": the
// crocodile-skin sign carrying km, the owl for m, the loaf for the feminine .t.
// Copied verbatim from src/content/names/egypt-egyptian-kemet.md.
const GLYPHS = "𓆎𓅓𓏏";

// A title card is a single still frame, so nothing here animates; the layout is
// sized off the canvas width to stay resolution-independent.
export const EgyptTitleCard: React.FC = () => {
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
            fontFamily: hieroglyphs,
            fontSize: 248,
            lineHeight: 1,
            letterSpacing: 12,
            paddingLeft: 12,
            whiteSpace: "nowrap",
            color: INK,
          }}
        >
          {GLYPHS}
        </div>

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
          Kemet
        </div>

        <div
          style={{
            marginTop: 30,
            height: 3,
            width: "100%",
            backgroundColor: RULE,
          }}
        />

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
          Egypt
        </div>
      </div>
    </AbsoluteFill>
  );
};
