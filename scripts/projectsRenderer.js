// Builds the Projects section (desktop diagonal rows + mobile staggered
// columns) from data/projects.js, wires up the hover/tap reveal and the
// horizontal-scroll arrows. Runs synchronously (same pattern as
// generator.js) so the loading screen's image-preload check already sees
// the injected <img> tags.

function isHoverCapable() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function createProjectCard(project) {
  const item = document.createElement("div");
  item.className = "projects-item";

  const win = document.createElement("div");
  win.className = "project-window";

  const name = document.createElement("p");
  name.className = "web-name";
  name.textContent = project.title;

  const disc = document.createElement("p");
  disc.className = "web-disc";
  disc.textContent = project.disc;

  win.appendChild(name);
  win.appendChild(disc);

  if (project.studio) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "web-button studio-button";
    btn.textContent = project.linkText;
    win.appendChild(btn);
  } else {
    const a = document.createElement("a");
    a.href = project.link;
    if (project.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "web-button";
    btn.textContent = project.linkText;
    a.appendChild(btn);
    win.appendChild(a);
  }

  const img = document.createElement("img");
  img.src = project.img;
  img.alt = project.alt;

  const date = document.createElement("p");
  date.className = "project-date";
  date.textContent = project.date;

  item.appendChild(win);
  item.appendChild(img);
  item.appendChild(date);

  return item;
}

function wireCardInteraction(item) {
  const win = item.querySelector(".project-window");

  item.addEventListener("mouseenter", () => {
    if (isHoverCapable()) win.classList.add("active");
  });
  item.addEventListener("mouseleave", () => {
    if (isHoverCapable()) win.classList.remove("active");
  });

  item.addEventListener("click", (e) => {
    if (isHoverCapable()) return;
    if (e.target.closest("a, button")) return; // let links / the studio button navigate
    const willOpen = !win.classList.contains("active");
    document.querySelectorAll(".project-window.active").forEach((w) => w.classList.remove("active"));
    if (willOpen) win.classList.add("active");
  });
}

// Tapping anywhere outside a project card closes whichever card is open
document.addEventListener("click", (e) => {
  if (isHoverCapable()) return;
  if (!e.target.closest(".projects-item")) {
    document.querySelectorAll(".project-window.active").forEach((w) => w.classList.remove("active"));
  }
});

// --- Desktop: diagonal / staggered 2-row layout ---
function renderDesktopProjects() {
  const rowTop = document.querySelector(".projects-row-top");
  const rowBottom = document.querySelector(".projects-row-bottom");
  if (!rowTop || !rowBottom) return;

  const splitAt = Math.ceil(projects.length / 2);

  projects.forEach((project, index) => {
    const card = createProjectCard(project);
    wireCardInteraction(card);
    (index < splitAt ? rowTop : rowBottom).appendChild(card);
  });
}

// --- Mobile: staggered columns, pattern 3 / 2 / 3 / 2 ... ---
function renderMobileProjects() {
  const track = document.querySelector(".projects-mobile-track");
  if (!track) return;

  let i = 0;
  let colIndex = 0;
  while (i < projects.length) {
    const size = colIndex % 2 === 0 ? 3 : 2;
    const col = document.createElement("div");
    col.className = "projects-mobile-col" + (colIndex % 2 === 1 ? " col-short" : "");

    const slice = projects.slice(i, i + size);
    slice.forEach((project) => {
      const card = createProjectCard(project);
      wireCardInteraction(card);
      col.appendChild(card);
    });

    track.appendChild(col);
    i += size;
    colIndex++;
  }
}

// --- Generic smooth horizontal scroller with self-hiding arrows ---
function setupScroller(scrollEl, prevBtn, nextBtn) {
  if (!scrollEl) return;

  function update() {
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    const hasOverflow = maxScroll > 2;
    const atStart = scrollEl.scrollLeft <= 2;
    const atEnd = scrollEl.scrollLeft >= maxScroll - 2;

    if (prevBtn) prevBtn.classList.toggle("is-hidden", !hasOverflow || atStart);
    if (nextBtn) nextBtn.classList.toggle("is-hidden", !hasOverflow || atEnd);
  }

  function scrollStep(direction) {
    const amount = scrollEl.clientWidth * 0.8;
    scrollEl.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => scrollStep(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollStep(1));

  let ticking = false;
  scrollEl.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }
  });

  window.addEventListener("resize", update);
  window.addEventListener("load", update);

  // Recheck once every project image has actually finished loading, since
  // scrollWidth can grow after images decode.
  scrollEl.querySelectorAll("img").forEach((img) => {
    if (img.complete) return;
    img.addEventListener("load", update, { once: true });
  });

  update();
}

renderDesktopProjects();
renderMobileProjects();

document.querySelectorAll(".studio-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const project = projects.find((p) => p.studio);
    window.location.assign(project ? project.studioUrl : "projects/animation studio/pixelAnimationStudio.html");
  });
});

setupScroller(
  document.querySelector(".projects-scroll"),
  document.querySelector(".projects-arrow-prev"),
  document.querySelector(".projects-arrow-next")
);
