import { useTypingEffect } from "../hooks/useTypingEffect";
import { calculateExperience } from "../utils/experience";

export default function Hero() {
  const typedRole = useTypingEffect();
  const experience = calculateExperience();

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Self-taught &middot; Full-Stack</p>
          <h1 className="hero-name">Hello, my name is Yassin Amr</h1>
          <p className="hero-role">
            I'm a <span className="hero-role-word">{typedRole}</span>
            <span className="hero-cursor" aria-hidden="true"></span>
          </p>
          <p className="hero-pitch">
            {experience} years of hands-on experience building fast, polished web and mobile products — from
            marketing sites to full applications and interactive tools, for clients around the world.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See the work &rarr;
            </a>
            <a
              className="btn btn-ghost"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait crop-frame">
            <span className="crop tl"></span>
            <span className="crop tr"></span>
            <span className="crop bl"></span>
            <span className="crop br"></span>
            <img src="/images/yassin.png" alt="Portrait of Yassin Amr, full-stack developer" />
          </div>
          <div className="focus-tag">
            <span className="focus-dot"></span> in focus
          </div>
        </div>
      </div>
    </section>
  );
}
