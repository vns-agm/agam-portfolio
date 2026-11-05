import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiCommand } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { OPEN_PALETTE_EVENT, PALETTE_SHORTCUT } from "./CommandPalette";
import { NAV_LINKS, PERSON, SOCIALS } from "../data/site";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape; lock page scroll while open.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="container site-nav-inner">
          <Link to="/" className="brand" aria-label={`${PERSON.name}, home`}>
            <span className="brand-mark" aria-hidden="true">AS</span>
            <span>
              <span className="brand-name">{PERSON.name}</span>
              <span className="brand-role">Full-stack engineer</span>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} end={to === "/"} className="nav-link">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-button palette-button"
              onClick={openPalette}
              aria-label="Open quick navigation"
              title={`Quick navigation (${PALETTE_SHORTCUT})`}
            >
              <FiCommand aria-hidden="true" />
              <kbd className="key">{PALETTE_SHORTCUT}</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="icon-button menu-button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className="mobile-link"
              tabIndex={open ? 0 : -1}
            >
              {label}
              <small>0{i + 1}</small>
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          {SOCIALS.slice(0, 4).map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default NavBar;
