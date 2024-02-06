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
import { SiMysql, SiRedux, SiNextdotjs } from "react-icons/si";
import { ImGithub } from "react-icons/im";

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
        <ImGithub title="Github" />
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
