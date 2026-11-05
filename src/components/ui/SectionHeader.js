import React from "react";
import Reveal from "../Reveal";

// Eyebrow + serif title + optional lead, with an optional action on the right.
// `level` picks the heading element so each page keeps one <h1>.
function SectionHeader({ eyebrow, title, lead, action, level = 2, className = "" }) {
  const Heading = `h${level}`;
  return (
    <Reveal className={`section-head ${className}`}>
      <div className="section-head-text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className="title">{title}</Heading>
        {lead && <p className="lead muted">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export default SectionHeader;
