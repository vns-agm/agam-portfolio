import React from "react";
import LazyImage from "../LazyImage";

// A project screenshot presented in a quiet browser frame on a neutral stage.
// The stage has a fixed aspect ratio, so every card lines up and nothing shifts
// while images load, whatever the screenshot's own proportions.
function Screenshot({ src, alt, ratio = "16 / 10", eager = false, className = "" }) {
  return (
    <div className={`frame ${className}`} style={{ aspectRatio: ratio }}>
      <div className="frame-stage">
        <div className="frame-shot">
          <div className="browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <LazyImage src={src} alt={alt} eager={eager} />
        </div>
      </div>
    </div>
  );
}

export default Screenshot;
