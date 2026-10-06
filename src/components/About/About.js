import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
// import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import Experience from "./Experience";
import Reveal from "../Reveal";
import LazyImage from "../LazyImage";

function About() {
  return (
    <Container  className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Reveal
            as={Col}
            md={7}
            direction="left"
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Reveal>
          <Reveal
            as={Col}
            md={5}
            direction="right"
            delay={150}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <LazyImage src={laptopImg} alt="about" className="img-fluid float-slow" />
          </Reveal>
        </Row>
        <Reveal as="h1" className="project-heading">
          Primary <strong className="purple">Skillset </strong>
        </Reveal>

        <Techstack />

        <Reveal as="h1" className="project-heading">
          <strong className="purple">Tools</strong> I use
        </Reveal>
        <Toolstack />
        <Experience />
        {/* <Github /> */}
      </Container>
    </Container>
  );
}

export default About;
