import { forwardRef } from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const SERVICES = [
  {
    icon: "/icons/user.png",
    alt: "Web and mobile apps icon",
    title: "Web & Mobile Apps",
    disc: "I create amazing websites and mobile applications with stunning designs and powerful functionality tailored to your needs.",
  },
  {
    icon: "/icons/briefcase.png",
    alt: "Business solutions icon",
    title: "Business Solutions",
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

function ServiceItem({ service }) {
  return (
    <div className="service-item">
      <img className="icon" src={service.icon} alt={service.alt} />
      <h1>{service.title}</h1>
      <p>{service.disc}</p>
    </div>
  );
}

const Services = forwardRef(function Services({ titleTrans, scrollsActive }, ref) {
  return (
    <section className="services-content" ref={ref}>
      <div className={cx("services-title", titleTrans && "trans")}>
        <p className={cx("services", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          Services
        </p>
        <div className={cx("double-underlines", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          <span className="underlines"></span>
          <span className="underlinetwos"></span>
        </div>
      </div>

      <div className="services-services">
        <div className="upper-services service-column">
          <ServiceItem service={SERVICES[0]} />
          <ServiceItem service={SERVICES[1]} />
        </div>
        <div className="lower-services service-column">
          <ServiceItem service={SERVICES[2]} />
          <ServiceItem service={SERVICES[3]} />
        </div>
      </div>
    </section>
  );
});

export default Services;
