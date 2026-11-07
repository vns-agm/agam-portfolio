import React, { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiMail, FiPhone } from "react-icons/fi";
import PageHeader from "../ui/PageHeader";
import Reveal from "../Reveal";
import { PERSON, RESUME, SOCIALS } from "../../data/site";
import SketchPortrait from "./SketchPortrait";
import portrait from "../../Assets/opt/agam-portrait.jpg";

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (e) {
    // Clipboard API can be blocked; fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  }
}

function ContactRow({ Icon, label, value, href }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="contact-row">
      <a href={href} className="contact-link">
        <Icon className="contact-icon" aria-hidden="true" />
        <span>
          <small>{label}</small>
          <strong>{value}</strong>
        </span>
      </a>
      <button
        type="button"
        className={`btn btn-secondary btn-sm copy-btn ${copied ? "is-copied" : ""}`}
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let's <em>talk.</em>
          </>
        }
        lead="Questions, ideas or opportunities. I read everything and usually reply within a day or two."
      />

      <section className="section contact" aria-label="Contact details">
        <div className="container contact-grid">
          <Reveal className="contact-primary">
            <p className="contact-availability">
              <span className="status-dot" aria-hidden="true" />
              Open to conversations about full-stack, cloud and product engineering roles.
            </p>
            <ContactRow Icon={FiMail} label="Email" value={PERSON.email} href={`mailto:${PERSON.email}`} />
            <ContactRow
              Icon={FiPhone}
              label="Phone"
              value={PERSON.phone}
              href={`tel:${PERSON.phone.replace(/\s/g, "")}`}
            />
            <p className="muted contact-signoff">
              Looking forward to hearing from you.
              <br />— {PERSON.name}
            </p>
          </Reveal>

          <Reveal as="aside" className="contact-side" aria-label="Elsewhere">
            <SketchPortrait
              src={portrait}
              alt="Agam Srivastava holding a gold medal and certificate on the podium at The Chess Conquerors' Cup 2025, DLF Mall of India, Noida"
              caption={
                <>
                  <span className="mono">01 · 2025</span>
                  <span>Gold at The Chess Conquerors' Cup, Noida</span>
                </>
              }
            />
            <h2 className="eyebrow no-rule">Elsewhere</h2>
            <ul className="contact-links">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    <span>{s.label}</span>
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href={RESUME.href} download={RESUME.fileName}>
                  <span>Résumé (PDF)</span>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Contact;
