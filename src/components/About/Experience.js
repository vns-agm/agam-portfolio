import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import Reveal from "../Reveal";

// Months between two "YYYY-MM" dates, both ends inclusive (Jan → May = 5),
// matching how LinkedIn shows tenure. A missing end means "now".
function monthsBetween(start, end) {
  const [sy, sm] = start.split("-").map(Number);
  const e = end ? end.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  return Math.max(1, (e[0] - sy) * 12 + (e[1] - sm) + 1);
}

function formatMonths(total) {
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months || !years) parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  return parts.join(" ");
}

function formatMonth(ym) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const experiences = [
  {
    company: "Sopra Steria",
    initials: "SS",
    location: "Bengaluru, Karnataka",
    workType: "Hybrid",
    tagline: "Aeroline Unit · Client: Airbus (Aircraft Cabin program)",
    award: "Spot Award for excellence in the PII delivery.",
    roles: [
      {
        title: "Senior Software Engineer",
        type: "Full-time",
        start: "2025-08",
        end: null,
        highlights: [
          "Develop and manage microservices for the Airbus Aircraft Cabin program, with event-driven messaging over AWS SQS/SNS.",
          "Turn business requirements into technical specifications, wireframes and UI components alongside stakeholders.",
          "Build responsive, accessible UIs and reusable component libraries aligned with the design system.",
          "Improve performance with memoization, dynamic imports, caching and API-level enhancements.",
          "Review code, maintain coding standards and mentor junior developers.",
          "Ship through CI/CD pipelines using Docker, GitHub Actions and AWS/GCP deployments.",
        ],
        skills: ["Angular", "NestJS", "Node.js", "TypeScript", "AWS SQS/SNS", "Microservices", "Docker", "Kubernetes", "CI/CD"],
      },
    ],
  },
  {
    company: "mFilterIt",
    initials: "mF",
    location: "Noida, Uttar Pradesh",
    workType: "On-site",
    tagline: "Product-based AdTech company",
    award: "“Behind the Scene” quarterly award for building a product from scratch and solving complex architectural problems.",
    roles: [
      {
        title: "Senior Software Engineer",
        type: "Full-time",
        start: "2025-04",
        end: "2025-08",
        highlights: [
          "Built interactive dashboards and micro-frontend modules with React, Next.js and TypeScript.",
          "Cut bundle size and render overhead through code splitting and targeted optimisation.",
          "Integrated complex REST APIs with retries, caching and structured error handling.",
          "Set up CI/CD on AWS, GCP and Vercel for fast, zero-downtime deployments.",
          "Mentored the team, ran knowledge-sharing sessions and created reusable code templates.",
        ],
        skills: ["React", "Next.js", "TypeScript", "Micro-frontends", "Node.js", "Express.js", "AWS", "GCP"],
      },
      {
        title: "Software Engineer",
        type: "Full-time",
        start: "2022-05",
        end: "2025-04",
        highlights: [
          "Developed responsive web applications with React, Redux, JavaScript and CSS.",
          "Worked with backend teams on REST API contracts and data flow.",
          "Resolved production bugs and improved rendering performance across modules.",
          "Supported stable deployments with Docker, AWS services and monitoring tools.",
        ],
        skills: ["React", "Redux", "Next.js", "JavaScript", "REST APIs", "Docker", "Jest"],
      },
      {
        title: "Research & Development Intern",
        type: "Internship",
        start: "2022-01",
        end: "2022-05",
        highlights: [
          "Researched and prototyped new technologies and contributed to product development.",
        ],
        skills: ["JavaScript", "React", "Research", "Problem Solving"],
      },
    ],
  },
];

function Role({ role, isLast }) {
  const [open, setOpen] = useState(!role.end);
  const current = !role.end;

  return (
    <div className={`tl-role ${current ? "is-current" : ""} ${isLast ? "is-last" : ""}`}>
      <span className="tl-dot" aria-hidden="true" />
      <button
        type="button"
        className="tl-role-head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>
          <span className="tl-role-title">{role.title}</span>
          <span className="tl-role-dates">
            {formatMonth(role.start)} – {formatMonth(role.end)}
            <span className="tl-sep">·</span>
            {formatMonths(monthsBetween(role.start, role.end))}
            <span className="tl-sep">·</span>
            {role.type}
          </span>
        </span>
        <span className="tl-role-right">
          {current && <span className="now-badge"><span className="pulse-dot" /> Now</span>}
          <BsChevronDown className={`tl-chevron ${open ? "is-open" : ""}`} />
        </span>
      </button>
      <div className={`tl-collapse ${open ? "is-open" : ""}`}>
        <div>
          <ul className="tl-highlights">
            {role.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="skill-chips">
            {role.skills.map((s) => (
              <span className="skill-chip" key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const firstStart = experiences[experiences.length - 1].roles.slice(-1)[0].start;
  const totalExp = formatMonths(monthsBetween(firstStart, null));

  return (
    <Container style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Reveal as="h1" className="project-heading">
        Work <strong className="purple">Experience</strong>
      </Reveal>
      <p className="project-subheading">
        {totalExp} of building products for the web. Click a role to expand it.
      </p>
      <Row style={{ justifyContent: "center" }}>
        <Col lg={10}>
          {experiences.map((exp, i) => {
            const companyStart = exp.roles[exp.roles.length - 1].start;
            const companyEnd = exp.roles[0].end;
            return (
              <Reveal key={exp.company} delay={i * 100} className="exp-company glass-card">
                <div className="exp-company-head">
                  <div className="exp-logo" aria-hidden="true">{exp.initials}</div>
                  <div className="exp-company-info">
                    <h3>{exp.company}</h3>
                    <p className="exp-tagline">{exp.tagline}</p>
                    <p className="exp-meta">
                      <FaMapMarkerAlt /> {exp.location}
                      <span className="tl-sep">·</span>
                      {exp.workType}
                      <span className="tl-sep">·</span>
                      {formatMonths(monthsBetween(companyStart, companyEnd))}
                    </p>
                  </div>
                </div>

                <div className="tl">
                  {exp.roles.map((role, r) => (
                    <Role key={role.title + role.start} role={role} isLast={r === exp.roles.length - 1} />
                  ))}
                </div>

                {exp.award && (
                  <div className="exp-award">
                    <FaTrophy />
                    <span>{exp.award}</span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default Experience;
