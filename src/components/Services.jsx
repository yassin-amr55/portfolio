import { useReveal } from "../hooks/useReveal";

const SERVICES = [
  {
    icon: "/icons/user.png",
    alt: "Web and mobile apps icon",
    title: "Web & Mobile Apps",
    disc: "I create amazing websites and mobile applications with stunning designs and powerful functionality tailored to your needs.",
  },
  {
    icon: "/icons/briefcase.png",
    alt: "Website solutions icon",
    title: "Website Solutions",
    disc: "I help businesses build custom applications and websites designed to grow their brand and attract more customers.",
  },
  {
    icon: "/icons/code.png",
    alt: "Interactive applications icon",
    title: "Interactive Applications",
    disc: "I build highly interactive apps with animations, real-time features, and cutting-edge technology that make your project stand out.",
  },
  {
    icon: "/icons/chat.png",
    alt: "Development partner icon",
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
              <img className="service-icon" src={service.icon} alt={service.alt} />
              <h3>{service.title}</h3>
              <p>{service.disc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
