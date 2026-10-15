import React, { useEffect, useRef } from "react";

// Soft purple spotlight that follows the mouse. Desktop pointers only.
function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion || !ref.current) return;

    const node = ref.current;
    let frame = null;

    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // transform only: composited on the GPU, no full-screen repaint per move.
        node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        node.classList.add("is-active");
        frame = null;
      });
    };
    const onLeave = () => node.classList.remove("is-active");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

export default CursorGlow;
