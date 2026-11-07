import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import Reveal from "../Reveal";
import SectionHeader from "../ui/SectionHeader";
import { LazyMotion, domAnimation, m } from "motion/react";
import AnimatedHeadline from "../motion/AnimatedHeadline";
import HeroVisual from "../motion/HeroVisual";
import Magnetic from "../motion/Magnetic";
import CountUp from "../motion/CountUp";
import Marquee from "../motion/Marquee";
import ScrollRevealText from "../motion/ScrollRevealText";
import RotatingText from "../motion/RotatingText";
import ScrollStatements from "../motion/ScrollStatements";
import ScrollIn from "../motion/ScrollIn";
import HeroZoom from "./HeroZoom";
import ProjectCard from "../Projects/ProjectCard";
import { FEATURED_PROJECTS } from "../../data/projects";
import { PERSON, RESUME, YEARS_EXPERIENCE } from "../../data/site";
import heroCrm from "../../Assets/opt/hero-crm.jpg";
import heroBlog from "../../Assets/opt/agam_blog.jpg";

// chess.js is ~95 KB, so the puzzle loads in its own chunk after the hero.
const ChessPuzzle = lazy(() => import("./ChessPuzzle"));

const FIGURES = [
  { to: YEARS_EXPERIENCE, decimals: YEARS_EXPERIENCE % 1 ? 1 : 0, suffix: "+", label: "Years building production software" },
  { to: 2, label: "Companies, from intern to senior engineer" },
  { to: 15, suffix: "+", label: "Projects designed, built and shipped" },
  { to: 1525, label: "FIDE rating, national-level chess" },
];

const HEADLINE = [
  [{ text: "I build calm," }],
  [{ text: "dependable software" }],
  [{ text: "for" }, { text: "complex", em: true, portal: "o" }, { text: "systems." }],
];

const STACK = [
  "React", "Angular", "Next.js", "Node.js", "NestJS", "TypeScript", "Kafka", "Redis",
  "AWS", "Docker", "MongoDB", "Distributed systems", "Micro-frontends", "REST APIs",
];

const CAPABILITIES = [
  { area: "Frontend", items: "Angular, React, Next.js, micro-frontends, component architecture" },
  { area: "Backend", items: "Node.js, NestJS, FastAPI, REST APIs, AWS API Gateway" },
  { area: "Distributed systems", items: "Kafka, Redis, event-driven microservices, AWS SQS/SNS" },
  { area: "Data", items: "MongoDB, DynamoDB, Redis, Firebase" },
  { area: "Cloud & DevOps", items: "AWS, Docker, shell scripting, CI/CD" },
  { area: "AI-assisted", items: "GitHub Copilot for faster, cleaner delivery" },
];

const ROLES = [
  { period: "2025 — Now", title: "Senior Software Engineer", org: "Sopra Steria", note: "Airbus Aircraft Cabin program" },
  { period: "2025", title: "Senior Software Engineer", org: "mFilterIt", note: "Dashboards and micro-frontends" },
  { period: "2022 — 2025", title: "Software Engineer", org: "mFilterIt", note: "Product engineering, AdTech" },
  { period: "2022", title: "R&D Intern", org: "mFilterIt", note: "Where it started" },
];

const STATEMENTS = [
  <>
    <em>{YEARS_EXPERIENCE}+ years</em> of shipping production software.
  </>,
  <>
    Event-driven systems on <em>Kafka, Redis and AWS.</em>
  </>,
  <>
    And the interfaces <em>people use every day.</em>
  </>,
];

