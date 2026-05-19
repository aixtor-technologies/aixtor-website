"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#fff" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/error.svg"
            alt="Critical error"
            style={{ width: "100%", maxWidth: "360px", marginBottom: "2rem" }}
          />
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.75rem" }}>
            Something went wrong!
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "2rem", maxWidth: "420px" }}>
            A critical error occurred. Please try again or refresh the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 2rem",
              borderRadius: "9999px",
              background: "linear-gradient(to right, #6c2bd9, #a855f7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
