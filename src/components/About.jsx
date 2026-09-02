import { calculateExperience } from "../utils/experience";
import { useReveal } from "../hooks/useReveal";
import PathTimeline from "./PathTimeline";

const BIO = (experience) =>
  `I am a self-taught full-stack developer with a strong passion for coding and creating impactful digital experiences. Over the past ${experience} year(s), I have dedicated myself to learning and mastering development through hands-on projects, self-directed study, and constant practice. Despite being relatively new to this field, my skills and experience reflect a high level of competence and attention to detail. I thrive on working collaboratively with clients and team members to bring their vision to life by building user-friendly, visually appealing, and functional websites and applications. From interactive web apps to mobile solutions, I create amazing digital products that solve real problems. My dedication to continuous learning and problem-solving has allowed me to develop a deep understanding of modern technologies in a short period. I am eager to take on new challenges, grow my expertise, and contribute meaningfully to innovative projects.`;

const INFO = (experience) => [
  { label: "Freelance", value: "Available" },
  { label: "Education", value: "Self-taught" },
  { label: "Experience", value: `${experience} years` },
  {
    label: "Location",
    value: "Giza Governorate, Egypt",
    href: "https://maps.app.goo.gl/zmjqNV1cFJiTuof18",
  },
  { label: "Email", value: "yassin5amr55@gmail.com", href: "mailto:yassin5amr55@gmail.com" },
  { label: "Whatsapp", value: "01066004890", href: "https://wa.me/201066004890" },
];

export default function About() {
  const experience = calculateExperience();
  const info = INFO(experience);
  const { ref: bioRef, visible: bioVisible } = useReveal();
  const { ref: infoRef, visible: infoVisible } = useReveal();

  return (
    <section id="about" className="about">
      <div className="container">
        <p className="eyebrow">About Me</p>
        <h2 className="section-title">I'm Yassin Amr and I am a Full-Stack Developer</h2>

        <p ref={bioRef} className={`about-bio ${bioVisible ? "is-visible" : ""}`}>
          {BIO(experience)}
        </p>

        <dl ref={infoRef} className={`about-info ${infoVisible ? "is-visible" : ""}`}>
          {info.map((item, i) => (
            <div className="about-info-row reveal-item" style={{ "--i": i }} key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.href ? <a href={item.href}>{item.value}</a> : item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="path">
          <div className="path-head">
            <h3>The path so far</h3>
            <span>2024 &rarr; now</span>
          </div>
          <PathTimeline />
        </div>
      </div>
    </section>
  );
}
