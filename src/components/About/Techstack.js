import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
} from "react-icons/di";
import { FaNode } from "react-icons/fa";
import { SiMysql, SiRedux, SiNextdotjs , SiTypescript } from "react-icons/si";

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
        <FaNode title="Node" />
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
     
    </Row>
  );
}

export default Techstack;
