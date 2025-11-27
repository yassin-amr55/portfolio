// Loading Screen
function preloadImages(callback) {
  // Only check images that are not lazy-loaded
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
    } else {
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) callback();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        imagesLoaded++;
        if (imagesLoaded === images.length) callback();
      };
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Prevent scrolling while loading
  document.body.classList.add("loading");

  preloadImages(() => {
    const loadingScreen = document.querySelector(".loading-screen");
    const behindScreen = document.querySelector(".behind-screen");

    setTimeout(() => {
      loadingScreen.classList.add("done");
    }, 700);

    setTimeout(() => {
      behindScreen.classList.add("done");

      // Allow scrolling after loading
      document.body.classList.remove("loading");

      // Initialize scroll animation observer after the loading screen is gone
      const elements = document.querySelectorAll(".scroll-content"); // Select the elements to observe
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active"); // Add 'active' class
              observer.unobserve(entry.target); // Optional: stop observing after triggering
            }
          });
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
      );

      // Attach the observer to each element
      elements.forEach((element) => observer.observe(element));
    }, 1000); // Matches the behindScreen animation timing
  });
});