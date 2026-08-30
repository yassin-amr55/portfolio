import { forwardRef, useMemo, useRef } from "react";
import { paths } from "../data/paths";
import { calculateAge, calculateExperience } from "../utils/experience";
import { useCharacterReveal } from "../hooks/useCharacterReveal";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const BIO_TEXT_TEMPLATE = (experience) =>
  `I am a self-taught full-stack developer with a strong passion for coding and creating impactful digital experiences. Over the past ${experience} year(s), I have dedicated myself to learning and mastering development through hands-on projects, self-directed study, and constant practice. Despite being relatively new to this field, my skills and experience reflect a high level of competence and attention to detail. I thrive on working collaboratively with clients and team members to bring their vision to life by building user-friendly, visually appealing, and functional websites and applications. From interactive web apps to mobile solutions, I create amazing digital products that solve real problems. My dedication to continuous learning and problem-solving has allowed me to develop a deep understanding of modern technologies in a short period. I am eager to take on new challenges, grow my expertise, and contribute meaningfully to innovative projects.`;

function PathColumn({ items }) {
  return (
    <>
      {items.map((path, index) => (
        <div className="path-item" key={index}>
          <div className="about-date">
            <img src="/icons/calendar.png" className="icon" alt="" />
            <p>{path.date}</p>
          </div>
          <div className="path-content">
            <h2>{path.title}</h2>
            {/* path.disc contains a first-party <a> link, same as the original innerHTML */}
            <p dangerouslySetInnerHTML={{ __html: path.disc }}></p>
          </div>
        </div>
      ))}
    </>
  );
}

const About = forwardRef(function About({ scrollsActive }, ref) {
  const experience = calculateExperience();
  const age = calculateAge();
  const bioRef = useRef(null);
  const bioText = useMemo(() => BIO_TEXT_TEMPLATE(experience), [experience]);
  const bioChars = useMemo(() => bioText.split(""), [bioText]);

  useCharacterReveal(bioRef);

  const leftPaths = useMemo(() => paths.filter((_, i) => i < paths.length / 2), []);
  const rightPaths = useMemo(() => paths.slice(Math.ceil(paths.length / 2)), []);

  return (
    <section className="about-content" id="about-content" ref={ref}>
      <div className="about-title">
        <p className={cx("about", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          About Me
        </p>
        <div className={cx("double-underline", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          <span className="underline"></span>
          <span className="underlinetwo"></span>
        </div>
      </div>
      <div className="about-text-content">
        <p>
          I'm Yassin Amr and I am a <span className="highlite-two">Full-Stack Developer</span>
        </p>
        <br />
        <p className="disc disctwo" style={{ fontSize: "1.2rem" }} ref={bioRef}>
          {bioChars.map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </p>
      </div>
      <div className="more-info">
        <div className="info-column">
          <p>
            <strong>Birthday:</strong> 10 December 2009
          </p>
          <p>
            <strong>Age:</strong> <span id="dynamic-age">{age}</span>
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:yassin5amr55@gmail.com">yassin5amr55@gmail.com</a>
          </p>
          <p>
            <strong>Whatsapp:</strong> <a href="https://wa.me/201066004890">01066004890</a>
          </p>
        </div>
        <div className="info-column">
          <p>
            <strong>Freelance:</strong> Available
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <a href="https://maps.app.goo.gl/zmjqNV1cFJiTuof18">Giza Governorate, Egypt</a>
          </p>
          <p>
            <strong>Education:</strong> Self-taught
          </p>
          <p className="experienceinfo">
            <strong>Experience:</strong> {experience} years
          </p>
        </div>
      </div>

      <div className="path">
        <h1>Path</h1>
        <div className="path-container">
          <div className="path-left">
            <PathColumn items={leftPaths} />
          </div>
          <div className="path-right">
            <PathColumn items={rightPaths} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
