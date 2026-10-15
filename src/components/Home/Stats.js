import React, { useEffect, useRef, useState } from "react";

// Counts up from 0 once the number scrolls into view.
function CountUp({ to, suffix = "", decimals = 0, duration = 1400 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setValue(to);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        setValue(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Career started January 2022. Rounded down to the nearest half year (e.g. 4.5).
const yearsExp =
  Math.floor((((new Date().getFullYear() - 2022) * 12 + new Date().getMonth()) / 12) * 2) / 2;

const stats = [
  { to: yearsExp, suffix: "+", decimals: yearsExp % 1 ? 1 : 0, label: "Years of experience" },
  { to: 2, label: "Companies" },
  { to: 15, suffix: "+", label: "Projects shipped" },
  { to: 1525, label: "FIDE rating" },
];

function Stats() {
  return (
    <div className="hero-stats hero-enter" style={{ "--d": "450ms" }}>
      {stats.map((s) => (
        <div className="hero-stat" key={s.label}>
          <strong className="purple">
            <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
          </strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export { yearsExp };
export default Stats;
