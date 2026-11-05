import React from "react";

// Suspense fallback while a page chunk downloads: an empty block that holds the
// space (so the footer doesn't jump up), announced to screen readers.
function PageLoader() {
  return (
    <div className="page-loader" role="status">
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default PageLoader;
