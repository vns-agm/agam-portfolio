import React, { useLayoutEffect, useRef, useState } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowDown } from "react-icons/fi";

// Pinned hero that dives through the "o" of the headline. The hero layer is
// scaled around the ring's centre (so the ring stays put while everything else
// rushes past), and the next panel is revealed through the ring's hole with an
// ellipse clip-path that grows in step with the scale. When the hole covers the
// viewport, the next panel *is* the page, and the pin releases.

// Runs at every screen size; only a "reduce motion" system setting turns it off.
function useZoomEnabled() {
  return !useReducedMotion();
}

// Sum offsetLeft/Top up to `root`. Offsets ignore CSS transforms, so this gives
// the ring's resting position even when the layer is mid-zoom.
function offsetWithin(el, root) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

const smooth = (t) => t * t * (3 - 2 * t);

function HeroZoom({ hero, next, labelledBy }) {
  const enabled = useZoomEnabled();
  const sectionRef = useRef(null);
  const layerRef = useRef(null);
  const portalRef = useRef(null);
  const [geo, setGeo] = useState(null);
  const [opened, setOpened] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const measure = () => {
      const layer = layerRef.current;
      const ring = portalRef.current;
      if (!layer || !ring) return;
      const { x, y } = offsetWithin(ring, layer);
      const cx = x + ring.offsetWidth / 2;
      const cy = y + ring.offsetHeight / 2;
      const rx = ring.clientWidth / 2;
      const ry = ring.clientHeight / 2;
      const w = layer.offsetWidth;
      const h = window.innerHeight;
      const cover = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy));
      setGeo({ cx, cy, rx, ry, max: (cover / Math.min(rx, ry)) * 1.08 });
    };
    measure();
    // Fonts swap in after first paint and change the ring's position.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enabled]);

  // 0 → 0.1: hold, copy fades. 0.1 → 0.82: the dive. 0.82 → 1: next panel rests.
  const zoom = useTransform(scrollYProgress, [0.1, 0.82], [0, 1], { clamp: true });
  const scale = useTransform(zoom, (z) => (geo ? Math.exp(Math.log(geo.max) * smooth(z)) : 1));
  const clipPath = useTransform(scale, (s) =>
    geo ? `ellipse(${geo.rx * s}px ${geo.ry * s}px at ${geo.cx}px ${geo.cy}px)` : "ellipse(0px 0px at 50% 50%)"
  );
  const fade = useTransform(scrollYProgress, [0.02, 0.16], [1, 0]);
  const drift = useTransform(scrollYProgress, [0.02, 0.16], [0, 40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const nextOpacity = useTransform(zoom, [0.45, 0.9], [0, 1]);
  const nextScale = useTransform(zoom, [0.3, 1], [0.72, 1]);
  const ringGlow = useTransform(zoom, [0, 0.15], [0, 1]);

  useMotionValueEvent(zoom, "change", (z) => setOpened(z > 0.8));

  if (!enabled) {
    return (
      <>
        <section className="hero" aria-labelledby={labelledBy}>
          {hero({ portalRef, fade: 1, drift: 0 })}
        </section>
        <section className="next-panel next-panel-static">{next(undefined)}</section>
      </>
    );
  }

  return (
    <section className="hero-zoom" ref={sectionRef} aria-labelledby={labelledBy}>
      <div className="hero-zoom-stage">
        <m.div
          className="hero hero-zoom-layer"
          ref={layerRef}
          style={{
            scale,
            transformOrigin: geo ? `${geo.cx}px ${geo.cy}px` : "50% 50%",
            "--ring-glow": ringGlow,
          }}
        >
          {hero({ portalRef, fade, drift })}
        </m.div>

        <m.div className="hero-portal" style={{ clipPath }} aria-hidden={!opened}>
          <m.div className="next-panel" style={{ opacity: nextOpacity, scale: nextScale }}>
            {next(opened)}
          </m.div>
        </m.div>

        <m.div className="hero-zoom-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          <span className="mono">Scroll to zoom in</span>
          <FiArrowDown />
        </m.div>
      </div>
    </section>
  );
}

export default HeroZoom;
