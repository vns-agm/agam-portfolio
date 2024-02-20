import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLichess } from "react-icons/si";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am a Computer Science enthusiast , I love solving intresting
              problems by logical and programming approaches . primarily
              intrested in Frontend technologies like ReactJS , AngularJS , HTML
              , CSS , JavaScript . Passionate to work in a progressive
              organization that incorporates varied spectrum of work and
              diversity with welcome attitude for new ideas and concept to
              enhance the overall growth of the organisation.
              <br />
              <br />I am National level Chess player with a fide Rating of 1209
              .
              <br />
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>LET'S CONNECT</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me on 
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/vns-agm"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Github"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://lichess.org/@/vns-agm"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Lichess"
                >
                  <SiLichess />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/agam-srivastava-33456b212/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Linkedin"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/agm_srv/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  title="Instagram"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
