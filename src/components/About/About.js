import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import PageHeader from "../ui/PageHeader";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../Reveal";
import LazyImage from "../LazyImage";
import GatewayFlow from "../ui/GatewayFlow";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Experience from "./Experience";
import trophies from "../../Assets/opt/trophies.jpg";
import { YEARS_EXPERIENCE } from "../../data/site";

const INTERESTS = ["Playing chess", "Reading", "Travelling", "Driving"];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            An engineer who thinks a few <em>moves ahead.</em>
          </>
        }
        lead={`${YEARS_EXPERIENCE}+ years of building production web applications and cloud services, shaped by a lifetime of competitive chess.`}
      />

      <section className="section story" aria-label="Story">
        <div className="container story-grid">
          <Reveal className="story-body">
            <p className="lead">
              I'm Agam Srivastava, from Varanasi, India. I studied Computer Science (B.Tech, 2018–2022) at Shri Ramswaroop
              Memorial University.
            </p>
            <p>
              My career began in January 2022 as a Research &amp; Development intern at mFilterIt, a product-based AdTech
              company. Over three years and eight months I grew from intern to Software Engineer, and then to Senior
              Software Engineer, building dashboards, micro-frontends and the services behind them.
            </p>
            <p>
              Today I'm a Senior Software Engineer at Sopra Steria in the Aeroline unit, developing and managing
              microservices for Airbus on the Aircraft Cabin program.
            </p>

            <div className="story-interests">
              <h2 className="eyebrow">Away from the keyboard</h2>
              <ul className="tags">
                {INTERESTS.map((i) => (
                  <li key={i} className="tag">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="pull-quote">
              <p>“You are never too old to set another goal or to dream a new dream.”</p>
              <cite>C.S. Lewis</cite>
            </blockquote>
          </Reveal>

          <Reveal as="figure" className="story-figure">
            <div className="story-photo">
              <LazyImage src={trophies} alt="Chess trophies, medals and certificates from state and national tournaments" />
            </div>
            <figcaption className="muted">
              Trophies from state and national chess events, including three appearances for Uttar Pradesh at the
              Nationals.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section section-rule" aria-labelledby="flow-title">
        <div className="container">
          <SectionHeader
            eyebrow="How I build"
            title={
              <span id="flow-title">
                Many services. One <em>dependable</em> system.
              </span>
            }
            lead="Event streams, queues, APIs and interfaces all flow into one place. Most of my work is making that convergence predictable. Click anywhere in the field to send a ripple through it."
          />
          <Reveal as="figure" className="flow-band">
            <GatewayFlow>
              <div className="flow-core">
                <span className="flow-node" aria-hidden="true">
                  AS
                </span>
              </div>
            </GatewayFlow>
            <figcaption className="flow-caption">
              <span>Kafka</span>
              <span>Redis</span>
              <span>AWS SQS/SNS</span>
              <span>REST APIs</span>
              <span>Micro-frontends</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section section-rule" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeader
            eyebrow="Capabilities"
            title={<span id="capabilities-title">The tools I reach for.</span>}
            lead="A primary stack I use every day, and the tooling that keeps delivery fast and dependable."
          />
          <div className="stack-columns">
            <Techstack />
            <Toolstack />
          </div>
        </div>
      </section>

      <Experience />

      <section className="section" aria-label="Code activity">
        <div className="container">
          <Reveal className="teaser">
            <div>
              <span className="eyebrow">Activity</span>
              <h2 className="title-sm">Curious what I'm building right now?</h2>
              <p className="muted">Browse my GitHub commits month by month, live from the GitHub API.</p>
            </div>
            <Link to="/activity" className="btn btn-primary">
              See code activity <FiArrowRight className="arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default About;
