import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts from 0 to `to` the first time it scrolls into view. A hidden copy of
// the final value reserves the width, so nothing shifts while digits change.
// `play`, when given, overrides the in-view trigger (e.g. content revealed by a clip-path).
function CountUp({ to, decimals = 0, suffix = "", duration = 1.8, play }) {
  const ref = useRef(null);
  // Start as soon as any part shows, so the row never sits at "0" on first view.
  const seen = useInView(ref, { once: true });
  const inView = play === undefined ? seen : play;
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const final = `${to.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setValue(to);
      return undefined;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className="count" aria-label={final}>
      <span className="count-ghost" aria-hidden="true">
        {final}
      </span>
      <span className="count-live" aria-hidden="true">
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

export default CountUp;
