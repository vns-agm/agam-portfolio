import React, { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

// Wraps an element so it leans toward the cursor while hovered and springs
// back on leave. Mouse/trackpad only; touch and reduced motion get no effect.
function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span ref={ref} className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.span>
  );
}

export default Magnetic;
