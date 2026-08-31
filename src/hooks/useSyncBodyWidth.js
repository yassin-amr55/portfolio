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
//
// window.innerWidth can also *settle* to a different value shortly after
// first paint without ever firing a "resize" event -- mobile browsers do
// this while the address bar collapses/expands or the viewport meta
// finishes reflowing. A single mount-time read plus a resize listener
// missed that. Re-checking on a few short delays, and on visualViewport's
// own resize event (which fires for cases window's doesn't), catches it.
export function useSyncBodyWidth() {
  useLayoutEffect(() => {
    function sync() {
      const width = window.innerWidth;
      if (document.body.style.width !== `${width}px`) {
        document.body.style.width = `${width}px`;
      }
    }

    sync();
    const settleTimers = [100, 300, 600, 1200].map((delay) => setTimeout(sync, delay));

    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);

    return () => {
      settleTimers.forEach(clearTimeout);
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
    };
  }, []);
}
