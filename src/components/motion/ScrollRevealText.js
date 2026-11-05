import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

function Word({ children, progress, range, em }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const El = em ? m.em : m.span;
  return (
    <>
      <El className="reveal-word" style={{ opacity }} aria-hidden="true">
        {children}
      </El>{" "}
    </>
  );
}

/**
 * Text that "lights up" word by word as it scrolls through the viewport.
 * @param {{ segments: {text: string, em?: boolean}[], as?: string, className?: string, id?: string }} props
 */
function ScrollRevealText({ segments, as: Tag = "h2", className = "", id }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });

  const words = segments.flatMap((s) => s.text.split(" ").map((w) => ({ w, em: s.em })));
  const label = segments.map((s) => s.text).join(" ");

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {segments.map((s, i) => (s.em ? <em key={i}>{s.text}</em> : <React.Fragment key={i}>{s.text} </React.Fragment>))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} id={id} className={className} aria-label={label}>
      {words.map(({ w, em }, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} em={em}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

export default ScrollRevealText;
