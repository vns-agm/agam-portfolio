import React from "react";
import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Particle from "../Particle";
import resume from "../../Assets/Projects/resume.png";

const pdfLink = "https://drive.google.com/file/d/1C7HgYf19-VZ7fMsSlD6bwvFw3rt78Z5o/view";

const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = "Agam_Srivastava_Resume.pdf";
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
                    <Card.Img variant="top" src={resume} alt="card-img" />
                    <Button style={{margin :"2px"}} onClick={handleDownload} className="btn btn-primary">Download PDF</Button>
                </Container>
            </Container>
        </>
    );
}

export default Myresume;
