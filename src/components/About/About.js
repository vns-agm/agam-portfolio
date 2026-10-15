import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import Experience from "./Experience";
import Reveal from "../Reveal";
import LazyImage from "../LazyImage";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function About() {
  return (
    <Container  className="about-section">
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
        <Reveal className="activity-teaser glass-card">
          <div>
            <h3>Curious what I'm building right now?</h3>
            <p>Browse my GitHub commits month by month, straight from the API.</p>
          </div>
          <Link to="/activity" className="btn btn-primary hero-btn">
            See code activity <BsArrowRight />
          </Link>
        </Reveal>
      </Container>
    </Container>
  );
}

export default About;
