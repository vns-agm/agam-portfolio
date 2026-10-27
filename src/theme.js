import { useEffect, useState } from "react";

// Theme lives on <html data-theme>. public/index.html sets it before first paint;
// this module switches it at runtime and keeps React components in sync.

const EVENT = "themechange";

export function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f6f2fb" : "#140f23");
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* storage blocked: the choice just won't persist */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

// Switch themes with a circular "ink" reveal spreading from (x, y), using the
// View Transitions API where available. Falls back to an instant switch.
export function toggleTheme(origin) {
  const next = getTheme() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    applyTheme(next);
    return;
  }
  if (!document.startViewTransition) {
    // No View Transitions (e.g. older Safari/Firefox): cross-fade colours instead.
    const root = document.documentElement;
    root.classList.add("theme-fade");
    applyTheme(next);
    setTimeout(() => root.classList.remove("theme-fade"), 400);
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 40;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
}

export function useTheme() {
  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return theme;
}
