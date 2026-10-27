import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaBlog } from "react-icons/fa";
import { SiLichess, SiLeetcode } from "react-icons/si";

const BLOG_URL = "https://agam-blog-iota.vercel.app/";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Agam Srivastava</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} AS</h3>
          <a href={BLOG_URL} target="_blank" rel="noreferrer" className="footer-blog-link">
            <FaBlog /> Read my blog
          </a>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/vns-agm"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
                title="Github"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/agam-srivastava-33456b212/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
                title="Linkedin"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/agm_srv/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
                title="Instagram"
              >
                <AiFillInstagram />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://lichess.org/@/vns-agm"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
                title="Lichess"
              >
                <SiLichess />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://leetcode.com/u/urVlyMewy3/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
                title="LeetCode"
              >
                <SiLeetcode />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
                title="Blog"
                aria-label="Blog"
                data-magnetic
              >
                <FaBlog />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
