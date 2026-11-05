import React, { useEffect, useRef, useState } from "react";

// Native lazy-loaded image that fades in once decoded. `eager` is for
// above-the-fold images, which should start loading immediately.
function LazyImage({ src, alt, className = "", eager = false, ...rest }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Cached images can finish before React attaches onLoad.
    if (imgRef.current && imgRef.current.complete) setLoaded(true);
  }, [src]);

  return (
    <div className={`lazy-image ${loaded ? "is-loaded" : ""}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        {...rest}
      />
    </div>
  );
}

export default LazyImage;
