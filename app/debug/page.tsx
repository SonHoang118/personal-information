export default function DebugPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "14px", position: "relative", zIndex: 9999 }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        Debug Petals
      </h1>

      <p style={{ marginBottom: "10px" }}>Bạn có thấy 3 hình hồng bên dưới không?</p>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div style={{ width: "30px", height: "40px", background: "#f472b6", borderRadius: "50% 50% 50% 0" }} />
        <div style={{ width: "30px", height: "40px", background: "#f9a8d4", borderRadius: "50% 50% 50% 0" }} />
        <div style={{ width: "30px", height: "40px", background: "#fb7185", borderRadius: "50% 50% 50% 0" }} />
      </div>

      <p style={{ marginBottom: "10px" }}>Bấm link bên dưới:</p>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
        <li><a href="/debug/test1" style={{ display: "block", padding: "12px 20px", background: "#f472b6", color: "white", borderRadius: "8px", textDecoration: "none", textAlign: "center" }}>Test 1: CSS Animation</a></li>
        <li><a href="/debug/test2" style={{ display: "block", padding: "12px 20px", background: "#ec4899", color: "white", borderRadius: "8px", textDecoration: "none", textAlign: "center" }}>Test 2: JS Interval</a></li>
      </ul>
    </div>
  );
}
