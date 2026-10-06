import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";

const links = [
  { to: "/", label: "Home", Icon: AiOutlineHome },
  { to: "/about", label: "About", Icon: AiOutlineUser },
  { to: "/project", label: "Projects", Icon: AiOutlineFundProjectionScreen },
  { to: "/resume", label: "My Resume", Icon: BsFileEarmarkPdf },
  { to: "/contact", label: "Contact Me", Icon: AiOutlineMail },
];

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }

    scrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex brand-mark" onClick={() => updateExpanded(false)}>
          <span className="purple" title="Agam Srivastava">
            AS
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {links.map(({ to, label, Icon }, i) => (
              <Nav.Item key={to} className="nav-item-animated" style={{ "--i": i }}>
                <Nav.Link
                  as={NavLink}
                  to={to}
                  end={to === "/"}
                  onClick={() => updateExpanded(false)}
                >
                  <Icon style={{ marginBottom: "2px" }} /> {label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
