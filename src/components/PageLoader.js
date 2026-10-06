import React from "react";

// Suspense fallback shown while a lazily loaded page chunk downloads.
function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <span />
      <span />
      <span />
    </div>
  );
}

export default PageLoader;
