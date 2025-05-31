// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    `top: ${e.pageY - window.scrollY}px; left: ${e.pageX}px;`
  );
});
document.addEventListener("click", () => {
  cursor.classList.add("active");
  setTimeout(() => {
    cursor.classList.remove("active");
  }, 200);
});

// Typing Effect
const highliteTwo = document.querySelector(".highlite-two");
const words = [
  "Web Developer",
  "Front-end Developer",
  "Web Designer",
  "FreeLancer",
];
let currentWordIndex = 0;
let currentText = words[currentWordIndex];
let isDeleting = false;
let charIndex = 0;
let isPaused = false;

function typeEffect() {
  if (isPaused) return; // Exit early if paused

  if (isDeleting) {
    // Decrease letters
    charIndex--;
    highliteTwo.textContent = currentText.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      currentText = words[currentWordIndex];
    }
  } else {
    // Increase letters
    charIndex++;
    highliteTwo.textContent = currentText.slice(0, charIndex);
    if (charIndex === currentText.length) {
      isPaused = true; // Pause after writing the word
      setTimeout(() => {
        isPaused = false; // Reset pause after delay
        isDeleting = true; // Start deleting
        typeEffect(); // Resume typing
      }, 2000); // Pause for 2 seconds
      return;
    }
  }

  const typingSpeed = isDeleting ? 100 : 200; // Faster when deleting
  setTimeout(typeEffect, typingSpeed);
}
typeEffect();
// Project Item Hover Effect
const projectItems = document.querySelectorAll(".projects-item");

projectItems.forEach(item => {
  const projectWindow = item.querySelector(".project-window");
  item.addEventListener("mouseenter", () => {
    projectWindow.classList.add("active");
  });
  item.addEventListener("mouseleave", () => {
    projectWindow.classList.remove("active");
  });
});