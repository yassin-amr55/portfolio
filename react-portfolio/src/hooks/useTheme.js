import { useCallback, useEffect, useState } from "react";

// Ports scripts/theme.js: light/dark mode + accent-color picker, both
// persisted to localStorage and applied to <html> (the `.active` class and
// the --accent-color custom property respectively).
export function useTheme() {
  // Lazy initializers read localStorage once, synchronously, on the first
  // render (mirrors the two DOMContentLoaded listeners in the original that
  // read localStorage — just without the extra render/effect round trip).
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("lightMode") === "true");
  const [accentColor, setAccentColorState] = useState(() => localStorage.getItem("themeColor")); // null = use the CSS default (red)

  useEffect(() => {
    document.documentElement.classList.toggle("active", lightMode);
  }, [lightMode]);

  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty("--accent-color", accentColor);
    }
  }, [accentColor]);

  const toggleLightMode = useCallback(() => {
    setLightMode((prev) => {
      const next = !prev;
      localStorage.setItem("lightMode", String(next));
      return next;
    });
  }, []);

  const changeAccentColor = useCallback((color) => {
    setAccentColorState(color);
    localStorage.setItem("themeColor", color);
  }, []);

  return { lightMode, toggleLightMode, accentColor, changeAccentColor };
}
