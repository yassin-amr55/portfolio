import { forwardRef, useCallback, useEffect, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useHorizontalScroller } from "../hooks/useHorizontalScroller";
import { isHoverCapable } from "../utils/pointer";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// Ports scripts/projectsRenderer.js's mobile masonry split: pattern 3 / 2 /
// 3 / 2 ..., with every "short" (2-item) column pushed down half a card.
function buildMobileColumns() {
  const columns = [];
  let i = 0;
  let colIndex = 0;
  while (i < projects.length) {
    const size = colIndex % 2 === 0 ? 3 : 2;
    columns.push({ items: projects.slice(i, i + size), short: colIndex % 2 === 1 });
    i += size;
    colIndex++;
  }
  return columns;
}

const MOBILE_COLUMNS = buildMobileColumns();
const SPLIT_AT = Math.ceil(projects.length / 2);
const TOP_ROW = projects.slice(0, SPLIT_AT);
const BOTTOM_ROW = projects.slice(SPLIT_AT);

const Projects = forwardRef(function Projects({ titleTrans, scrollsActive }, ref) {
  const [activeId, setActiveId] = useState(null);
  const { scrollRef, prevHidden, nextHidden, scrollStep, recheck } = useHorizontalScroller();

  // Tapping anywhere outside a project card closes whichever card is open
  // (touch devices only — hover-capable devices never set activeId via tap).
  useEffect(() => {
    function handleOutsideClick(e) {
      if (isHoverCapable()) return;
      if (!e.target.closest(".projects-item")) {
        setActiveId(null);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleActivate = useCallback((id) => setActiveId(id), []);
  const handleDeactivate = useCallback((id) => setActiveId((current) => (current === id ? null : current)), []);
  const handleToggle = useCallback((id) => setActiveId((current) => (current === id ? null : id)), []);

  function renderCard(project) {
    return (
      <ProjectCard
        key={project.id}
        project={project}
        isActive={activeId === project.id}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
        onToggle={handleToggle}
        onImgLoad={recheck}
      />
    );
  }

  return (
    <section className="projects-content" ref={ref}>
      <div className={cx("projects-title", titleTrans && "trans")}>
        <p className={cx("projects", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          Projects
        </p>
        <div className={cx("double-underline", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          <span className="underline"></span>
          <span className="underlinetwo"></span>
        </div>
      </div>

      <div className="projects-projects">
        {/* Desktop: diagonal / staggered 2-row layout, horizontally scrollable */}
        <div className="projects-desktop">
          <div className="projects-scroll" ref={scrollRef}>
            <div className="projects-row projects-row-top">{TOP_ROW.map(renderCard)}</div>
            <div className="projects-row projects-row-bottom">{BOTTOM_ROW.map(renderCard)}</div>
          </div>
          <button
            type="button"
            className={cx("projects-arrow", "projects-arrow-prev", prevHidden && "is-hidden")}
            aria-label="Scroll projects left"
            onClick={() => scrollStep(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            type="button"
            className={cx("projects-arrow", "projects-arrow-next", nextHidden && "is-hidden")}
            aria-label="Scroll projects right"
            onClick={() => scrollStep(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Mobile: staggered masonry columns (3 / 2 / 3 / 2 ...), horizontally scrollable */}
        <div className="projects-mobile">
          <div className="projects-mobile-track">
            {MOBILE_COLUMNS.map((col, index) => (
              <div className={cx("projects-mobile-col", col.short && "col-short")} key={index}>
                {col.items.map(renderCard)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
