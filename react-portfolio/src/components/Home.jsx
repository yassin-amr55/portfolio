import { forwardRef } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { calculateExperience } from "../utils/experience";

const Home = forwardRef(function Home({ trans }, ref) {
  const typedRole = useTypingEffect();
  const experience = calculateExperience();

  return (
    <section className={`home-content${trans ? " trans" : ""}`} ref={ref}>
      <div className="text-content">
        <p>
          Hello, my name is <span className="highlite-one">Yassin Amr</span>
        </p>
        <p>
          I'm a <span className="highlite-two">{typedRole}</span>
          <strong>I</strong>
        </p>
        <p className="disc discone">
          {experience} years of hands-on experience building fast, polished web and mobile products — from marketing
          sites to full applications and interactive tools, for clients around the world.
        </p>
      </div>

      <div className="image-container">
        <img src="/images/yassin.png" className="profileimg" alt="Yassin Amr - Full-Stack Developer profile picture" />
        <div className="Lone">
          <span className="lineone"></span>
          <span className="linetwo"></span>
        </div>
        <div className="Ltwo">
          <span className="lineone"></span>
          <span className="linetwo"></span>
        </div>
      </div>
    </section>
  );
});

export default Home;
