import React from "react";
import Reveal from "../Reveal";

// A titled list of technologies with small monochrome marks.
function StackList({ title, items }) {
  return (
    <div className="stack-list">
      <h3 className="stack-title">{title}</h3>
      <Reveal as="ul" stagger className="stack-items">
        {items.map(({ Icon, label }) => (
          <li key={label} className="stack-item">
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </Reveal>
    </div>
  );
}

export default StackList;
