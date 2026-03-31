"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

const EMOJIS = ["✨", "⭐", "💫", "🌟"];

export default function CardSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const addSparkle = useCallback(() => {
    const s: Sparkle = {
      id: idRef.current++,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 8 + 14,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
    setSparkles((prev) => {
      const next = prev.length >= 5 ? prev.slice(1) : prev;
      return [...next, s];
    });
    setTimeout(() => {
      setSparkles((prev) => prev.filter((p) => p.id !== s.id));
    }, 1050);
  }, []);

  useEffect(() => {
    setMounted(true);
    const timers = [
      setTimeout(() => addSparkle(), 400),
      setTimeout(() => addSparkle(), 900),
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.25) addSparkle();
    }, 700);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [addSparkle]);

  if (!mounted) return null;

  return (
    <>
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            pointerEvents: "none",
            zIndex: 20,
            animation: "sparkle-blink 1s ease-in-out forwards",
          }}
        >
          {s.emoji}
        </span>
      ))}
    </>
  );
}
