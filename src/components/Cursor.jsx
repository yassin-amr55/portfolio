import { useEffect, useRef } from "react";

// Ports the custom-cursor block from scripts/main.js.
export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    function handleMouseMove(e) {
      cursor.setAttribute("style", `top: ${e.pageY - window.scrollY}px; left: ${e.pageX}px;`);
    }

    let clickTimeout;
    function handleClick() {
      cursor.classList.add("active");
      clickTimeout = setTimeout(() => {
        cursor.classList.remove("active");
      }, 200);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      clearTimeout(clickTimeout);
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
}
