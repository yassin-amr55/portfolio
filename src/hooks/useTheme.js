import { useCallback, useEffect, useState } from "react";

// Light/dark mode, persisted to localStorage and applied via [data-theme]
// on <html>. The old accent-color picker (5 arbitrary swatches) is gone —
// this design's cobalt/amber palette is a deliberate pair, not something
// meant to be swapped for a stranger's favorite color.
export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const resolvedDark =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const currentlyDark =
        current === "dark" || (current === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      const next = currentlyDark ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  return { isDark: resolvedDark, toggleTheme };
}
