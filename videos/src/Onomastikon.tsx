import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/EBGaramond";

// Load the same typeface the site uses. The "greek" subset is required so the
// Greek capital sigma (Σ) renders instead of a missing-glyph box.
const { fontFamily } = loadFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "greek"],
});

// Onomastikon design tokens (mirrored from src/layouts/BaseLayout.astro :root).
// The background defaults to transparent so the page's parchment shows through
// in the alpha-capable WebM / VP9 render; only the wordmark and rule are drawn.
// The MP4 fallback (H.264 has no alpha, so transparent areas flatten to black)
// must be rendered with `background` set to parchment, e.g.
//   npx remotion render OnomastikonLogo ../public/onomastikon-logo.mp4 --props='{"background":"#f5efe4"}'
const INK = "#1a1a1a";
const ACCENT = "#6b3a2a";
const RULE = "#d8cfbf";

const WORD = "ONOMAΣTIKON";

export const Onomastikon: React.FC<{ background?: string }> = ({ background }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const letters = WORD.split("");
  const STAGGER = 3; // frames between successive letters

  // Size the wordmark relative to the canvas width so it scales with the comp.
  const fontSize = Math.round(width * 0.1);
  const tracking = fontSize * 0.06;

  // The hairline rule draws out only after the last letter has begun settling.
  const ruleStart = (letters.length - 1) * STAGGER + 12;
  const ruleProgress = spring({
    frame: frame - ruleStart,
    fps,
    config: { damping: 200, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: background ?? "transparent",
      }}
    >
      {/* inline-block so the column shrinks to the wordmark's exact width,
          which lets the rule below match the text width via 100% + scaleX. */}
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize,
            lineHeight: 1,
            letterSpacing: tracking,
            // letter-spacing adds a trailing gap after the last glyph; offset it
            // so the visual block stays centered.
            paddingLeft: tracking,
            whiteSpace: "nowrap",
            color: INK,
          }}
        >
          {letters.map((char, i) => {
            const enter = spring({
              frame: frame - i * STAGGER,
              fps,
              config: { damping: 200, mass: 0.6 },
            });
            const opacity = interpolate(enter, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const translateY = interpolate(enter, [0, 1], [fontSize * 0.16, 0]);
            const blur = interpolate(enter, [0, 1], [10, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isSigma = char === "Σ";
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  filter: `blur(${blur}px)`,
                  color: isSigma ? ACCENT : INK,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: fontSize * 0.26,
            height: Math.max(2, Math.round(fontSize * 0.012)),
            width: "100%",
            backgroundColor: RULE,
            transform: `scaleX(${ruleProgress})`,
            transformOrigin: "center",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
