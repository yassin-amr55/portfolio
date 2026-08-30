# Yassin Amr — Portfolio (React)

A React + Vite port of the original vanilla HTML/CSS/JS portfolio. This is a
faithful conversion — same layout, visual identity, animations, and
responsive behavior as the original — not a redesign. The original
vanilla project (in the parent folder) is untouched and still works
independently.

## Structure

- `src/App.jsx` — top-level composition + section refs.
- `src/components/` — one component per section (`Home`, `About`,
  `Services`, `Projects` + `ProjectCard`, `Contact`), plus `Header`,
  `ThemeControls` (settings/light-mode buttons + panel), `Cursor`, and
  `LoadingScreen`.
- `src/hooks/` — the original's imperative DOM scripts, ported to React
  hooks (header scroll-transition, section-position math, scroll-triggered
  reveals, the typing effect, the character-by-character bio reveal, the
  loading-screen image preloader, theme/localStorage, the projects
  horizontal scroller).
- `src/data/` — `paths.js` (About → Path timeline) and `projects.js`
  (Projects section), as ES modules.
- `src/styles/` — the original CSS files, copied over largely as-is.
- `public/` — icons, images, and project screenshots, plus the standalone
  "Pixel Animation Studio" project page (kept as a static HTML page, since
  it's a separate embedded mini-app linked from one project card).

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```
