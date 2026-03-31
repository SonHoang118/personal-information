"use client";

import { useEffect, useState, useRef } from "react";

export default function SparkleDebugPage() {
  const [log, setLog] = useState<string[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev.slice(-20), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    addLog("Component mounted");
    addLog(`User agent: ${navigator.userAgent}`);
    addLog(`Window size: ${window.innerWidth}x${window.innerHeight}`);

    // Test 1: Can we create sparkles?
    const timer = setInterval(() => {
      const s = {
        id: idRef.current++,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      };
      setSparkles((prev) => [...prev.slice(-4), s]);
      addLog(`Sparkle added id=${s.id} x=${s.x.toFixed(0)}% y=${s.y.toFixed(0)}%`);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((p) => p.id !== s.id));
      }, 1500);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: "monospace", fontSize: 13 }}>
      <h2 style={{ marginBottom: 12 }}>Sparkle Debug</h2>

      {/* Test A: Static emoji - always visible */}
      <div style={{ marginBottom: 16 }}>
        <b>Test A: Static emoji (no animation)</b>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 100,
            background: "#fef2f2",
            borderRadius: 12,
            border: "2px solid #fca5a5",
            overflow: "hidden",
          }}
        >
          <span style={{ position: "absolute", left: "20%", top: "30%", fontSize: 20 }}>✨</span>
          <span style={{ position: "absolute", left: "50%", top: "50%", fontSize: 20 }}>⭐</span>
          <span style={{ position: "absolute", left: "70%", top: "20%", fontSize: 20 }}>💫</span>
        </div>
        <p>↑ Bạn thấy 3 icon (✨ ⭐ 💫) không?</p>
      </div>

      {/* Test B: CSS animation from globals.css */}
      <div style={{ marginBottom: 16 }}>
        <b>Test B: CSS animation (sparkle-item class)</b>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 100,
            background: "#f0fdf4",
            borderRadius: 12,
            border: "2px solid #86efac",
            overflow: "hidden",
          }}
        >
          <span className="sparkle-item" style={{ left: "20%", top: "30%", fontSize: 20 }}>✨</span>
          <span className="sparkle-item" style={{ left: "50%", top: "50%", fontSize: 20 }}>⭐</span>
          <span className="sparkle-item" style={{ left: "70%", top: "20%", fontSize: 20 }}>💫</span>
        </div>
        <p>↑ Bạn thấy icon nhấp nháy rồi biến mất không?</p>
      </div>

      {/* Test C: Inline style animation (no class) */}
      <div style={{ marginBottom: 16 }}>
        <b>Test C: Inline style animation</b>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 100,
            background: "#eff6ff",
            borderRadius: 12,
            border: "2px solid #93c5fd",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "30%",
              top: "30%",
              fontSize: 24,
              animation: "sparkle-blink 1s ease-in-out infinite",
            }}
          >
            🌟
          </span>
          <span
            style={{
              position: "absolute",
              left: "60%",
              top: "40%",
              fontSize: 24,
              animation: "sparkle-blink 1s ease-in-out 0.3s infinite",
            }}
          >
            ✨
          </span>
        </div>
        <p>↑ Bạn thấy icon nhấp nháy liên tục không?</p>
      </div>

      {/* Test D: Dynamic sparkles via JS */}
      <div style={{ marginBottom: 16 }}>
        <b>Test D: Dynamic JS sparkles (count: {sparkles.length})</b>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 120,
            background: "#fdf4ff",
            borderRadius: 12,
            border: "2px solid #d8b4fe",
            overflow: "hidden",
          }}
        >
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="sparkle-item"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                fontSize: 20,
              }}
            >
              ✨
            </span>
          ))}
        </div>
        <p>↑ Bạn thấy ✨ xuất hiện và biến mất liên tục không?</p>
      </div>

      {/* Test E: backdrop-blur container (like the real card) */}
      <div style={{ marginBottom: 16 }}>
        <b>Test E: Backdrop-blur container (giống card thật)</b>
        <div
          className="backdrop-blur-xl overflow-hidden"
          style={{
            position: "relative",
            width: "100%",
            height: 120,
            background: "rgba(255,255,255,0.7)",
            borderRadius: 12,
            border: "2px solid #f9a8d4",
          }}
        >
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="sparkle-item"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                fontSize: 20,
              }}
            >
              ✨
            </span>
          ))}
        </div>
        <p>↑ Giống card thật (backdrop-blur + overflow-hidden)</p>
      </div>

      {/* Log */}
      <div style={{ marginTop: 20 }}>
        <b>Console Log:</b>
        <div
          style={{
            background: "#1e1e1e",
            color: "#0f0",
            padding: 10,
            borderRadius: 8,
            fontSize: 11,
            maxHeight: 200,
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
