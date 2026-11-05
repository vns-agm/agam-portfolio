import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

// One statement on the pinned stage. Each owns an equal slice of the scroll:
// it rises and sharpens in, holds, then lifts away as the next arrives.
function Statement({ progress, index, count, children }) {
  const slice = 1 / count;
  const start = index * slice;
  const end = start + slice;
  const first = index === 0;
  const last = index === count - 1;

  // The first is already visible when the stage pins; the last stays at the end.
  const opacity = useTransform(
    progress,
    [start, start + slice * 0.3, end - slice * 0.3, end],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const y = useTransform(progress, [start, start + slice * 0.3, end - slice * 0.3, end], [
    first ? 0 : 60,
    0,
    0,
    last ? 0 : -60,
  ]);
  const scale = useTransform(progress, [start, start + slice * 0.3], [first ? 1 : 0.94, 1]);
  const blur = useTransform(
    progress,
    [start, start + slice * 0.3, end - slice * 0.25, end],
    [first ? 0 : 8, 0, 0, last ? 0 : 8]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <m.p className="statement" style={{ opacity, y, scale, filter }}>
      {children}
    </m.p>
  );
}

/**
 * Apple-style pinned sequence: the stage sticks to the viewport while a few
 * large statements cross-fade through it as you scroll. Reduced motion shows
 * them as a simple stacked list.
 *
 * @param {{ eyebrow?: string, statements: React.ReactNode[] }} props
 */
function ScrollStatements({ eyebrow, statements }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section className="statements statements-static" aria-label={eyebrow}>
        <div className="container">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {statements.map((s, i) => (
            <p className="statement" key={i}>
              {s}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="statements"
      style={{ height: `${statements.length * 90 + 60}vh` }}
      aria-label={eyebrow}
    >
      <div className="statements-stage">
        {eyebrow && <span className="eyebrow statements-eyebrow">{eyebrow}</span>}
        <div className="statements-slot container">
          {statements.map((s, i) => (
            <Statement key={i} progress={scrollYProgress} index={i} count={statements.length}>
              {s}
            </Statement>
          ))}
        </div>
        <div className="statements-progress" aria-hidden="true">
          <m.span style={{ width: bar }} />
        </div>
      </div>
    </section>
  );
}

export default ScrollStatements;
