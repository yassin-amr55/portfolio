export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image crop-frame">
        <span className="crop tl"></span>
        <span className="crop br"></span>
        <img src={project.img} alt={project.alt} loading="lazy" width="640" height="400" />
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.disc}</p>
        {project.studio ? (
          <button
            type="button"
            className="project-link"
            onClick={() => window.location.assign(project.studioUrl)}
          >
            {project.linkText} &rarr;
          </button>
        ) : (
          <a
            className="project-link"
            href={project.link}
            target={project.external ? "_blank" : undefined}
            rel={project.external ? "noopener noreferrer" : undefined}
          >
            {project.linkText} &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
