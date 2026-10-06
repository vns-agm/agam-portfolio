import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone, AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
import Particle from "../Particle";
import Reveal from "../Reveal";
import LazyImage from "../LazyImage";
import trophies from "../../Assets/trophies.png";

const EMAIL = "agamsrivastavavns1193@gmail.com";
const PHONE = "+91 8687522809";

function ContactRow({ Icon, label, value, href }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
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
            if (!ok) return;
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div className="contact-row">
            <a href={href} className="contact-link">
                <Icon className="contact-icon" />
                <span>
                    <small>{label}</small>
                    <strong className="purple">{value}</strong>
                </span>
            </a>
            <button
                type="button"
                className={`copy-btn ${copied ? "is-copied" : ""}`}
                onClick={copy}
                aria-label={`Copy ${label.toLowerCase()}`}
            >
                {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
        </div>
    );
}

function Contact() {
    return (
        <Container className="about-section">
            <Particle />
                <Row style={{ justifyContent: "center", padding: "5px" }}>
                    <Reveal
                        as={Col}
                        md={7}
                        direction="left"
                        style={{
                            justifyContent: "center",
                            paddingBottom: "50px",
                        }}
                    >
                        <h4 style={{ fontSize: "1.2em", paddingBottom: "20px" }}>
                            <p>
                                Welcome to my website!
<br/>
                                If you have any questions, comments, or feedback, I would love to hear from you! <br/>
                                 Your input is invaluable to me, so please don't hesitate to reach out.
                            </p>
                        </h4>
                        <ContactRow Icon={AiOutlineMail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
                        <ContactRow Icon={AiOutlinePhone} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s/g, "")}`} />
                        <h4 style={{ fontSize: "1.2em", paddingTop: "20px" }}>
                            <p>
                                Looking forward to connecting with you!<br/>
                                <br/>
                                Warm regards,<br/>
                                Agam Srivastava
                            </p>
                        </h4>
                    </Reveal>
                    <Reveal
                        as={Col}
                        md={5}
                        direction="right"
                        delay={150}
                        className="about-img"
                    >
                        <LazyImage src={trophies} alt="Chess trophies" className="img-fluid float-slow" />
                    </Reveal>
                </Row>
        </Container>
    );
}

export default Contact;
