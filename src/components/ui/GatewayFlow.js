import React, { useEffect, useRef } from "react";

// Dotted bezier "flows" stream in from both edges and converge on the centre,
// with a particle travelling along each one. Clicking sends out a ripple that
// pushes the particles aside. Adapted from 21st.dev's gateway-flow.
//
// Differences from the original:
//  - A plain <canvas> in React instead of an iframe that loaded a hidden login
//    page, Tailwind's CDN compiler, GSAP, Iconify and Google Fonts.
//  - Colours come from the site's --ink token, so it follows light/dark theme.
//  - Animation is time-based (same speed at 60 Hz and 120 Hz), pauses when the
//    element is off screen or the tab is hidden, and the DPR transform is set
//    once per resize rather than compounding.
//  - prefers-reduced-motion draws a single still frame.

function hexToRgb(hex) {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

/**
 * @param {{ density?: number, speed?: number, strokeWidth?: number, className?: string,
 *           children?: React.ReactNode, interactive?: boolean }} props
 */
function GatewayFlow({ density = 1, speed = 1, strokeWidth = 1, className = "", children, interactive = true }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let paths = [];
    let ripples = [];
    let colors = { line: "", dot: "" };
    let frame = null;
    let last = performance.now();
    let onScreen = true;

    const readColors = () => {
      const [r, g, b] = hexToRgb(getComputedStyle(wrap).getPropertyValue("--ink") || "#1b1a18");
      colors = { line: `rgba(${r}, ${g}, ${b}, 0.28)`, dot: `rgba(${r}, ${g}, ${b}, 0.72)` };
    };

    const buildPaths = () => {
      // Fewer flows on small screens keeps it calm and cheap.
      const count = Math.max(12, Math.round(80 * density * (width < 640 ? 0.55 : 1)));
      paths = Array.from({ length: count }, (_, i) => ({
        isLeft: i % 2 === 0,
        startN: (i / count) * 1.4 - 0.2, // fraction of height; recomputed on resize
        t: Math.random(),
        speed: (0.09 + Math.random() * 0.12) * speed, // progress per second
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!paths.length) buildPaths();
      if (reduce) draw(0);
    };

    function draw(dt) {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      ripples.forEach((r) => {
        r.radius += 900 * dt;
        r.life -= 0.9 * dt;
      });
      ripples = ripples.filter((r) => r.life > 0);

      ctx.lineWidth = 1.2 * strokeWidth;
      paths.forEach((path) => {
        const y0 = path.startN * height;
        const p0 = { x: path.isLeft ? 0 : width, y: y0 };
        const p1 = { x: path.isLeft ? cx * 0.5 : width - cx * 0.5, y: y0 };
        const p2 = { x: path.isLeft ? cx * 0.8 : width - cx * 0.8, y: cy };
        const p3 = { x: cx, y: cy };

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = colors.line;
        ctx.setLineDash([1, 4]);
        ctx.stroke();

        path.t += path.speed * dt;
        if (path.t > 1) {
          path.t = 0;
          path.startN += (Math.random() - 0.5) * 0.012;
        }

        const pos = bezierPoint(path.t, p0, p1, p2, p3);
        ripples.forEach((r) => {
          const dx = pos.x - r.x;
          const dy = pos.y - r.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (Math.abs(dist - r.radius) < 120) {
            const force = (1 - Math.abs(dist - r.radius) / 120) * r.life;
            pos.x += (dx / dist) * force * 80;
            pos.y += (dy / dist) * force * 80;
          }
        });

        ctx.fillStyle = colors.dot;
        ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);
      });
      ctx.setLineDash([]);
    }

    const loop = (now) => {
      // Clamp so a long pause (tab switch) doesn't fast-forward the flows.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame || !onScreen || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    };

    const onPointerDown = (e) => {
      if (!interactive || reduce) return;
      const rect = wrap.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0, life: 1 });
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? start() : stop();
    });
    io.observe(wrap);

    // Re-colour when the site theme switches.
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    wrap.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, speed, strokeWidth, interactive]);

  return (
    <div ref={wrapRef} className={`gateway-flow ${className}`}>
      <canvas ref={canvasRef} className="gateway-flow-canvas" aria-hidden="true" />
      {children && <div className="gateway-flow-content">{children}</div>}
    </div>
  );
}

export default GatewayFlow;
