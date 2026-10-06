import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

// Reading-progress bar along the top edge plus a back-to-top button.
function ScrollIndicators() {
  const barRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = null;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setShowTop(window.scrollY > 500);
      frame = null;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <button
        type="button"
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <AiOutlineArrowUp />
      </button>
    </>
  );
}

export default ScrollIndicators;
