import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiLinux,
  SiVisualstudiocode,
  SiPostman,
  SiHeroku,
  SiVercel,
  SiWebpack,
  SiFirebase
} from "react-icons/si";
import { ImGithub } from "react-icons/im";
import { DiNpm } from "react-icons/di";
import { SiInsomnia } from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode title="Visual Studio Code" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <ImGithub title="Github" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman title="Postman" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiWebpack title="Webpack" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNpm title="Node Package Manager" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFirebase title="Firebase" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <SiInsomnia title="Insomnia" />
      </Col>
    </Row>
  );
}

export default Toolstack;
