"use client";

import { useEffect } from "react";

function applyWidowFix(root: ParentNode = document) {
  try {
    const selector = "p, h1, h2, h3, h4, h5, h6, .prevent-widow";
    const nodes = Array.from(root.querySelectorAll(selector)) as HTMLElement[];

    nodes.forEach((el) => {
      // Skip elements that have child elements — we only handle plain text blocks
      if (el.children.length > 0) return;

      const text = el.textContent || "";
      // Do not apply the widow rule to the main site title exactly matching "BETTER THINGS"
      if (text.trim() === "BETTER THINGS") return;
      // Ignore very short strings
      if (text.trim().split(/\s+/).length < 2) return;

      // Replace last normal space with a non-breaking space
      // Use a regex that avoids touching trailing punctuation-only endings
      const newText = text.replace(/\s+([^\s]+)\s*$/u, "\u00A0$1");
      if (newText !== text) {
        el.textContent = newText;
      }
    });
  } catch (err) {
    // fail silently
    // console.error('Widow fix failed', err);
  }
}

export default function WidowFix() {
  useEffect(() => {
    // Apply initially
    applyWidowFix(document);

    // Re-apply after a short delay to catch fonts/layout changes
    const t = setTimeout(() => applyWidowFix(document), 350);

    // Also re-apply on window resize (debounced)
    let rtid: number | null = null;
    const onResize = () => {
      if (rtid) window.clearTimeout(rtid);
      rtid = window.setTimeout(() => applyWidowFix(document), 180);
    };
    window.addEventListener("resize", onResize);

    // Observe DOM mutations in body for added text nodes (lightweight)
    const mo = new MutationObserver((mutations) => {
      let changed = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          changed = true;
          break;
        }
      }
      if (changed) applyWidowFix(document);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      mo.disconnect();
    };
  }, []);

  return null;
}
