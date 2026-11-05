import React from "react";
import { toggleTheme, useTheme } from "../theme";

// Sun/moon switch: the sun's rays retract into a crescent, and the new theme
// spreads out from the button as a circle (see theme.js).
function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === "dark";

  const onClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className={`icon-button theme-toggle ${isDark ? "is-dark" : "is-light"}`}
      onClick={onClick}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <mask id="theme-toggle-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle className="theme-toggle-cut" cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle className="theme-toggle-core" cx="12" cy="12" r="5" mask="url(#theme-toggle-mask)" fill="currentColor" />
        <g className="theme-toggle-rays" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  );
}

export default ThemeToggle;
