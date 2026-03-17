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

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 title="JavaScript" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact title="ReactJs" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNextdotjs title="NextJs" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAngular title="Angular" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaNode title="Node" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNestjs title="NestJS" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <SiTypescript title="Typescript" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiRedux title="Redux" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql title="Mysql" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaDocker title="Docker" />
      </Col>
     
    </Row>
  );
}

export default Techstack;
