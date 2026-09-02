import { useEffect, useRef, useState } from "react";

// One tasteful scroll-triggered reveal, used consistently for section
// entrances — fades/lifts in once, on first intersection. Deliberately
// not repeated per-element inside sections (that reads as busy); apply it
// once per section container.
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // threshold: 0.15 required 15% of the *target's own height* to be
      // visible before firing -- fine for a short element, but for a tall
      // one (a whole grid, a whole info list) that 15% could be hundreds
      // of pixels, so the reveal didn't fire until the element was already
      // most of the way up the screen. Firing on any overlap at all, with
      // a small negative bottom margin so it triggers just before the
      // element's top actually reaches the viewport, is independent of
      // how tall the target is.
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
