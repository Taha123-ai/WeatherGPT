

function Error() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111827",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        color: "#f3f4f6",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360, padding: "32px 24px" }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7280"
          strokeWidth="1.5"
          style={{ margin: "0 auto 16px" }}
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
 
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>
          Something went wrong
        </h1>
 
        <p style={{ fontSize: 14, lineHeight: 1.5, color: "#9ca3af", margin: "0 0 24px" }}>
          Weather GPT couldn't load the forecast. Please try again.
        </p>
 
        <button
          onClick={() => window.location.reload()}
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#fff",
            background: "#2563eb",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
 
        <div style={{ marginTop: 16, fontSize: 12, color: "#6b7280" }}>Error 503</div>
      </div>
    </div>
  );
}
export default Error;