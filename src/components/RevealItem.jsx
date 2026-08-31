import { useReveal } from "../hooks/useReveal";

// Reveals independently, on its own IntersectionObserver — for lists taller
// than the viewport (like the Path timeline) where a single parent-level
// trigger would reveal everything at once, including items still below the
// fold. Each item animates in only as it itself scrolls into view.
export default function RevealItem({ as: Tag = "div", className = "", ...props }) {
  const { ref, visible } = useReveal();
  return <Tag ref={ref} className={`reveal-item ${visible ? "is-visible" : ""} ${className}`} {...props} />;
}
