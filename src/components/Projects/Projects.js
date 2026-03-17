import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";
import season from "../../Assets/Projects/season.png";
import exploring from "../../Assets/Projects/exploring.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import ticketPortal from "../../Assets/ticket_portal.png";
import customTable from "../../Assets/custom_table.png";

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
              imgPath={ticketPortal}
              isBlog={false}
              title="Ticket Portal"
              description="A personal issue tracking and ticket management app to create tickets, set priority and due dates, add comments, assign work, and close issues."
              ghLink="https://github.com/vns-agm/Ticket_portal"
              demoLink="https://ticket-portal-dusky.vercel.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={customTable}
              isBlog={false}
              title="Custom Table"
              description="A custom table UI with sorting/filtering-style interactions and a clean, responsive layout."
              ghLink="https://github.com/vns-agm/Ticket_portal"
              demoLink="https://custom-table-sigma.vercel.app/"
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
