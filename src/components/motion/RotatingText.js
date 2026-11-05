import React, { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Cycles through phrases inside a mask: the current one slides up and out as
 * the next rises in. Hidden from screen readers (the parent heading carries
 * the readable text); reduced motion shows only the first phrase.
 *
 * @param {{ phrases: string[], interval?: number, startDelay?: number, em?: boolean }} props
 */
function RotatingText({ phrases, interval = 2600, startDelay = 2200, em = true }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || phrases.length < 2) return undefined;
    let timer;
    // Wait for the headline's entrance to finish before the first swap.
    const start = setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
      timer = setInterval(() => setIndex((i) => (i + 1) % phrases.length), interval);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [reduce, phrases.length, interval, startDelay]);

  const Tag = em ? m.em : m.span;

  return (
    <span className="rotating-mask" aria-hidden="true">
      {/* Default "sync" mode: the outgoing and incoming words overlap in one grid
          cell, so the slot is never empty mid-swap. */}
      <AnimatePresence initial={false}>
        <Tag
          key={phrases[index]}
          className="rotating-word"
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {phrases[index]}
        </Tag>
      </AnimatePresence>
    </span>
  );
}

export default RotatingText;
