import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiGit,
  SiGithub,
  SiNetlify,
  SiVercel,
} from "react-icons/si";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { useReveal } from "../hooks/useReveal";

const SKILLS = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "React Native", Icon: SiReact },
  { name: "Phaser.js", Icon: TbDeviceGamepad2 },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Vite", Icon: SiVite },
];

const TOOLS = [
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Netlify", Icon: SiNetlify },
  { name: "Vercel", Icon: SiVercel },
  { name: "VS Code", Icon: VscVscode },
];

function SkillGroup({ title, items }) {
  const { ref, visible } = useReveal();
  return (
    <div className="skills-group">
      <h3 className="skills-group-title">{title}</h3>
      <div ref={ref} className={`skills-grid ${visible ? "is-visible" : ""}`}>
        {items.map((item, i) => (
          <div className="skill-chip reveal-item" style={{ "--i": i }} key={item.name}>
            <item.Icon className="skill-icon" aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="eyebrow">What I Use</p>
        <h2 className="section-title">Skills &amp; Tools</h2>

        <SkillGroup title="Languages & Frameworks" items={SKILLS} />
        <SkillGroup title="Tools" items={TOOLS} />
      </div>
    </section>
  );
}
