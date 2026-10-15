import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Stats from "./Stats";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <div className="now-chip hero-enter">
                <span className="pulse-dot" /> Senior Software Engineer @ <strong>Sopra Steria</strong>
              </div>
              <h1 style={{ paddingBottom: 15 }} className="heading hero-enter">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name hero-enter" style={{ "--d": "150ms" }}>
                I'M
                <strong className="main-name shimmer-text"> Agam Srivastava </strong>
              </h1>

              <div className="hero-enter hero-typewriter" style={{ "--d": "300ms" }}>
                <Type />
              </div>

              <div className="hero-ctas hero-enter" style={{ "--d": "380ms" }}>
                <Link to="/project" className="btn btn-primary hero-btn">
                  View my work <BsArrowRight />
                </Link>
                <a
                  href="/Agam_Srivastava_MERN_3.8YOE.pdf"
                  download
                  className="btn hero-btn hero-btn-ghost"
                >
                  <AiOutlineDownload /> Resume
                </a>
              </div>

              <Stats />
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }} className="hero-enter hero-art" >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={900}
                transitionSpeed={1500}
                gyroscope={true}
              >
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid float-slow"
                  style={{ maxHeight: "450px" }}
                />
              </Tilt>
            </Col>
          </Row>
        </Container>
        <a href="#about" className="scroll-cue" aria-label="Scroll to introduction">
          <span />
        </a>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
