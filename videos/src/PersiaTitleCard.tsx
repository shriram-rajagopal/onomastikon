import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadOldPersian } from "@remotion/google-fonts/NotoSansOldPersian";

// EB Garamond for the transliteration and English label, matching the site body
// typeface and the homepage wordmark.
const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

// Noto Sans Old Persian for the endonym 𐎱𐎠𐎼𐎿 (Pārsa), the cuneiform alphabet
// Darius I commissioned. The "old-persian" subset (U+103A0–) is required or the
// signs render as missing-glyph boxes. Same family as the site's .original rule.
const { fontFamily: oldPersian } = loadOldPersian("normal", {
  weights: ["400"],
  subsets: ["old-persian"],
});

// Onomastikon design tokens (mirrored from src/layouts/BaseLayout.astro :root).
// Background is left transparent so the page parchment shows through; render to
// PNG with alpha so the card drops cleanly onto the entry page.
const INK = "#1a1a1a";
const INK_SOFT = "#4a4a4a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

// The attested Old Persian writing of Pārsa, the Achaemenid royal self-
// designation, from src/content/names/persia-old-persian-parsa.md.
const SCRIPT = "𐎱𐎠𐎼𐎿";

// A title card is a single still frame, so nothing here animates; the layout is
// sized off the canvas width to stay resolution-independent.
export const PersiaTitleCard: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <div
          style={{
            fontFamily: oldPersian,
            fontSize: 200,
            lineHeight: 1,
            letterSpacing: 12,
            paddingLeft: 12,
            whiteSpace: "nowrap",
            color: INK,
          }}
        >
          {SCRIPT}
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
          Pārsa
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
          Persia
        </div>
      </div>
    </AbsoluteFill>
  );
};
