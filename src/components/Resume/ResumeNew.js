import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const resumeLink = require("../../Assets/Agam_Srivastava_Resume.pdf"); // Path to your local PDF file

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        {/* Render the PDF */}
        <div className="resume">
          <Document file={resumeLink}>
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
        </div>

        {/* Your contact information */}
        <p style={{ textAlign: "justify" }}>
          Thank you for visiting my website! <br /> If you have any questions,
          comments or feedbacks, I would love to hear from you!
          <br />
          You can email me at my email address -
          <span className="purple"> agamsrivastavavns1193@gmail.com</span>
          <br /> Or you can ping me at{" "}
          <span className="purple"> 6394340104 </span>
        </p>
      </Container>
    </div>
  );
}

export default ResumeNew;
