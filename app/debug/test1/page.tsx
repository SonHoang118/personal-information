export default function Test1Page() {
  const css = `
@keyframes debugfall {
  0% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(400px); opacity: 0; }
}
`;

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        Test 1: CSS Animation
      </h1>
      <p style={{ marginBottom: "10px" }}>Bạn có thấy 3 cánh hoa rơi trong khung không?</p>
      <div style={{ height: "450px", overflow: "hidden", border: "2px solid #f472b6", borderRadius: "8px", padding: "10px", position: "relative" }}>
        <div style={{ display: "inline-block", width: "20px", height: "26px", background: "#f472b6", borderRadius: "50% 50% 50% 0", animation: "debugfall 3s linear infinite", margin: "0 10px" }} />
        <div style={{ display: "inline-block", width: "20px", height: "26px", background: "#f9a8d4", borderRadius: "50% 50% 50% 0", animation: "debugfall 3s 0.5s linear infinite", margin: "0 10px" }} />
        <div style={{ display: "inline-block", width: "20px", height: "26px", background: "#fb7185", borderRadius: "50% 50% 50% 0", animation: "debugfall 3s 1s linear infinite", margin: "0 10px" }} />
      </div>
      <a href="/debug" style={{ display: "inline-block", marginTop: "10px", color: "#f472b6" }}>← Quay lại</a>
    </div>
  );
}
