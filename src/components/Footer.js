import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { SiLeetcode, SiLichess } from "react-icons/si";
import { NAV_LINKS, PERSON, RESUME, SOCIALS } from "../data/site";

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  blog: FaBlog,
  leetcode: SiLeetcode,
  lichess: SiLichess,
  instagram: FiInstagram,
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div className="section-head-text">
            <span className="eyebrow">Open to new roles</span>
            <h2 className="title">
              Let's build something <em>considered.</em>
            </h2>
          </div>
          <div className="footer-cta-actions">
            <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>
              Start a conversation <FiArrowRight className="arrow" aria-hidden="true" />
            </a>
            <Link className="btn btn-secondary" to="/contact">
              Contact details
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label={`${PERSON.name}, home`}>
              <span className="brand-mark" aria-hidden="true">AS</span>
              <span className="brand-name">{PERSON.name}</span>
            </Link>
            <p>
              Full-stack engineer building scalable web applications and cloud microservices. Currently{" "}
              {PERSON.role} at {PERSON.company}, {PERSON.location}.
            </p>
          </div>

          <nav className="footer-col" aria-label="Footer">
            <h3>Navigate</h3>
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Elsewhere</h3>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                    <FiArrowUpRight className="ext" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${PERSON.email}`}>Email me</a>
              </li>
              <li>
                <a href={`tel:${PERSON.phone.replace(/\s/g, "")}`}>{PERSON.phone}</a>
              </li>
              <li>
                <a href={RESUME.href} download={RESUME.fileName}>
                  Download résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Phones: the full footer is replaced by a single row of icon links. */}
        <ul className="footer-icons" aria-label="Contact and profiles">
          <li>
            <a href={`mailto:${PERSON.email}`} aria-label="Email" title="Email">
              <FiMail aria-hidden="true" />
            </a>
          </li>
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.key];
            return (
              <li key={s.key}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="footer-bottom">
          <span>
            © {year} {PERSON.name}
            <span className="footer-credit">. Designed and built by hand.</span>
          </span>
          <span>{PERSON.location}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
