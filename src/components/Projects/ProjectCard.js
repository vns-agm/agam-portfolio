import React from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Screenshot from "../ui/Screenshot";
import ParallaxReveal from "../motion/ParallaxReveal";

// A project presented like a product: framed screenshot, category, name,
// one-line summary, description, stack and links. `layout="feature"` puts the
// image and text side by side (with key features) for featured projects on the
// home page; `reverse` mirrors it so consecutive features alternate.
function ProjectCard({ project, layout = "card", index, headingLevel = 3, reverse = false }) {
  const Heading = `h${headingLevel}`;
  const { title, category, summary, description, stack, image, live, repo, featured, highlights } = project;
  const isFeature = layout === "feature";

  return (
    <article className={`work-card work-card-${layout} ${reverse ? "is-reversed" : ""}`}>
      <a
        className="work-media"
        href={live || repo}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        {isFeature ? (
          <ParallaxReveal>
            <Screenshot src={image} alt="" ratio="4 / 3" />
          </ParallaxReveal>
        ) : (
          <Screenshot src={image} alt="" ratio="16 / 10" />
        )}
      </a>

      <div className="work-body">
        <div className="work-meta">
          {typeof index === "number" && <span className="mono">{String(index + 1).padStart(2, "0")}</span>}
          <span>{category}</span>
          {featured && !isFeature && <span className="featured-badge">Featured</span>}
        </div>
        <Heading className="work-title">
          <a href={live || repo} target="_blank" rel="noreferrer">
            {title}
          </a>
        </Heading>
        <p className="work-summary">{summary}</p>
        {isFeature && <p className="work-description">{description}</p>}
        {isFeature && highlights && (
          <ul className="work-highlights" aria-label="Key features">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <ul className="tags" aria-label="Built with">
          {stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="work-links">
          {live && (
            <a className="link" href={live} target="_blank" rel="noreferrer">
              Visit live site <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only">for {title}</span>
            </a>
          )}
          {repo && (
            <a className="link link-quiet" href={repo} target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" /> Source
              <span className="sr-only">code for {title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
