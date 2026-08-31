import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useReveal } from "../hooks/useReveal";

export default function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="eyebrow">Selected Work</p>
        <h2 className="section-title">Projects</h2>

        <div ref={ref} className={`projects-grid ${visible ? "is-visible" : ""}`}>
          {projects.map((project, i) => (
            <div className="reveal-item" style={{ "--i": i % 3 }} key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
