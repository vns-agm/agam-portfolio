import { useEffect } from "react";

// Cards that get a soft light following the cursor.
const SPOTLIGHT = ".glass-card, .project-card-view, .hero-stat, .tech-icons, .contact-row";
// Max pull, in px, for elements marked data-magnetic.
const PULL = 6;

// One delegated pointer listener for the whole app (cheaper than one per element):
//  - [data-magnetic] elements lean slightly toward the cursor
//  - spotlight cards get --mx/--my so CSS can draw a glow under the pointer
// Mouse/trackpad only; touch devices skip it entirely.
function useInteractions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = null;
    let lastEvent = null;
    let magnet = null;

    const release = (el) => {
      el.style.removeProperty("--mag");
    };

    const update = () => {
      frame = null;
      const e = lastEvent;
      if (!e || !(e.target instanceof Element)) return;

      const nextMagnet = e.target.closest("[data-magnetic]");
      if (magnet && magnet !== nextMagnet) release(magnet);
      magnet = nextMagnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        magnet.style.setProperty("--mag", `${(dx * PULL).toFixed(1)}px ${(dy * PULL).toFixed(1)}px`);
      }

      const card = e.target.closest(SPOTLIGHT);
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const onMove = (e) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      if (magnet) release(magnet);
      magnet = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

export default useInteractions;
