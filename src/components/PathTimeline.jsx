import { paths } from "../data/paths";
import RevealItem from "./RevealItem";

export default function PathTimeline() {
  return (
    <div className="timeline">
      {paths.map((item, index) => (
        <RevealItem className="tl-item" key={index}>
          <p className="tl-date">{item.date}</p>
          <h3>{item.title}</h3>
          {/* item.disc contains a first-party <a> link, same as the site's original content */}
          <p dangerouslySetInnerHTML={{ __html: item.disc }}></p>
        </RevealItem>
      ))}
    </div>
  );
}
