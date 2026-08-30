import { useLayoutEffect } from "react";

// Ports scripts/sectionPositioning.js: each section's absolute `top` is
// derived from the measured height/offset of the section before it, so they
// must be recalculated in this exact order (about -> services -> projects ->
// contact) every time the layout could have changed.
export function useSectionPositioning(refs) {
  useLayoutEffect(() => {
    function updatePositions() {
      const home = refs.home.current;
      const about = refs.about.current;
      const services = refs.services.current;
      const projects = refs.projects.current;
      const contact = refs.contact.current;
      if (!home || !about || !services || !projects || !contact) return;

      const homeContentHeight = home.offsetHeight;
      if (window.innerWidth > 1000) {
        about.style.top = `${homeContentHeight + home.offsetTop - 100}px`;
      } else {
        about.style.top = `${homeContentHeight + home.offsetTop}px`;
      }

      const aboutContentHeight = about.offsetHeight;
      services.style.top = `${aboutContentHeight + about.offsetTop - 100}px`;

      const servicesContentHeight = services.offsetHeight;
      projects.style.top = `${servicesContentHeight + services.offsetTop - 100}px`;

      const projectsContentHeight = projects.offsetHeight;
      contact.style.top = `${projectsContentHeight + servicesContentHeight + services.offsetTop - 200}px`;
    }

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
