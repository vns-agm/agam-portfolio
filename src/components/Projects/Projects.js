import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Reveal from "../Reveal";
import chatify from "../../Assets/opt/chatify.jpg";
import season from "../../Assets/opt/season.jpg";
import exploring from "../../Assets/opt/exploring.jpg";
import bitsOfCode from "../../Assets/opt/blog.jpg";
import ticketPortal from "../../Assets/opt/ticket_portal.jpg";
import customTable from "../../Assets/opt/custom_table.jpg";
import studentCrm from "../../Assets/opt/student_crm.jpg";
import agamBlog from "../../Assets/opt/agam_blog.jpg";

const projects = [
  {
    imgPath: agamBlog,
    title: "Agam's Blog",
    description:
      "My personal blog built with Next.js and a Turso (libSQL) database. Write, edit and draft Markdown posts from a password-protected admin panel, with a light/dark theme. Hosted on Vercel.",
    ghLink: "https://github.com/vns-agm/agam-blog",
    demoLink: "https://agam-blog-iota.vercel.app/",
  },
  {
    imgPath: studentCrm,
    title: "Student CRM",
    description:
      "Agm-Chess Classes student CRM built with React and Express. Manage student profiles, attendance (present/late/absent), fees and payments, batch tracking, and CSV export. Uses SQLite locally and Turso on Vercel.",
    ghLink: "https://github.com/vns-agm/Student_crm",
    demoLink: "https://student-crm-drab.vercel.app/",
  },
  {
    imgPath: chatify,
    title: "Portfolio",
    description:
      "This is my personal portfolio, which I have built using mostly ReactJS, with a focus on creating an interactive and eye-catching UI. I have hosted it on my Firebase account",
    ghLink: "https://github.com/vns-agm/agam-portfolio",
    demoLink: "https://agam-portfolio.web.app/",
  },
  {
    imgPath: ticketPortal,
    title: "Ticket Portal",
    description:
      "A personal issue tracking and ticket management app to create tickets, set priority and due dates, add comments, assign work, and close issues.",
    ghLink: "https://github.com/vns-agm/Ticket_portal",
    demoLink: "https://ticket-portal-dusky.vercel.app/",
  },
  {
    imgPath: customTable,
    title: "Custom Table",
    description:
      "A custom table UI with sorting/filtering-style interactions and a clean, responsive layout.",
    ghLink: "https://github.com/vns-agm/Ticket_portal",
    demoLink: "https://custom-table-sigma.vercel.app/",
  },
  {
    imgPath: season,
    title: "Season's App",
    description:
      "This project I built during my initial phase of web development when I was dipping my toes into single-page applications. It is a simple application which ask for user location and suggest the season around",
    ghLink: "https://github.com/vns-agm/Seasons-app",
    demoLink: "https://project-season-app.web.app/",
  },
  {
    imgPath: exploring,
    title: "Exploring Places",
    description:
      "This project search for the nearest local's around the user by the input provided . It shows the distance between the user locaton and the resulted places",
    ghLink: "https://github.com/vns-agm/Seasons-app",
    demoLink: "https://exploring-places.web.app/",
  },
  {
    imgPath: bitsOfCode,
    title: "Kashi Dana",
    description:
      "An e-commerce website built with React, featuring a modern and responsive design. The application is deployed on Vercel and provides a seamless shopping experience with interactive features.",
    ghLink: "https://github.com/vns-agm/kashi-dana",
    demoLink: "https://kashi-dana.vercel.app/",
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <Reveal as="h1" className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </Reveal>
        <p className="project-subheading">
          Hover a card to tilt it. Click through to the code or a live demo.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, i) => (
            <Reveal
              as={Col}
              md={6}
              lg={4}
              key={project.title}
              className="project-card"
              delay={(i % 3) * 120}
            >
              <ProjectCard isBlog={false} {...project} />
            </Reveal>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
