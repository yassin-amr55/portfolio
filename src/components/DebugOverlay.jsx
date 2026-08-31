import { useEffect, useState } from "react";

// Temporary diagnostic overlay — only renders when the URL has ?debug in
// it. Shows live header-vs-content measurements directly on the page so
// they can be read/screenshotted on a phone, where opening devtools isn't
// practical. Remove once the width-mismatch bug is confirmed fixed.
export default function DebugOverlay() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!window.location.search.includes("debug")) return undefined;

    function measure() {
      const header = document.querySelector("header");
      const home = document.querySelector(".home-content");
      const about = document.querySelector(".about-content");
      if (!header || !home || !about) return;
      const h = header.getBoundingClientRect();
      const c = home.getBoundingClientRect();
      const a = about.getBoundingClientRect();
      setInfo({
        innerWidth: window.innerWidth,
        dpr: window.devicePixelRatio,
        bodyStyleWidth: document.body.style.width,
        bodyClientWidth: document.body.clientWidth,
        headerRight: Math.round(h.right),
        homeRight: Math.round(c.right),
        aboutRight: Math.round(a.right),
        visualViewportWidth: window.visualViewport ? Math.round(window.visualViewport.width) : "n/a",
      });
    }

    measure();
    const id = setInterval(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!info) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        background: "black",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: "11px",
        padding: "6px 8px",
        lineHeight: 1.5,
        whiteSpace: "pre",
        pointerEvents: "none",
      }}
    >
      {Object.entries(info)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")}
    </div>
  );
}
