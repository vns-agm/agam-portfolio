import React from "react";

// The single <h1> block at the top of interior pages.
function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="page-header">
      <div className="container">
        <div className="page-header-inner">
          {eyebrow && (
            <span className="eyebrow rise" style={{ "--d": "0ms" }}>
              {eyebrow}
            </span>
          )}
          <h1 className="display rise" style={{ "--d": "80ms" }}>
            {title}
          </h1>
          {lead && (
            <p className="lead muted rise" style={{ "--d": "160ms", maxWidth: 640 }}>
              {lead}
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
