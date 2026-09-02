import { TbDevices, TbBriefcase, TbCode, TbUsersGroup } from "react-icons/tb";
import { useReveal } from "../hooks/useReveal";

const SERVICES = [
  {
    Icon: TbDevices,
    title: "Web & Mobile Apps",
    disc: "I build fast, polished websites and mobile apps with clean design and reliable functionality, tailored to what you actually need.",
  },
  {
    Icon: TbBriefcase,
    title: "Website Solutions",
    disc: "I find and fix what's holding your website back — from performance and usability issues to missing features — and build the solutions to solve them.",
  },
  {
    Icon: TbCode,
    title: "Interactive Applications",
    disc: "I build highly interactive apps with animations, real-time features, and cutting-edge technology that make your project stand out.",
  },
  {
    Icon: TbUsersGroup,
    title: "Development Partner",
    disc: "I collaborate with developers and teams to build innovative applications and bring ambitious projects to life.",
  },
];

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="services">
      <div className="container">
        <p className="eyebrow">What I Do</p>
        <h2 className="section-title">Services</h2>

        <div ref={ref} className={`services-grid ${visible ? "is-visible" : ""}`}>
          {SERVICES.map((service, i) => (
            <div className="service-card reveal-item" style={{ "--i": i }} key={service.title}>
              <service.Icon className="service-icon" aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.disc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
