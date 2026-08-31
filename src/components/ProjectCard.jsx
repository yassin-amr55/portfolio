export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image crop-frame">
        <span className="crop tl"></span>
        <span className="crop br"></span>
        <img src={project.img} alt={project.alt} loading="lazy" />
      </div>
      <div className="project-body">
        <div className="project-heading">
          <h3>{project.title}</h3>
          <span className="project-date">{project.date}</span>
        </div>
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
