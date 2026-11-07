import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit2, FiRotateCcw } from "react-icons/fi";
import { useTheme } from "../../theme";

// A photo that draws itself: a pencil sketch is generated from the image on a
// canvas, revealed stroke by stroke (dark contours first, then broad hatching),
// and the colour photograph washes in over it. Hover brings the sketch back.

const W = 720;
const H = 960;

// Separable box blur on a single-channel Float32Array, run in place.
function boxBlur(src, w, h, r) {
  const tmp = new Float32Array(src.length);
  const size = r * 2 + 1;
  for (let y = 0; y < h; y++) {
    let acc = 0;
    const row = y * w;
    for (let x = -r; x <= r; x++) acc += src[row + Math.min(w - 1, Math.max(0, x))];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = acc / size;
      acc += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
    for (let y = 0; y < h; y++) {
      src[y * w + x] = acc / size;
      acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
}

function hexToRgb(color) {
  const m = color.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return [40, 38, 35];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Classic "colour dodge" pencil sketch: grey / (1 - blurred inverted grey).
// Returns a transparent canvas whose strokes are tinted with the theme's ink,
// plus the per-pixel darkness used to decide where the pencil goes first.
function buildSketch(img) {
  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const sctx = src.getContext("2d", { willReadFrequently: true });
  sctx.drawImage(img, 0, 0, W, H);
  const { data } = sctx.getImageData(0, 0, W, H);

  const n = W * H;
  const grey = new Float32Array(n);
  const blur = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const g = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
    grey[i] = g;
    blur[i] = 255 - g;
  }
  boxBlur(blur, W, H, 7);
  boxBlur(blur, W, H, 7);

  const [r, g, b] = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--ink"));
  const out = sctx.createImageData(W, H);
  const dark = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const dodge = Math.min(255, (grey[i] * 255) / Math.max(1, 255 - blur[i]));
    // Lift contrast so the lines read as graphite, and add a little tone from the
    // original greys so jeans and jacket don't vanish.
    let d = (255 - dodge) / 255;
    d = Math.min(1, Math.pow(d, 0.75) * 1.5 + ((255 - grey[i]) / 255) * 0.12);
    dark[i] = d;
    out.data[i * 4] = r;
    out.data[i * 4 + 1] = g;
    out.data[i * 4 + 2] = b;
    out.data[i * 4 + 3] = d * 255;
  }
  sctx.clearRect(0, 0, W, H);
  sctx.putImageData(out, 0, 0);
  return { canvas: src, dark };
}

function SketchPortrait({ src, alt, caption }) {
  const theme = useTheme();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pencilRef = useRef(null);
  const imgRef = useRef(null);
  const sketchRef = useRef(null);
  const rafRef = useRef(0);
  const [stage, setStage] = useState("idle"); // idle → drawing → color
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(0);

  // Load the photo once and (re)build the sketch whenever the theme changes,
  // so graphite stays dark on paper and light on the dark theme.
  useEffect(() => {
    let cancelled = false;
    const build = () => {
      if (cancelled) return;
      sketchRef.current = buildSketch(imgRef.current);
      setReady((v) => v + 1);
    };
    if (imgRef.current) {
      build();
      return () => {
        cancelled = true;
      };
    }
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      build();
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, theme]);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const sketch = sketchRef.current;
    if (!canvas || !sketch) return;
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(rafRef.current);
    ctx.clearRect(0, 0, W, H);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx.drawImage(sketch.canvas, 0, 0);
      setStage("color");
      return;
    }

    setStage("drawing");
    const pattern = ctx.createPattern(sketch.canvas, "no-repeat");
    ctx.strokeStyle = pattern;
    ctx.lineCap = "round";
    const { dark } = sketch;
    const pencil = pencilRef.current;
    const CONTOUR = 1700; // ms: contours, darkest areas first
    const HATCH = 1100; // ms: broad diagonal hatching over everything
    const SETTLE = 450; // ms: fade in whatever the pencil missed
    const start = performance.now();
    let hatchDone = 0;
    let settleAlpha = 0;

    const movePencil = (x, y) => {
      if (!pencil) return;
      pencil.style.left = `${(x / W) * 100}%`;
      pencil.style.top = `${(y / H) * 100}%`;
    };

    const frame = (now) => {
      const t = now - start;

      if (t < CONTOUR) {
        const k = t / CONTOUR;
        // The darkness threshold drops over time, so outlines come first and
        // mid-tones follow, like an artist blocking in a figure.
        const threshold = 0.75 - k * 0.6;
        let lx = 0;
        let ly = 0;
        for (let s = 0; s < 70; s++) {
          let best = -1;
          let bx = 0;
          let by = 0;
          for (let tries = 0; tries < 6; tries++) {
            const x = (Math.random() * W) | 0;
            const y = (Math.random() * H) | 0;
            const d = dark[y * W + x];
            if (d > best) {
              best = d;
              bx = x;
              by = y;
            }
          }
          if (best < threshold) continue;
          const len = 14 + Math.random() * 34;
          const a = -0.65 + (Math.random() - 0.5) * 0.9;
          ctx.lineWidth = 1.5 + Math.random() * 2.5 + k * 3;
          ctx.beginPath();
          ctx.moveTo(bx - Math.cos(a) * len * 0.5, by - Math.sin(a) * len * 0.5);
          ctx.quadraticCurveTo(
            bx + (Math.random() - 0.5) * 8,
            by + (Math.random() - 0.5) * 8,
            bx + Math.cos(a) * len * 0.5,
            by + Math.sin(a) * len * 0.5
          );
          ctx.stroke();
          lx = bx;
          ly = by;
        }
        if (lx || ly) movePencil(lx, ly);
      } else if (t < CONTOUR + HATCH) {
        // Sweep long diagonal strokes from top-left to bottom-right.
        const k = (t - CONTOUR) / HATCH;
        const total = 150;
        const target = Math.floor(k * total);
        ctx.lineWidth = 16;
        let px = 0;
        let py = 0;
        for (; hatchDone < target; hatchDone++) {
          const off = (hatchDone / total) * (W + H) - H * 0.15;
          const jitter = (Math.random() - 0.5) * 18;
          ctx.beginPath();
          ctx.moveTo(off + jitter, -20);
          ctx.lineTo(off - H * 0.7 + jitter, H + 20);
          ctx.stroke();
          px = Math.min(W - 10, Math.max(10, off - H * 0.35));
          py = H * 0.5 + (Math.random() - 0.5) * H * 0.5;
        }
        if (px || py) movePencil(px, py);
      } else if (t < CONTOUR + HATCH + SETTLE) {
        const k = (t - CONTOUR - HATCH) / SETTLE;
        const step = k - settleAlpha;
        settleAlpha = k;
        ctx.globalAlpha = Math.min(1, step * 1.5);
        ctx.drawImage(sketch.canvas, 0, 0);
        ctx.globalAlpha = 1;
      } else {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(sketch.canvas, 0, 0);
        setStage("color");
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
  }, []);

  // Start drawing the first time the portrait is on screen and the sketch is ready.
  const started = useRef(false);
  useEffect(() => {
    if (!inView || !ready) return;
    if (!started.current) {
      started.current = true;
      draw();
    } else if (stage === "color") {
      // Theme changed after the animation: just repaint the finished sketch.
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(sketchRef.current.canvas, 0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, ready, draw]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <figure className={`sketch-portrait is-${stage}`} ref={wrapRef}>
      <div className="sketch-frame">
        <span className="sketch-corner tl" aria-hidden="true" />
        <span className="sketch-corner tr" aria-hidden="true" />
        <span className="sketch-corner bl" aria-hidden="true" />
        <span className="sketch-corner br" aria-hidden="true" />
        <canvas ref={canvasRef} width={W} height={H} className="sketch-canvas" aria-hidden="true" />
        <img src={src} alt={alt} className="sketch-photo" loading="lazy" decoding="async" />
        <span className="sketch-pencil" ref={pencilRef} aria-hidden="true">
          <FiEdit2 />
        </span>
        <button type="button" className="sketch-replay" onClick={draw} aria-label="Replay the sketch animation">
          <FiRotateCcw aria-hidden="true" />
        </button>
      </div>
      {caption && <figcaption className="sketch-caption">{caption}</figcaption>}
    </figure>
  );
}

export default SketchPortrait;
