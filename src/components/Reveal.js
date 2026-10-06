import React, { useEffect, useRef, useState } from "react";

// Fades/slides its children in when they scroll into view.
// `as` lets it render as a layout component (e.g. a bootstrap Col) so grids keep working.
function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  stagger = false,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    // Anything already on screen shows right away instead of waiting on the observer.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [
    stagger ? "reveal-stagger" : `reveal reveal-${direction}`,
    visible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
