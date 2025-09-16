"use client";
import React from "react";

export default function Home() {
  return (
    <div
      style={{
        background: "#f4f4f4", // Set viewport background color
        minHeight: "100vh", // Ensures full height of the viewport
        display: "flex", // Use flexbox for centering
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <img
        src="/caveman-computer.svg" // Path to the SVG in the public folder
        alt="Computer Illustration"
        style={{
          height: "160px", // Fixed height for the SVG
          width: "auto", // Maintain aspect ratio
          animation: "page_fadeIn 1s ease-in forwards", // Apply fade-in animation
          opacity: 0, // Initial opacity for fade-in effect
        }}
      />
      <style jsx>{`
        @keyframes page_fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}