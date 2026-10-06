import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiWebpack,
  SiFirebase,
  SiAmazonaws,
} from "react-icons/si";
import { ImGithub } from "react-icons/im";
import { DiNpm } from "react-icons/di";
import { SiInsomnia } from "react-icons/si";
import Reveal from "../Reveal";

const tools = [
  { Icon: SiVisualstudiocode, label: "VS Code" },
  { Icon: ImGithub, label: "GitHub" },
  { Icon: SiPostman, label: "Postman" },
  { Icon: SiWebpack, label: "Webpack" },
  { Icon: DiNpm, label: "npm" },
  { Icon: SiFirebase, label: "Firebase" },
  { Icon: SiAmazonaws, label: "AWS" },
  { Icon: SiInsomnia, label: "Insomnia" },
];

function Toolstack() {
  return (
    <Reveal as={Row} stagger style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map(({ Icon, label }) => (
        <Col xs={4} md={2} className="tech-icons" key={label}>
          <Icon title={label} />
          <span className="tech-label">{label}</span>
        </Col>
      ))}
    </Reveal>
  );
}

export default Toolstack;
