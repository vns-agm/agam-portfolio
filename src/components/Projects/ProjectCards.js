import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tilt from "react-parallax-tilt";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import LazyImage from "../LazyImage";

function ProjectCards(props) {
  return (
    <Tilt
      className="project-tilt"
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#c770f0"
      glarePosition="all"
      glareBorderRadius="6px"
      transitionSpeed={1200}
    >
      <Card className="project-card-view">
        <div className="project-card-media">
          <LazyImage
            src={props.imgPath}
            alt={`${props.title} screenshot`}
            className="card-img-top"
          />
        </div>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>
          <div className="project-card-actions">
            <Button variant="primary" href={props.ghLink} target="_blank" rel="noreferrer">
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>
            {!props.isBlog && props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                rel="noreferrer"
              >
                <CgWebsite /> &nbsp;
                {"Demo"}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Tilt>
  );
}
export default ProjectCards;
