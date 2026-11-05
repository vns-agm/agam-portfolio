import React, { useState } from "react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../ui/PageHeader";
import Reveal from "../Reveal";
import { RESUME } from "../../data/site";

function Myresume() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Résumé"
        title={
          <>
            The <em>one-page</em> version.
          </>
        }
        lead="Experience, skills, certifications and awards. Read it here or take a copy with you."
      >
        <div className="hero-actions rise" style={{ "--d": "240ms" }}>
          <a href={RESUME.href} download={RESUME.fileName} className="btn btn-primary">
            Download PDF <FiArrowDown className="arrow-down" aria-hidden="true" />
          </a>
          <a href={RESUME.href} target="_blank" rel="noreferrer" className="btn btn-secondary">
            Open in new tab <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </PageHeader>

      <section className="section resume" aria-label="Résumé preview">
        <div className="container">
          <Reveal className={`resume-frame ${loaded ? "is-loaded" : ""}`}>
            {!loaded && <div className="resume-skeleton" aria-hidden="true" />}
            <iframe
              src={`${RESUME.href}#toolbar=0&view=FitH`}
              className="resume-iframe"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              title="Résumé preview"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Myresume;
