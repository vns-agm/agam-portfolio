import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple"> Agam Srivastava </span>
            from <span className="purple"> Varanasi, India.</span>
            <br />I have pursued{" "}
            <span className="purple">Btech in Computer Science</span> in the
            batch of 2018-2022 from{" "}
            <span className="purple">Shri Ramswaroop Memorial University.</span>
            <br />I shaped my career in January 2022 by getting a job as a{" "}
            <span className="purple">Software Engineer in mFilterIt </span>, A
            product based AdTech company .
            <br />
            Apart from coding, some other activities that I love to do! 
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Chess
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Driving
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "You are never too old to set another goal or to dream a new dream 🤞"{" "}
          </p>
          <footer className="blockquote-footer">C.S. Lewis.</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