function Home() {
  return (
    // LazyMotion + `m` keeps Motion's footprint on the landing page small:
    // only the DOM animation features are bundled, not the full motion component.
    <LazyMotion features={domAnimation}>
      {/* ---------- Hero: scroll dives through the "o" of "complex" ---------- */}
      <HeroZoom
        labelledBy="hero-title"
        hero={({ portalRef, fade, drift }) => (
          <div className="container hero-grid">
            <div className="hero-copy">
              <m.p className="hero-kicker rise" style={{ "--d": "0ms", opacity: fade, y: drift }}>
                <span className="status-dot" aria-hidden="true" />
                {PERSON.role} at {PERSON.company} · {PERSON.location}
              </m.p>
              <AnimatedHeadline
                id="hero-title"
                className="display hero-title"
                lines={HEADLINE}
                delay={0.15}
                portalRef={portalRef}
              />
              <m.div style={{ opacity: fade, y: drift }}>
                <p className="lead hero-lead rise" style={{ "--d": "650ms" }}>
                  I'm Agam, a full-stack engineer with {YEARS_EXPERIENCE}+ years of shipping production software
                  across React, Angular, Node.js and AWS, from cloud microservices and distributed systems to the
                  interfaces people use every day.
                </p>
                <div className="hero-actions rise" style={{ "--d": "780ms" }}>
                  <Magnetic>
                    <Link to="/project" className="btn btn-primary">
                      View selected work <FiArrowRight className="arrow" aria-hidden="true" />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a href={RESUME.href} download={RESUME.fileName} className="btn btn-secondary">
                      Download résumé <FiArrowDown className="arrow-down" aria-hidden="true" />
                    </a>
                  </Magnetic>
                </div>
              </m.div>
            </div>

            <m.div className="hero-zoom-visual" style={{ opacity: fade }}>
              <HeroVisual
                back={heroBlog}
                front={heroCrm}
                caption={
                  <>
                    <span className="mono">Featured</span> Agam's Blog &amp; Student CRM
                  </>
                }
              />
            </m.div>
          </div>
        )}
        next={(opened) => (
          <>
            <div className="container next-panel-inner">
              <span className="eyebrow">Zoomed in</span>
              <h2 className="title next-panel-title">
                {YEARS_EXPERIENCE}+ years of <em>complex</em>, up close.
              </h2>
              <dl className="figures">
                {FIGURES.map((f) => (
                  <div className="figure" key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="figure-value">
                      <CountUp to={f.to} decimals={f.decimals} suffix={f.suffix} play={opened} />
                    </dd>
                    <dd className="figure-label">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Marquee items={STACK} label="Technologies I work with" />
          </>
        )}
      />

      {/* ---------- Selected work ---------- */}
      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <SectionHeader
            eyebrow="Selected work"
            title={
              <span id="work-title">
                Products, taken from <span className="sr-only">idea</span>
                <RotatingText phrases={["idea", "schema", "API", "interface", "first commit"]} interval={2200} />
                <br />
                to production.
              </span>
            }
            action={
              <Link to="/project" className="link">
                All projects <FiArrowRight aria-hidden="true" />
              </Link>
            }
          />
          {FEATURED_PROJECTS.map((p, i) => (
            <ScrollIn key={p.slug} variant={i % 2 ? "right" : "left"}>
              <ProjectCard project={p} layout="feature" index={i} reverse={i % 2 === 1} />
            </ScrollIn>
          ))}
          <Reveal className="more-work">
            <p className="muted">
              Plus six more, from a customisable data table to early experiments with maps and geolocation.
            </p>
            <Link to="/project" className="btn btn-secondary btn-sm">
              Browse all projects <FiArrowRight className="arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Pinned statements ---------- */}
      <ScrollStatements eyebrow="In short" statements={STATEMENTS} />

      {/* ---------- Introduction ---------- */}
      <section className="section section-rule intro" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <ScrollIn className="intro-statement" variant="left">
            <span className="eyebrow">Introduction</span>
            <ScrollRevealText
              id="intro-title"
              className="title"
              segments={[
                { text: "Good software feels simple, even when the system" },
                { text: "behind it isn't.", em: true },
              ]}
            />
          </ScrollIn>
          <ScrollIn className="intro-body" variant="right">
            <p className="lead">
              Before Sopra Steria, I spent nearly four years at mFilterIt, growing from R&amp;D intern to Senior Software
              Engineer. I built end-to-end products there and was recognised with quarterly excellence awards.
            </p>
            <p>
              Off the keyboard I'm a{" "}
              <a className="prose-link" href="https://ratings.fide.com/profile/25662210" target="_blank" rel="noreferrer">
                national-level chess player
              </a>
              . Chess shapes how I approach system design: think several moves ahead, and plan for the edge cases
              before they arrive.
            </p>

            <dl className="capabilities">
              {CAPABILITIES.map((c) => (
                <div key={c.area} className="capability">
                  <dt>{c.area}</dt>
                  <dd>{c.items}</dd>
                </div>
              ))}
            </dl>
          </ScrollIn>
        </div>
      </section>

      {/* ---------- Experience snapshot ---------- */}
      <section className="section" aria-labelledby="exp-title">
        <div className="container">
          <SectionHeader
            eyebrow="Experience"
            title={<span id="exp-title">Four roles, two companies, one steady climb.</span>}
            action={
              <Link to="/about" className="link">
                Full experience <FiArrowRight aria-hidden="true" />
              </Link>
            }
          />
          <ol className="roles">
            {ROLES.map((r, i) => (
              <ScrollIn as="li" variant={i % 2 ? "right" : "left"} className="role-row" key={r.period + r.title}>
                <span className="role-period mono">{r.period}</span>
                <span className="role-title">{r.title}</span>
                <span className="role-org">{r.org}</span>
                <span className="role-note">{r.note}</span>
              </ScrollIn>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Chess puzzle ---------- */}
      <section className="section" aria-label="Chess puzzle">
        <div className="container">
          <ScrollIn variant="zoom">
            <Suspense fallback={<div className="puzzle puzzle-placeholder" aria-hidden="true" />}>
              <ChessPuzzle />
            </Suspense>
          </ScrollIn>
        </div>
      </section>
    </LazyMotion>
  );
}

export default Home;
