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
              As a passionate Computer Science enthusiast and International Rated chess player with a <a target="_blank"
                rel="noreferrer" href={"https://ratings.fide.com/profile/25662210"}>fide Rating</a> of 1525
              , I’ve represented Uttar Pradesh three times in Nationals (2017-18). <br/><br/>With 2.9 years of IT experience, I excel in problem-solving and have deep expertise in technologies like React.js, Next.js, Webflow, SCSS, JavaScript , TypeScript, and D3.js alongside state management using Redux. I also possess hands-on experience with backend frameworks like Node.js, Next.js, and NestJS, along with Docker, Shell Scripting, and Redis.
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
