import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
} from "react-icons/di";
import { FaDocker, FaNode } from "react-icons/fa";
import {
  SiAngular,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import Reveal from "../Reveal";

const skills = [
  { Icon: DiJavascript1, label: "JavaScript" },
  { Icon: DiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiAngular, label: "Angular" },
  { Icon: FaNode, label: "Node" },
  { Icon: SiNestjs, label: "NestJS" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiRedux, label: "Redux" },
  { Icon: SiMysql, label: "MySQL" },
  { Icon: FaDocker, label: "Docker" },
];

function Techstack() {
  return (
    <Reveal as={Row} stagger style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skills.map(({ Icon, label }) => (
        <Col xs={4} md={2} className="tech-icons" key={label}>
          <Icon title={label} />
          <span className="tech-label">{label}</span>
        </Col>
      ))}
    </Reveal>
  );
}

export default Techstack;
