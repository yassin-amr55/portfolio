import { useEffect } from "react";

// A small, harmless flourish for anyone who opens devtools — mostly other
// developers or a technical client checking out a "Development Partner".
// Costs nothing, never seen by a regular visitor.
export function useConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c👀 Poking around the code?\n%cI like that. Let's build something together.\n%c→ yassin5amr55@gmail.com",
      "font-size:20px; font-weight:800; color:#2b4fe0; font-family: sans-serif;",
      "font-size:13px; color:#55503f; font-family: sans-serif;",
      "font-size:13px; font-weight:700; color:#2b4fe0; font-family: sans-serif;"
    );
  }, []);
}
