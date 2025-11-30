import React from "react";
import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Particle from "../Particle";

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
    return (
        <>
          {/* <Particle/> */}
            <Container fluid className="project-section">
                <Container>
                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <iframe
                            src={`${pdfLink}#toolbar=0`}
                            width="100%"
                            height="800px"
                            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                            title="Resume Preview"
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button style={{margin :"2px"}} onClick={handleDownload} className="btn btn-primary">Download PDF</Button>
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default Myresume;
