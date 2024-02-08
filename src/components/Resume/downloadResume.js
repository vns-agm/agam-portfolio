import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function PDFViewer({ pdfUrl, fileName }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* PDF preview */}
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      
      {/* Download button */}
      <a href={pdfUrl} download={fileName} className="btn btn-primary">Download PDF</a>
    </div>
  );
}

export default PDFViewer;
