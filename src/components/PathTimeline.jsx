import { paths } from "../data/paths";
import { useReveal } from "../hooks/useReveal";

export default function PathTimeline() {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className={`timeline ${visible ? "is-visible" : ""}`}>
      {paths.map((item, index) => (
        <div className="tl-item reveal-item" style={{ "--i": index }} key={index}>
          <p className="tl-date">{item.date}</p>
          <h3>{item.title}</h3>
          {/* item.disc contains a first-party <a> link, same as the site's original content */}
          <p dangerouslySetInnerHTML={{ __html: item.disc }}></p>
        </div>
      ))}
    </div>
  );
}
