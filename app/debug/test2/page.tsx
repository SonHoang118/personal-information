"use client";

import { useEffect, useState } from "react";

export default function Test2Page() {
  const [y, setY] = useState(0);
  const [info, setInfo] = useState("");

  useEffect(() => {
    setInfo(`${navigator.userAgent.slice(0, 80)}... | ${window.innerWidth}x${window.innerHeight}`);
    const id = setInterval(() => {
      setY((prev) => (prev > 400 ? 0 : prev + 2));
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        Test 2: JS Interval
      </h1>
      <p style={{ marginBottom: "10px" }}>Bạn có thấy cánh hoa đang rơi không?</p>
      <div style={{ height: "450px", overflow: "hidden", border: "2px solid #f472b6", borderRadius: "8px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: `${y}px`,
            left: "50%",
            width: "20px",
            height: "26px",
            background: "#f472b6",
            borderRadius: "50% 50% 50% 0",
            marginLeft: "-10px",
          }}
        />
      </div>
      <p style={{ marginTop: "10px", fontSize: "10px", color: "#888", wordBreak: "break-all" }}>{info}</p>
      <a href="/debug" style={{ display: "inline-block", marginTop: "10px", color: "#f472b6" }}>← Quay lại</a>
    </div>
  );
}
