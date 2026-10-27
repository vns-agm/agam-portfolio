import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { BiGitCommit } from "react-icons/bi";
import { FiCommand } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { OPEN_PALETTE_EVENT, PALETTE_SHORTCUT } from "./CommandPalette";
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
  { to: "/activity", label: "Activity", Icon: BiGitCommit },
  { to: "/resume", label: "Resume", Icon: BsFileEarmarkPdf },
  { to: "/contact", label: "Contact", Icon: AiOutlineMail },
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
        <div className="nav-actions order-md-last">
          <button
            type="button"
            className="palette-trigger"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open command palette"
            title={`Quick navigation (${PALETTE_SHORTCUT})`}
            data-magnetic
          >
            <FiCommand className="palette-trigger-icon" />
            <kbd>{PALETTE_SHORTCUT}</kbd>
          </button>
          <ThemeToggle />
        </div>
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
                  title={label}
                  to={to}
                  end={to === "/"}
                  onClick={() => updateExpanded(false)}
                >
                  <Icon style={{ marginBottom: "2px" }} /> <span className="nav-label">{label}</span>
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
