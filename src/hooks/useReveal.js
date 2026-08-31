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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
