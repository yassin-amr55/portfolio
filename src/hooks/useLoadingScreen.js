import { useEffect, useState } from "react";

// Ports scripts/loadingScreen.js: block scrolling until every eagerly-loaded
// <img> on the page has finished loading (or errored), then reveal the page
// through the same two staged CSS transitions (loading-screen slides away at
// 700ms, the accent-color "behind" curtain follows at 1000ms), and finally
// wire up the IntersectionObserver for `.scroll-content` reveal elements.
export function useLoadingScreen() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [behindDone, setBehindDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");
    let cancelled = false;
    const timers = [];

    function preloadImages(callback) {
      const images = document.querySelectorAll("img:not([loading='lazy'])");
      let imagesLoaded = 0;

      if (images.length === 0) {
        callback();
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          imagesLoaded++;
          if (imagesLoaded === images.length) callback();
          return;
        }
        function onSettled() {
          imagesLoaded++;
          if (imagesLoaded === images.length) callback();
        }
        img.addEventListener("load", onSettled, { once: true });
        img.addEventListener("error", onSettled, { once: true });
      });
    }

    preloadImages(() => {
      if (cancelled) return;

      timers.push(setTimeout(() => setLoadingDone(true), 700));

      timers.push(
        setTimeout(() => {
          setBehindDone(true);
          document.body.classList.remove("loading");

          const elements = document.querySelectorAll(".scroll-content");
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("active");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.3 }
          );
          elements.forEach((el) => observer.observe(el));
        }, 1000)
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.body.classList.remove("loading");
    };
  }, []);

  return { loadingDone, behindDone };
}
