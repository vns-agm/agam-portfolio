import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Reveal from "../Reveal";
import { yearsExp } from "./Stats";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLichess, SiLeetcode } from "react-icons/si";

const stack = [
  { area: "Frontend", items: "Angular, React, Next.js, micro-frontend and component-based architecture" },
  { area: "Backend", items: "Node.js, NestJS, FastAPI, REST APIs, AWS API Gateway, clean modular architecture" },
  { area: "Data", items: "MongoDB, DynamoDB, Redis, Firebase" },
  { area: "Cloud & DevOps", items: "AWS, Docker, Shell scripting" },
  { area: "AI-assisted dev", items: "GitHub Copilot for faster, cleaner delivery" },
];

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Reveal as={Col} md={10} lg={8} className="home-about-description mx-auto">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <div className="home-about-body">
              <p>
                I'm a <span className="purple">Full-Stack Engineer</span> with{" "}
                <span className="purple">{yearsExp}+ years of experience</span> building scalable,
                production-grade web applications and cloud microservices. I currently work at{" "}
                <span className="purple">Sopra Steria</span> on Airbus's Aeroline unit, building
                AWS-based microservices, Node.js/NestJS APIs and Angular/React monitoring tools for
                aircraft electronics systems.
              </p>

              <h2 className="intro-subhead">What I work with</h2>
              <ul className="intro-stack">
                {stack.map(({ area, items }) => (
                  <li key={area}>
                    <span className="intro-stack-area">{area}</span>
                    <span className="intro-stack-items">{items}</span>
                  </li>
                ))}
              </ul>

              <p>
                Before Sopra Steria, I spent nearly 4 years at <span className="purple">mFilterIt</span>,
                where I grew from R&amp;D intern to Senior Software Engineer. I built end-to-end products
                and was recognised with quarterly excellence awards.
              </p>
              <p>
                Off the keyboard, I'm a{" "}
                <a target="_blank" rel="noreferrer" href="https://ratings.fide.com/profile/25662210">
                  national-level chess player
                </a>
                . Chess shapes how I approach system design: think several moves ahead and plan for
                edge cases.
              </p>
              <p className="intro-open">
                <span className="pulse-dot" /> Open to conversations about full-stack, cloud and
                product engineering roles.
              </p>
            </div>
          </Reveal>
        </Row>
        <Row>
          <Reveal as={Col} md={12} className="home-about-social">
            <h1>LET'S CONNECT</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me on
            </p>
            <ul className="home-about-social-links social-stagger">
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
              <li className="social-icons">
                <a
                  href="https://leetcode.com/u/urVlyMewy3/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  title="LeetCode"
                >
                  <SiLeetcode />
                </a>
              </li>
            </ul>
          </Reveal>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
