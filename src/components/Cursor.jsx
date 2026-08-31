import { useEffect, useRef } from "react";

// A small ring that follows the pointer and pulses on click — restored from
// the original site. CSS gates it to devices with a real mouse
// (hover:hover + pointer:fine), so it never shows up on touch/mobile.
export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    function handleMouseMove(e) {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    }

    let clickTimeout;
    function handleClick() {
      cursor.classList.add("active");
      clickTimeout = setTimeout(() => cursor.classList.remove("active"), 200);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      clearTimeout(clickTimeout);
    };
  }, []);

  return <div className="cursor-ring" ref={cursorRef}></div>;
}
