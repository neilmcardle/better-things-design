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
      {/* Use the Image component or an <img> tag for the SVG */}
      <img
        src="/caveman-computer.svg" // Path to the SVG in the public folder
        alt="Computer Illustration"
        style={{
          height: "160px", // Set fixed height
          width: "auto", // Maintain aspect ratio
        }}
      />
    </div>
  );
}