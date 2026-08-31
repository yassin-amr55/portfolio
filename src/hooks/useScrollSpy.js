import { useEffect, useState } from "react";

// Tracks which section is currently most in-view (for the nav's active
// link) and whether the page has scrolled past the top (for the nav's
// resting-vs-scrolled border/shadow). Simple IntersectionObserver, no
// pixel-offset math.
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { activeId, scrolled };
}
