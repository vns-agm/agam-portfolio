import React, { useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// A "fly through" hero: cards spread around a vanishing point and travel toward
// the camera as you scroll. Adapted from 21st.dev's perspective-tunnel-hero.
//
// Differences from the original:
//  - Progress comes from normal page scroll (a tall section with a sticky stage)
//    instead of hijacking the mouse wheel, so the page keeps scrolling and it
//    works with touch, trackpads and the keyboard.
//  - Plain JS + the site's CSS tokens (pages.css) rather than Tailwind/TypeScript.
//  - Cards are decorative (aria-hidden, not focusable): the same items are
//    expected to be listed accessibly elsewhere on the page.
//  - Reduced motion renders only the static header, with no tunnel.

const SPRING = { stiffness: 60, damping: 25, mass: 0.5 };

function useStage() {
  const [stage, setStage] = useState({ width: 1440, height: 900, isMobile: false });
  useEffect(() => {
    const update = () =>
      setStage({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return stage;
}

// Gentle camera pan toward the pointer, mouse/trackpad only.
function useCameraParallax(enabled) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    if (!enabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

// Golden-angle placement keeps cards evenly spread around the centre.
function layout(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = i * 137.5 * (Math.PI / 180);
    return {
      cos: Math.cos(angle),
      sin: Math.sin(angle),
      radiusX: 0.28 + (i % 3) * 0.08,
      radiusY: 0.26 + (i % 2) * 0.09,
      rotateZ: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4) * 1.5),
    };
  });
}

function TunnelCard({ item, place, index, total, progress, pointer, stage }) {
  const span = 0.55;
  const start = (index / total) * (1 - span);
  const local = useTransform(progress, [start, start + span], [0, 1]);

  const z = useTransform(local, [0, 1], stage.isMobile ? [-1200, 350] : [-1700, 500]);
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const width = stage.isMobile
    ? Math.max(170, Math.min(230, stage.width * 0.5))
    : Math.max(240, Math.min(340, stage.width * 0.22));
  const baseX = place.cos * stage.width * place.radiusX;
  const baseY = place.sin * stage.height * place.radiusY;
  const pan = stage.isMobile ? 20 : 45;

  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]) => {
    const ox = baseX - px * pan;
    const oy = baseY - py * pan;
    return `translate3d(calc(-50% + ${ox}px), calc(-50% + ${oy}px), ${cz}px) rotateZ(${place.rotateZ}deg)`;
  });

  const Card = item.href ? "a" : "div";

  return (
    <m.div className="tunnel-card" style={{ width, transform, opacity, zIndex: index + 1 }}>
      <Card
        className="tunnel-card-inner"
        {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer", tabIndex: -1 } : {})}
      >
        <img src={item.image} alt="" draggable={false} decoding="async" />
        <span className="tunnel-card-caption">
          <span>{item.title}</span>
          {item.meta && <small>{item.meta}</small>}
        </span>
      </Card>
    </m.div>
  );
}

/**
 * @param {{ items: {title:string, image:string, href?:string, meta?:string}[],
 *           eyebrow?: React.ReactNode, title: React.ReactNode, lead?: React.ReactNode,
 *           prompt?: string }} props
 */
function PerspectiveTunnel({ items, eyebrow, title, lead, prompt = "Scroll to fly through" }) {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const stage = useStage();
  const pointer = useCameraParallax(!reduce);

  // 0 → 1 while the section scrolls past; the stage is sticky inside it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

  const titleScale = useTransform(progress, [0, 0.5, 1], [1, 1.08, 1.3]);
  const titleOpacity = useTransform(progress, [0, 0.75, 0.95], [1, 1, 0]);
  const promptOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  const header = (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="display">{title}</h1>
      {lead && <p className="lead muted tunnel-lead">{lead}</p>}
    </>
  );

  if (reduce) {
    return (
      <header className="tunnel tunnel-static">
        <div className="container tunnel-copy">{header}</div>
      </header>
    );
  }

  const places = layout(items.length);

  return (
    // LazyMotion + `m`: only Motion's DOM features are bundled (shared with the home page).
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className="tunnel" aria-label="Projects overview">
        <div className="tunnel-stage" style={{ perspective: stage.isMobile ? "900px" : "1200px" }}>
          <div className="tunnel-grid" aria-hidden="true" />
          <div className="tunnel-ring tunnel-ring-inner" aria-hidden="true" />
          <div className="tunnel-ring tunnel-ring-outer" aria-hidden="true" />

          <m.div className="tunnel-copy" style={{ scale: titleScale, opacity: titleOpacity }}>
            {header}
          </m.div>

          <m.div className="tunnel-prompt" style={{ opacity: promptOpacity }} aria-hidden="true">
            <span>{prompt}</span>
            <span className="tunnel-prompt-line" />
          </m.div>

          <div className="tunnel-space" aria-hidden="true">
            {items.map((item, i) => (
              <TunnelCard
                key={item.title}
                item={item}
                place={places[i]}
                index={i}
                total={items.length}
                progress={progress}
                pointer={pointer}
                stage={stage}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default PerspectiveTunnel;
