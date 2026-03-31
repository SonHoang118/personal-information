"use client";

import { useEffect, useState } from "react";

export default function DebugPetals() {
  const [log, setLog] = useState<string[]>([]);
  const [test, setTest] = useState(0);

  function addLog(msg: string) {
    setLog((prev) => [...prev, msg]);
  }

  useEffect(() => {
    addLog("Component mounted");
    addLog(`User agent: ${navigator.userAgent}`);
    addLog(`Window size: ${window.innerWidth}x${window.innerHeight}`);
    addLog(`Document height: ${document.documentElement.scrollHeight}`);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "14px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        Debug Petals - iPhone
      </h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => { setTest(1); addLog("Test 1: Static div"); }}
          style={{ padding: "8px 16px", background: "#f472b6", color: "white", border: "none", borderRadius: "8px" }}
        >
          Test 1: Static div
        </button>
        <button
          onClick={() => { setTest(2); addLog("Test 2: CSS animation"); }}
          style={{ padding: "8px 16px", background: "#f472b6", color: "white", border: "none", borderRadius: "8px" }}
        >
          Test 2: CSS anim
        </button>
        <button
          onClick={() => { setTest(3); addLog("Test 3: JS interval"); }}
          style={{ padding: "8px 16px", background: "#f472b6", color: "white", border: "none", borderRadius: "8px" }}
        >
          Test 3: JS interval
        </button>
        <button
          onClick={() => { setTest(0); addLog("Reset"); }}
          style={{ padding: "8px 16px", background: "#666", color: "white", border: "none", borderRadius: "8px" }}
        >
          Reset
        </button>
      </div>

      {/* Test 1: Just a static pink div - can you even see it? */}
      {test === 1 && (
        <div>
          <p style={{ marginBottom: "8px" }}>Bạn có thấy 3 hình hồng bên dưới không?</p>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "30px", height: "40px", background: "#f472b6", borderRadius: "50% 50% 50% 0" }} />
            <div style={{ width: "30px", height: "40px", background: "#f9a8d4", borderRadius: "50% 50% 50% 0" }} />
            <div style={{ width: "30px", height: "40px", background: "#fb7185", borderRadius: "50% 50% 50% 0" }} />
          </div>
          <p>Giờ thấy 3 cánh hoa fixed ở góc trên phải không?</p>
          <div style={{ position: "fixed", top: "60px", right: "20px", width: "20px", height: "26px", background: "#f472b6", borderRadius: "50% 50% 50% 0", zIndex: 9999 }} />
          <div style={{ position: "fixed", top: "60px", right: "50px", width: "20px", height: "26px", background: "#f9a8d4", borderRadius: "50% 50% 50% 0", zIndex: 9999 }} />
          <div style={{ position: "fixed", top: "60px", right: "80px", width: "20px", height: "26px", background: "#fb7185", borderRadius: "50% 50% 50% 0", zIndex: 9999 }} />
        </div>
      )}

      {/* Test 2: CSS animation */}
      {test === 2 && <Test2CSSAnim onLog={addLog} />}

      {/* Test 3: JS interval movement */}
      {test === 3 && <Test3JSMove onLog={addLog} />}

      {/* Log */}
      <div style={{ marginTop: "20px", padding: "10px", background: "#111", color: "#0f0", borderRadius: "8px", maxHeight: "300px", overflow: "auto" }}>
        <p style={{ fontWeight: "bold", marginBottom: "4px" }}>Log:</p>
        {log.map((l, i) => (
          <p key={i} style={{ margin: "2px 0", fontSize: "12px" }}>{l}</p>
        ))}
      </div>
    </div>
  );
}

function Test2CSSAnim({ onLog }: { onLog: (m: string) => void }) {
  useEffect(() => {
    onLog("CSS animation test rendered");
  }, [onLog]);

  const cssText = `
@keyframes debugfall {
  0% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(400px); opacity: 0; }
}
.debug-petal {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 26px;
  background: #f472b6;
  border-radius: 50% 50% 50% 0;
  animation: debugfall 3s linear infinite;
  margin: 0 10px;
}
`;

  return (
    <div>
      <p style={{ marginBottom: "8px" }}>Bạn có thấy 3 cánh hoa đang rơi xuống không?</p>
      <style dangerouslySetInnerHTML={{ __html: cssText }} />
      <div style={{ height: "450px", overflow: "hidden", border: "1px solid #f472b6", borderRadius: "8px", padding: "10px" }}>
        <div className="debug-petal" />
        <div className="debug-petal" style={{ animationDelay: "0.5s" }} />
        <div className="debug-petal" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
}

function Test3JSMove({ onLog }: { onLog: (m: string) => void }) {
  const [y, setY] = useState(0);

  useEffect(() => {
    onLog("JS interval test started");
    const id = setInterval(() => {
      setY((prev) => {
        if (prev > 400) return 0;
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(id);
  }, [onLog]);

  return (
    <div>
      <p style={{ marginBottom: "8px" }}>Bạn có thấy cánh hoa đang rơi xuống không? (JS setInterval)</p>
      <div style={{ height: "450px", overflow: "hidden", border: "1px solid #f472b6", borderRadius: "8px", padding: "10px", position: "relative" }}>
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
    </div>
  );
}
