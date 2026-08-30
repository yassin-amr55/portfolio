import { isHoverCapable } from "../utils/pointer";

export default function ProjectCard({ project, isActive, onActivate, onDeactivate, onToggle, onImgLoad }) {
  function handleMouseEnter() {
    if (isHoverCapable()) onActivate(project.id);
  }

  function handleMouseLeave() {
    if (isHoverCapable()) onDeactivate(project.id);
  }

  function handleClick(e) {
    if (isHoverCapable()) return;
    if (e.target.closest("a, button")) return; // let links / the studio button navigate
    onToggle(project.id);
  }

  return (
    <div className="projects-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <div className={`project-window${isActive ? " active" : ""}`}>
        <p className="web-name">{project.title}</p>
        <p className="web-disc">{project.disc}</p>
        {project.studio ? (
          <button
            type="button"
            className="web-button studio-button"
            onClick={() => window.location.assign(project.studioUrl)}
          >
            {project.linkText}
          </button>
        ) : (
          <a href={project.link} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}>
            <button type="button" className="web-button">
              {project.linkText}
            </button>
          </a>
        )}
      </div>
      <img src={project.img} alt={project.alt} onLoad={onImgLoad} />
      <p className="project-date">{project.date}</p>
    </div>
  );
}
