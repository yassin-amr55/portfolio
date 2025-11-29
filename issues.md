# Portfolio Website Issues & Fixes

## ❌ CRITICAL ISSUES

### Missing Essential Meta Tags
- [ ] Add `charset` declaration
- [ ] Add `viewport` meta tag
- [ ] Add meta description for SEO
- [ ] Add meta keywords

### Missing Alt Text on Images
- [x] Add alt text to profile image (`yassin.png`)
- [x] Add alt text to all project images
- [x] Add alt text to service icons
- [x] Add alt text to signature logo

### Accessibility Issues
- [ ] Add `lang` attribute on `<html>` tag
- [ ] Add ARIA labels on navigation buttons
- [ ] Add semantic HTML (`<main>`, `<nav>`, proper heading hierarchy)
- [ ] Change multiple `<h1>` tags in services section to `<h2>`

### SEO Problems
- [ ] Replace empty content placeholders with actual text for search engines
- [ ] Add structured data (JSON-LD)
- [ ] Add canonical URL
- [ ] Improve Open Graph tags

---

## ⚠️ MAJOR ISSUES

### Security Vulnerabilities
- [ ] Add `rel="noopener noreferrer"` to external links
- [ ] Replace inline onclick handlers with event listeners

### Performance Issues
- [ ] Add lazy loading to project images
- [ ] Optimize image loading strategy
- [ ] Compress/optimize project images
- [ ] Consider combining/minifying CSS files

### Code Quality
- [x] Fix typo: "whome" → "whom" in paths.js
- [x] Fix typo: "webisite" → "website" in paths.js
- [x] Fix typo: "web-devolpment" → "web-development" in paths.js
- [x] Fix typo: "coarse" → "course" in paths.js
- [x] Remove console.log statements from production code (generator.js)

### HTML Structure Issues
- [ ] Fix buttons inside anchor tags (invalid HTML)
- [ ] Remove inline styles, use external CSS
- [ ] Add proper document structure (`<main>`, `<article>`, etc.)

---

## ⚙️ MODERATE ISSUES

### JavaScript Issues
- [ ] Fix `experience` variable dependency between scrollEffects.js and generator.js
- [ ] Document script load order requirements
- [ ] Add error handling in image preload function

### CSS Issues
- [ ] Replace hardcoded scroll positions (2930px, 1450px, 2450px) with dynamic calculations
- [ ] Resolve duplicate class names (`.icon` used for multiple purposes)
- [ ] Add fallback fonts
- [ ] Standardize naming conventions

### Mobile Responsiveness
- [ ] Replace fixed pixel values with relative units
- [ ] Fix header overlap issues on mobile
- [ ] Add testing for tablets/medium screens

### Content Issues
- [ ] Update future project dates (June 2025, August 2025, October 2025)
- [ ] Fix broken text "I'm a Wel. I'm a" visible to search engines
- [ ] Verify age calculation is working correctly

---

## 📝 MINOR ISSUES

### File Organization
- [ ] Remove unused files (challenges.html, porfolios.txt, reserve.txt, savedcode.txt, thingsToDo.txt)
- [ ] Standardize file naming convention

### Missing Features
- [ ] Create 404 page
- [ ] Add loading states for form submission
- [ ] Add form validation feedback
- [ ] Add success message after contact form submit

### Browser Compatibility
- [ ] Add vendor prefixes for older browsers
- [ ] Add polyfills for older browsers
- [ ] Test on multiple browsers

---

## ✅ WORKING WELL

- Clean, modern design
- Smooth animations
- Custom cursor effect
- Theme switching with localStorage
- Dynamic age calculation
- Responsive layout (mostly)
- Loading screen
- Contact form integration

---

**Total Issues: 50+ specific items across 15 categories**
