import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadGaramond } from "@remotion/google-fonts/EBGaramond";

// EB Garamond carries the whole card: the Greek script endonym, the
// transliteration, and the English label. The "greek-ext" subset is required
// for the polytonic capital Ἑ (U+1F09, rough breathing) or it renders as a
// missing-glyph box; "greek" alone covers only monotonic glyphs.
const { fontFamily: garamond } = loadGaramond("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek", "greek-ext"],
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

// The attested self-designation Ἑλλάς, "Hellas," from src/content/names/
// greece-ancient-greek-hellas.md. The only endonym among the names for Greece.
const SCRIPT = "Ἑλλάς";

// A title card is a single still frame, so nothing here animates; the layout is
// sized off the canvas width to stay resolution-independent.
export const GreeceTitleCard: React.FC = () => {
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
            fontSize: 200,
            lineHeight: 1,
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
          Hellás
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
          Greece
        </div>
      </div>
    </AbsoluteFill>
  );
};
