import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import Reveal from "../Reveal";

const pdfLink = "/Agam_Srivastava_MERN_3.8YOE.pdf";

const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = "Agam_Srivastava_MERN_3.8YOE.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


function Myresume() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <Container fluid className="project-section">
                <Container>
                    <Reveal style={{ marginBottom: "20px", textAlign: "center" }}>
                        <div className={`resume-frame ${loaded ? "is-loaded" : ""}`}>
                            {!loaded && <div className="resume-skeleton" aria-hidden="true" />}
                            <iframe
                                src={`${pdfLink}#toolbar=0`}
                                width="100%"
                                className="resume-iframe"
                                loading="lazy"
                                onLoad={() => setLoaded(true)}
                                style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                                title="Resume Preview"
                            />
                        </div>
                    </Reveal>
                    <div style={{ textAlign: "center" }}>
                        <Button style={{margin :"2px"}} onClick={handleDownload} className="btn btn-primary download-btn">
                            <AiOutlineDownload /> &nbsp;Download PDF
                        </Button>
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default Myresume;
