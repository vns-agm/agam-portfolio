import React from "react";

// Pure-CSS starfield. Replaces the old canvas particle engine, which redrew 100
// particles every frame. Stars are box-shadows painted once; the layers only
// drift via `transform`, which the GPU composites without repainting.

// Small seeded PRNG so the sky looks the same on every render.
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function makeStars(count, seed, alpha) {
  const rand = rng(seed);
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 2000);
    const y = Math.round(rand() * 2000);
    const a = (alpha * (0.4 + rand() * 0.6)).toFixed(2);
    stars.push(`${x}px ${y}px rgba(255,255,255,${a})`);
  }
  return stars.join(",");
}

const layers = [
  { className: "stars stars-sm", shadow: makeStars(180, 7, 0.55) },
  { className: "stars stars-md", shadow: makeStars(60, 42, 0.75) },
  { className: "stars stars-lg", shadow: makeStars(18, 99, 0.9) },
];

function Particle() {
  return (
    <div className="starfield" aria-hidden="true">
      {layers.map(({ className, shadow }) => (
        <div key={className} className={className} style={{ boxShadow: shadow }} />
      ))}
    </div>
  );
}

export default Particle;
