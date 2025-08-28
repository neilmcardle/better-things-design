"use client";
import React from "react";

export default function Home() {
  return (
    <div
      style={{
        background: "#212121",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div className="terminal-content">
        <div>Look.</div>
        <div style={{ marginTop: "2.5rem" }}>I build ideas.</div>
        <div style={{ marginTop: "2.5rem" }}>I do not have a niche to sell you.</div>
        <div style={{ marginTop: "2.5rem" }}>
          Instead, for you, I am convinced of better things.
        </div>
        {/* Cursor one line below last sentence */}
        <div style={{ marginTop: "2.5rem" }}>
          <span className="flashing-cursor" />
        </div>
        <style jsx>{`
          @keyframes blink {
            to {
              opacity: 0;
            }
          }
          .terminal-content {
            margin-top: 80px;
            font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
            color: #e0e0e0;
            font-size: 1.25rem; /* Default desktop size (20px) */
            line-height: 2.5rem;
            max-width: 900px;
            word-break: break-word;
          }
          .flashing-cursor {
            display: inline-block;
            width: 2px;
            height: 2rem;
            background: #00f0e0;
            animation: blink 1.6s steps(2, start) infinite;
          }
          @media (max-width: 600px) {
            .terminal-content {
              margin-left: 16px;
              margin-right: 16px;
              font-size: 2rem; /* 32px, 2x default browser size */
            }
            .flashing-cursor {
              height: 2rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
}