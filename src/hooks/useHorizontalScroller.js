import { useCallback, useEffect, useRef, useState } from "react";

// Ports the generic horizontal scroller + self-hiding arrows from
// scripts/projectsRenderer.js's setupScroller().
export function useHorizontalScroller() {
  const scrollRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setHasOverflow(maxScroll > 2);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= maxScroll - 2);
  }, []);

  const scrollStep = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    }

    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    update();

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, [update]);

  return {
    scrollRef,
    prevHidden: !hasOverflow || atStart,
    nextHidden: !hasOverflow || atEnd,
    scrollStep,
    recheck: update,
  };
}
