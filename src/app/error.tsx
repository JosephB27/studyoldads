"use client";

/**
 * Catch-all recovery page. Without it, a failed server-action round-trip
 * (deploy version skew on a cached page, offline submit) crashes to Next's
 * default full-page error screen.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#fff",
        color: "#050505",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ display: "grid", gap: 14, textAlign: "center" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6b6b6b",
          }}
        >
          Something broke
        </p>
        <p style={{ fontSize: 15 }}>The page hit an error. Your place is safe.</p>
        <button
          onClick={reset}
          style={{
            justifySelf: "center",
            padding: "6px 0 2px",
            border: 0,
            borderBottom: "1px solid #d6d2c6",
            background: "transparent",
            color: "#050505",
            cursor: "pointer",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
