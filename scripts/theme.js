//...
const root = document.documentElement;
document.addEventListener("DOMContentLoaded", () => {
  const lightMode = document.querySelector(".lightmode");
  const icons = document.querySelectorAll(".icon");
  const signimg = document.querySelector(".signimg");

  // Load light mode state from localStorage
  const isLightModeActive = localStorage.getItem("lightMode") === "true";

  if (isLightModeActive) {
    activateLightMode();
  }

  lightMode.addEventListener("click", () => {
    root.classList.toggle("active");
    icons.forEach((icon) => {
      icon.classList.toggle("active");
    });
    signimg.classList.toggle("active");

    if (root.classList.contains("active")) {
      lightMode.innerHTML = `<img src="icons/moon.png" class="icon active" style="filter: invert(1) brightness(2);">`;
      localStorage.setItem("lightMode", "true"); // Save state
    } else {
      lightMode.innerHTML = `<img src="icons/sun.png" class="icon" style="filter: invert(0) brightness(0.8);">`;
      localStorage.setItem("lightMode", "false"); // Save state
    }
  });

  function activateLightMode() {
    root.classList.add("active");
    icons.forEach((icon) => {
      icon.classList.add("active");
    });
    signimg.classList.add("active");
    lightMode.innerHTML = `<img src="icons/moon.png" class="icon active" style="filter: invert(1) brightness(2);">`;
  }
});

function themeColor(color) {
  root.style.setProperty("--accent-color", `${color}`);
  localStorage.setItem("themeColor", color);
}
document.addEventListener("DOMContentLoaded", () => {
  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    root.style.setProperty("--accent-color", savedColor);
  }
});

// Select buttons and panel
const settingsButton = document.querySelector(".settings");
const lightModeButton = document.querySelector(".lightmode");
const settingsPanel = document.querySelector(".settings-panel");
const upperbuttons = document.querySelectorAll(".upperbutton");

// Toggle panel visibility on settings button click
settingsButton.addEventListener("click", () => {
  settingsPanel.classList.toggle("active");
  upperbuttons.forEach((upperbutton) => {
    upperbutton.classList.toggle("push");
  });
});