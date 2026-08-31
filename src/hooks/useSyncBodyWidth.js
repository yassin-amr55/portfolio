import { useLayoutEffect } from "react";

// position:fixed elements (header, upperbuttons, settings panel, cursor)
// resolve their percentage widths against window.innerWidth. body's own
// width -- whether left to "auto" or forced via 100vw/100% -- has proven
// unreliable across browsers/devices, disagreeing with window.innerWidth
// by anywhere from ~15px to 170+px in testing. Since every section is
// position:absolute using body as its containing block, that mismatch
// squashed all of them narrower than the header. Setting body's width
// explicitly, in JS, from window.innerWidth keeps both permanently in
// agreement regardless of whatever unit-resolution quirk the browser has.
export function useSyncBodyWidth() {
  useLayoutEffect(() => {
    function sync() {
      document.body.style.width = `${window.innerWidth}px`;
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
}
