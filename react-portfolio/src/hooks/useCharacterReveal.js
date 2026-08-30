import { useEffect } from "react";

// Ports the About-bio "disc scrolling effect" from scripts/otherEffects.js:
// each character of the bio is its own <span>, and as the paragraph scrolls
// through the viewport, characters light up from --disc-scroll-color to
// --disc-color. Direct style writes (instead of React state) are kept here
// on purpose — the original updates every span on every rAF tick, and doing
// that through a state update + re-render for a few hundred spans would be
// far more expensive than the equivalent direct DOM writes.
export function useCharacterReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll("span");
    const totalLength = spans.length;
    let ticking = false;

    function updateTextBasedOnScroll() {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progress from 0 (paragraph's top just entering the bottom of the
      // viewport) to 1 (paragraph's bottom exiting the top of the viewport).
      // The original clamped `visibleHeight` to viewportHeight, which meant
      // it stopped changing at all — and the reveal froze mid-paragraph —
      // as soon as the paragraph's top scrolled above the viewport's top
      // edge, well before the paragraph had actually scrolled past.
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);

      // >1 so the reveal finishes comfortably before the paragraph scrolls
      // fully out of view, instead of only completing right as it exits.
      const speedMultiplier = 2.4;
      const scrollProgress = Math.min(1, Math.max(0, rawProgress * speedMultiplier));

      const charsToShow = Math.round(scrollProgress * totalLength);

      spans.forEach((span, index) => {
        span.style.color = index < charsToShow ? "var(--disc-color)" : "var(--disc-scroll-color)";
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateTextBasedOnScroll);
      }
    }

    window.addEventListener("scroll", onScroll);
    updateTextBasedOnScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);
}
