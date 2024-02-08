import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import trophies from "../../Assets/trophies.png";
import Card from "react-bootstrap/Card";
import resume from "../../Assets/Projects/resume.png";


function Contact() {
    return (
        <Container className="about-section">
            <Particle />
                <Row style={{ justifyContent: "center", padding: "5px" }}>
                    <Col
                        md={7}
                        style={{
                            justifyContent: "center",
                            // paddingTop: "30px",
                            paddingBottom: "50px",
                        }}
                    >
                        <h4 style={{ fontSize: "1.2em", paddingBottom: "20px" }}>
                            <p>
                                Welcome to my website!
<br/>
                                If you have any questions, comments, or feedback, I would love to hear from you! <br/>
                                 Your input is invaluable to me, so please don't hesitate to reach out.

                                Feel free to email me at: <strong className="purple">agamsrivastavavns1193@gmail.com</strong> <br/>

                                Alternatively, you can reach me via phone at: <strong className="purple">+91 8687522809</strong><br/>

                                Looking forward to connecting with you!<br/>
                                <br/>
                                Warm regards,<br/>
                                Agam Srivastava
                            </p>
                        </h4>
                    </Col>
                    <Col
                        md={5}
                        // style={{ paddingTop: "120px", paddingBottom: "50px" }}
                        className="about-img"
                    >
                        <img src={trophies} alt="about" className="img-fluid" />
                    </Col>
                </Row>
                {/* <Github /> */}
        </Container>
    );
}

export default Contact;
