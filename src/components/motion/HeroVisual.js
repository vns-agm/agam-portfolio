import React, { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Screenshot from "../ui/Screenshot";

const SPRING = { stiffness: 120, damping: 20, mass: 0.6 };
const EASE = [0.22, 1, 0.36, 1];

// Sum two motion values (pointer offset + scroll offset) into one.
function useSum(a, b) {
  return useTransform([a, b], ([x, y]) => x + y);
}

/**
 * Two layered screenshots that tilt in 3D toward the pointer, sit at different
 * depths (the front one moves more), and drift apart as the page scrolls.
 */
function HeroVisual({ back, front, caption }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Pointer position within the visual, -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), SPRING);
  const frontPX = useSpring(useTransform(px, [-0.5, 0.5], [-18, 18]), SPRING);
  const frontPY = useSpring(useTransform(py, [-0.5, 0.5], [-14, 14]), SPRING);
  const backPX = useSpring(useTransform(px, [-0.5, 0.5], [8, -8]), SPRING);
  const backPY = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), SPRING);

  // Scroll: the front shot rises faster than the back one (depth parallax).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frontSY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const backSY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -35]);
  // The whole composition eases toward the viewer as you scroll past.
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);

  const frontY = useSum(frontPY, frontSY);
  const backY = useSum(backPY, backSY);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <m.div
      ref={ref}
      className="hero-visual"
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
    >
      <m.div className="hero-tilt" style={{ rotateX, rotateY, scale: scrollScale }}>
        <m.div className="hero-shot hero-shot-back" style={{ x: backPX, y: backY }}>
          <Screenshot src={back} alt="" ratio="4 / 3" eager />
        </m.div>
        <m.div className="hero-shot hero-shot-front" style={{ x: frontPX, y: frontY }}>
          <Screenshot src={front} alt="" ratio="16 / 11" eager />
        </m.div>
      </m.div>
      <p className="hero-caption">{caption}</p>
    </m.div>
  );
}

export default HeroVisual;
