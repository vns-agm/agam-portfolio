import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

// Scroll-linked entrance: the element eases in as it travels from the bottom
// edge of the viewport to about 60% up, and reverses if you scroll back.
// Variants: "rise" (default), "left" / "right" (slides in with a slight tilt),
// and "zoom" (grows from a smaller card).
const VARIANTS = {
  rise: { y: [90, 0], x: [0, 0], scale: [0.96, 1], rotate: [0, 0] },
  left: { y: [40, 0], x: [-120, 0], scale: [0.94, 1], rotate: [-3, 0] },
  right: { y: [40, 0], x: [120, 0], scale: [0.94, 1], rotate: [3, 0] },
  zoom: { y: [60, 0], x: [0, 0], scale: [0.82, 1], rotate: [0, 0] },
};

function ScrollIn({ as = "div", variant = "rise", className, children, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.6"] });
  const v = VARIANTS[variant] || VARIANTS.rise;
  const range = [0, 1];
  const y = useTransform(scrollYProgress, range, v.y);
  const x = useTransform(scrollYProgress, range, v.x);
  const scale = useTransform(scrollYProgress, range, v.scale);
  const rotate = useTransform(scrollYProgress, range, v.rotate);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [10, 0]);
  const filter = useTransform(blur, (b) => (b > 0.2 ? `blur(${b}px)` : "none"));

  const Tag = m[as] || m.div;
  return (
    <Tag
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, x, scale, rotate, opacity, filter }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default ScrollIn;
