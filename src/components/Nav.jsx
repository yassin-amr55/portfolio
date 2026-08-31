import { useState } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Nav({ isDark, onToggleTheme }) {
  const { activeId, scrolled } = useScrollSpy(LINKS.map((l) => l.id));
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLinkClick(id) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className={cx("nav", scrolled && "nav-scrolled")}>
      <div className="container nav-row">
        <a
          href="#home"
          className="brandmark"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("home");
          }}
        >
          <img src="/icons/signature.png" alt="Yassin Amr" className="brandmark-img" />
        </a>

        <ul className="navlinks">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cx(activeId === link.id && "current")}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={cx("menu-toggle", menuOpen && "is-open")}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={cx("mobile-menu", menuOpen && "is-open")}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={cx(activeId === link.id && "current")}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
