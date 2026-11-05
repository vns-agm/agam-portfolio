import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Media that wipes open (clip-path) the first time it enters the viewport, then
// drifts slightly against the scroll so it floats apart from the text beside it.
function ParallaxReveal({ children, distance = 28 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);
  // Grows into place as it arrives, Apple product-shot style.
  const scale = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [0.88, 1]);

  return (
    <m.div
      ref={ref}
      className="parallax-reveal"
      style={{ y, scale }}
      initial={reduce ? false : { clipPath: "inset(10% 10% 10% 10% round 18px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

export default ParallaxReveal;
