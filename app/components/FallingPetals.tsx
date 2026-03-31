"use client";

// Flower types: emoji + colors
const FLOWERS = [
  { emoji: "🌸", colors: ["#f9a8d4", "#f472b6"] },
  { emoji: "🌺", colors: ["#fb7185", "#e11d48"] },
  { emoji: "🌷", colors: ["#fda4af", "#f43f5e"] },
  { emoji: "🌻", colors: ["#fbbf24", "#f59e0b"] },
  { emoji: "🌼", colors: ["#fde68a", "#fbbf24"] },
  { emoji: "💮", colors: ["#e9d5ff", "#c084fc"] },
  { emoji: "🏵️", colors: ["#fdba74", "#f97316"] },
  { emoji: "🪷", colors: ["#fecdd3", "#fda4af"] },
];

type ItemType = "petal" | "flower" | "sparkle";

interface FallingItem {
  left: number;
  delay: number;
  dur: number;
  size: number;
  drift: number;
  rot: number;
  type: ItemType;
  flowerIdx: number;
}

const ITEMS: FallingItem[] = [
  // Petals
  { left: 5, delay: 0, dur: 12, size: 10, drift: 20, rot: 45, type: "petal", flowerIdx: 0 },
  { left: 25, delay: 4, dur: 11, size: 8, drift: 30, rot: 200, type: "petal", flowerIdx: 1 },
  { left: 45, delay: 6, dur: 13, size: 16, drift: 10, rot: 300, type: "petal", flowerIdx: 2 },
  { left: 65, delay: 5, dur: 16, size: 11, drift: 25, rot: 240, type: "petal", flowerIdx: 3 },
  { left: 85, delay: 7, dur: 17, size: 10, drift: 15, rot: 330, type: "petal", flowerIdx: 4 },
  { left: 10, delay: 8, dur: 19, size: 8, drift: 5, rot: 270, type: "petal", flowerIdx: 5 },
  { left: 50, delay: 1.5, dur: 15, size: 14, drift: 28, rot: 190, type: "petal", flowerIdx: 6 },
  { left: 90, delay: 4.5, dur: 16, size: 11, drift: 18, rot: 100, type: "petal", flowerIdx: 7 },
  // Flower emojis
  { left: 15, delay: 2, dur: 15, size: 20, drift: -15, rot: 120, type: "flower", flowerIdx: 0 },
  { left: 35, delay: 1, dur: 18, size: 22, drift: -25, rot: 80, type: "flower", flowerIdx: 1 },
  { left: 55, delay: 3, dur: 14, size: 18, drift: -20, rot: 160, type: "flower", flowerIdx: 2 },
  { left: 75, delay: 0.5, dur: 12, size: 24, drift: -10, rot: 60, type: "flower", flowerIdx: 3 },
  { left: 30, delay: 3.5, dur: 13, size: 20, drift: -5, rot: 50, type: "flower", flowerIdx: 4 },
  { left: 70, delay: 6.5, dur: 12, size: 18, drift: -22, rot: 310, type: "flower", flowerIdx: 5 },
  { left: 42, delay: 9, dur: 14, size: 22, drift: 12, rot: 220, type: "flower", flowerIdx: 6 },
  { left: 60, delay: 5.5, dur: 16, size: 20, drift: -18, rot: 150, type: "flower", flowerIdx: 7 },
  // Sparkles
  { left: 8, delay: 1, dur: 10, size: 14, drift: 12, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 22, delay: 3, dur: 9, size: 12, drift: -8, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 38, delay: 5, dur: 11, size: 16, drift: 15, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 52, delay: 2, dur: 8, size: 10, drift: -12, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 68, delay: 7, dur: 12, size: 14, drift: 8, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 78, delay: 4, dur: 10, size: 12, drift: -6, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 92, delay: 6, dur: 9, size: 16, drift: 10, rot: 0, type: "sparkle", flowerIdx: 0 },
  { left: 18, delay: 8.5, dur: 11, size: 10, drift: -14, rot: 0, type: "sparkle", flowerIdx: 0 },
];

// Falling keyframes
const fallingCss = ITEMS.map(
  (p, i) =>
    `@keyframes fp${i}{0%{transform:translateY(0) translateX(0) rotate(0) scale(1);opacity:0}10%{opacity:.8}50%{opacity:.6}100%{transform:translateY(100vh) translateX(${p.drift}px) rotate(${p.rot}deg) scale(${p.type === "sparkle" ? 0.3 : 0.8});opacity:0}}`
).join("\n");

// Sparkle twinkle keyframe
const sparkleCss = `
@keyframes sparkle-twinkle{
  0%,100%{opacity:0;transform:scale(0.5) rotate(0deg)}
  25%{opacity:1;transform:scale(1.2) rotate(90deg)}
  50%{opacity:0.6;transform:scale(0.8) rotate(180deg)}
  75%{opacity:1;transform:scale(1.1) rotate(270deg)}
}
@keyframes sparkle-glow{
  0%,100%{filter:brightness(1) drop-shadow(0 0 2px rgba(255,215,0,0.3))}
  50%{filter:brightness(1.5) drop-shadow(0 0 8px rgba(255,215,0,0.8))}
}`;

const cssText = fallingCss + sparkleCss;

export default function FallingPetals() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssText }} />
      {ITEMS.map((p, i) => {
        if (p.type === "sparkle") {
          return (
            <div
              key={i}
              style={{
                position: "fixed",
                top: "-20px",
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                opacity: 0,
                animation: `fp${i} ${p.dur}s ${p.delay}s linear infinite, sparkle-twinkle 1.5s ${p.delay}s ease-in-out infinite, sparkle-glow 2s ${p.delay}s ease-in-out infinite`,
                pointerEvents: "none" as const,
                zIndex: 2,
              }}
            >
              ✨
            </div>
          );
        }
        if (p.type === "flower") {
          return (
            <div
              key={i}
              style={{
                position: "fixed",
                top: "-30px",
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                opacity: 0,
                animation: `fp${i} ${p.dur}s ${p.delay}s linear infinite`,
                pointerEvents: "none" as const,
                zIndex: 1,
              }}
            >
              {FLOWERS[p.flowerIdx].emoji}
            </div>
          );
        }
        // petal shape
        const flower = FLOWERS[p.flowerIdx];
        return (
          <div
            key={i}
            style={{
              position: "fixed",
              top: "-20px",
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              background: `linear-gradient(135deg, ${flower.colors[0]}, ${flower.colors[1]})`,
              borderRadius: "50% 50% 50% 0",
              opacity: 0,
              animation: `fp${i} ${p.dur}s ${p.delay}s linear infinite`,
              pointerEvents: "none" as const,
              zIndex: 1,
            }}
          />
        );
      })}
    </>
  );
}
