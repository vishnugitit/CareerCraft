import React from "react";
import "./Features.css";
import {
  FaThLarge,
  FaSlidersH,
  FaFileDownload,
  FaShareAlt,
  FaEnvelopeOpenText,
  FaComments,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaThLarge />,
      title: "Responsive Templates",
      desc: "Choose from Basic / Pro / Premium templates that look great on every device.",
    },
    {
      icon: <FaSlidersH />,
      title: "Smart Customization",
      desc: "Instantly change colors, fonts, and layouts with live preview.",
    },
    {
      icon: <FaFileDownload />,
      title: "PDF & Web Export",
      desc: "Export a polished PDF or publish a live site with a single click.",
    },
    {
      icon: <FaShareAlt />,
      title: "One-Click Share Links",
      desc: "Generate shareable links to send directly to recruiters or clients.",
    },
    {
      icon: <FaEnvelopeOpenText />,
      title: "Integrated Communication",
      desc: "Built-in EmailJS contact forms and notifications — connect easily.",
    },
    {
      icon: <FaComments />,
      title: "Testimonials Module",
      desc: "Add client reviews and feedback to build credibility and trust.",
    },
  ];

  return (
    <section className="features-section" id="features" aria-labelledby="features-heading">
      <div className="features-inner">
        <header className="features-header">
          <h2 id="features-heading">Top Features</h2>
          <p className="subtitle">Everything you need to create and share a professional portfolio.</p>
        </header>

        <div className="features-grid" role="list">
          {features.map((f, idx) => (
            <article className="feature-card" role="listitem" key={idx}>
              <div className="feature-icon" aria-hidden>
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
