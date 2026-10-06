import React, { useEffect, useRef, useState } from "react";

// Native lazy-loaded image with a shimmer placeholder and a blur-in once it arrives.
function LazyImage({ src, alt, className = "", wrapperClassName = "", ...rest }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Cached images can finish before React attaches onLoad.
    if (imgRef.current && imgRef.current.complete) setLoaded(true);
  }, [src]);

  return (
    <div className={`lazy-image ${loaded ? "is-loaded" : ""} ${wrapperClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        {...rest}
      />
    </div>
  );
}

export default LazyImage;
