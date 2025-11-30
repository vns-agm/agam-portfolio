import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import season from "../../Assets/Projects/season.png";
import exploring from "../../Assets/Projects/exploring.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Portfolio"
              description="
              This is my personal portfolio, which I have built using mostly ReactJS, with a focus on creating an interactive and eye-catching UI. I have hosted it on my Firebase account"
              ghLink="https://github.com/vns-agm/agam-portfolio"
              demoLink="https://agam-portfolio.web.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={season}
              isBlog={false}
              title="Season's App"
              description="This project I built during my initial phase of web development when I was dipping my toes into single-page applications. It is a simple application which ask for user location and suggest the season around"
              ghLink="https://github.com/vns-agm/Seasons-app"
              demoLink="https://project-season-app.web.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={exploring}
              isBlog={false}
              title="Exploring Places"
              description="This project search for the nearest local's around the user by the input provided . It shows the distance between the user locaton and the resulted places"
              ghLink="https://github.com/vns-agm/Seasons-app"
              demoLink="https://exploring-places.web.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Kashi Dana"
              description="An e-commerce website built with React, featuring a modern and responsive design. The application is deployed on Vercel and provides a seamless shopping experience with interactive features."
              ghLink="https://github.com/vns-agm/kashi-dana"
              demoLink="https://kashi-dana.vercel.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
