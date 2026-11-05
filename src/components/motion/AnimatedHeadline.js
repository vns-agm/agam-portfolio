import React from "react";
import { m, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Headline whose words rise into place from behind a mask, one after another.
 * Screen readers get the plain sentence via aria-label; the animated word
 * spans are hidden from them.
 *
 * @param {{ lines: {text: string, em?: boolean}[][], as?: string, delay?: number,
 *           className?: string, id?: string }} props
 */
function AnimatedHeadline({ lines, as: Tag = "h1", delay = 0.1, className = "", id }) {
  const reduce = useReducedMotion();
  const label = lines.map((line) => line.map((s) => s.text).join(" ")).join(" ");
  let index = 0;

  return (
    <Tag id={id} className={`animated-headline ${className}`} aria-label={label}>
      {lines.map((line, li) => (
        <span className="headline-line" key={li} aria-hidden="true">
          {line.map((seg, si) =>
            seg.text.split(" ").map((word, wi) => {
              const i = index++;
              const Word = seg.em ? m.em : m.span;
              return (
                <React.Fragment key={`${si}-${wi}`}>
                  <span className="word-mask">
                    <Word
                      className="word"
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.95, ease: EASE, delay: delay + i * 0.07 }}
                    >
                      {word}
                    </Word>
                  </span>{" "}
                </React.Fragment>
              );
            })
          )}
        </span>
      ))}
    </Tag>
  );
}

export default AnimatedHeadline;
