import { useEffect, useState } from "react";

const WORDS = [
  "Web Developer",
  "App Developer",
  "Full-Stack Developer",
  "Web Designer",
  "FreeLancer",
];

// Ports the type/delete loop from scripts/main.js 1:1 (same word list, same
// 200ms/100ms typing/deleting speed, same 2s pause after each full word).
export function useTypingEffect(words = WORDS) {
  const [text, setText] = useState("");

  useEffect(() => {
    let timeoutId;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        setText(currentWord.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      } else {
        charIndex++;
        setText(currentWord.slice(0, charIndex));
        if (charIndex === currentWord.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 2000);
          return;
        }
      }

      timeoutId = setTimeout(tick, isDeleting ? 100 : 200);
    }

    tick();
    return () => clearTimeout(timeoutId);
  }, [words]);

  return text;
}
