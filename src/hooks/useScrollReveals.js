import { useEffect, useState } from "react";

// Ports the `.scrolls` reveal-on-scroll toggle and the services/projects/
// contact section-title scroll thresholds from scripts/sectionPositioning.js.
export function useScrollReveals() {
  const [scrollsActive, setScrollsActive] = useState(false);
  const [servicesTitleTrans, setServicesTitleTrans] = useState(false);
  const [projectsTitleTrans, setProjectsTitleTrans] = useState(false);
  const [contactTitleTrans, setContactTitleTrans] = useState(false);

  useEffect(() => {
    function scrollanimation() {
      if (window.scrollY > 10) {
        setScrollsActive(true);
      } else if (window.scrollY === 0) {
        setScrollsActive(false);
      }
    }

    function handleTitleThresholds() {
      setContactTitleTrans(window.scrollY > 2930);
      setServicesTitleTrans(window.scrollY > 1450);
      setProjectsTitleTrans(window.scrollY > 2450);
    }

    function handleScroll() {
      scrollanimation();
      if (window.innerWidth >= 1000) {
        handleTitleThresholds();
      }
    }

    function updateForWidth() {
      if (window.innerWidth < 1000) {
        // Mobile forces the services title visible regardless of scroll
        // position (matches updateScrollHandler in the original).
        setServicesTitleTrans(true);
      } else {
        handleTitleThresholds();
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateForWidth);
    updateForWidth();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateForWidth);
    };
  }, []);

  return { scrollsActive, servicesTitleTrans, projectsTitleTrans, contactTitleTrans };
}
