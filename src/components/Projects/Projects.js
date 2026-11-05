import React, { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import PerspectiveTunnel from "../ui/PerspectiveTunnel";
import Reveal from "../Reveal";
import { CATEGORIES, PROJECTS } from "../../data/projects";

const FILTERS = ["All", ...CATEGORIES];

// The tunnel shows every project as a card; each opens the live site.
const TUNNEL_ITEMS = PROJECTS.map((p) => ({
  title: p.title,
  image: p.image,
  href: p.live || p.repo,
  meta: p.category,
}));

function Projects() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const countFor = (f) => (f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length);

  return (
    <>
      <PerspectiveTunnel
        items={TUNNEL_ITEMS}
        eyebrow="Work"
        title={
          <>
            Selected <em>projects</em>
          </>
        }
        lead="Products, interfaces and early experiments, from publishing platforms to operations software for a chess academy. Each one is live, so try them yourself."
        prompt="Scroll to fly through"
      />

      <section className="section work-index" aria-label="Projects">
        <div className="container">
          <div className="filter-bar" role="toolbar" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-chip ${filter === f ? "is-active" : ""}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="filter-count">{countFor(f)}</span>
              </button>
            ))}
          </div>

          <div className="work-grid" key={filter}>
            {visible.map((project, i) => (
              <Reveal key={project.slug} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                <ProjectCard project={project} index={PROJECTS.indexOf(project)} headingLevel={2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
