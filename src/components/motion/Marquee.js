import React, { useEffect, useRef, useState } from "react";
import { m, useAnimationFrame, useMotionValue, useReducedMotion, useScroll } from "motion/react";

// An endless ticker that drifts slowly and also slides with page scroll, so
// it feels tied to your movement. The list is rendered twice and the offset
// wraps at one row's width, so the loop is seamless in either direction.
// Hovering pauses the drift; reduced motion shows a static, wrapping list.
function Marquee({ items, label, speed = 28, scrollFactor = 0.35 }) {
  const reduce = useReducedMotion();
  const rowRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(0);
  const paused = useRef(false);
  const drift = useRef(0);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const measure = () => setRowWidth(row.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !rowWidth) return;
    if (!paused.current) drift.current += (speed * delta) / 1000;
    const offset = (drift.current + scrollY.get() * scrollFactor) % rowWidth;
    x.set(-offset);
  });

  const row = (hidden, ref) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined} ref={ref}>
      {items.map((item) => (
        <li key={item} className="marquee-item">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee ${reduce ? "is-static" : ""}`}
      role="region"
      aria-label={label}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <m.div className="marquee-track" style={{ x }}>
        {row(false, rowRef)}
        {!reduce && row(true)}
      </m.div>
    </div>
  );
}

export default Marquee;
