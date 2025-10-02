import React from "react";
import "./Features.css";
import { FaTools, FaGlobe, FaFilePdf, FaMobileAlt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaTools />,
      title: "Easy Portfolio Builder",
      desc: "Create professional portfolios in minutes using drag & drop tools and pre-designed templates."
    },
    {
      icon: <FaGlobe />,
      title: "Custom Domain & Hosting",
      desc: "Connect your own domain and enjoy secure, reliable hosting for your portfolio."
    },
    {
      icon: <FaFilePdf />,
      title: "Download as PDF",
      desc: "Export your portfolio and resume as a polished, shareable PDF instantly."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile-Friendly Design",
      desc: "Your portfolio looks stunning on desktops, tablets, and mobile devices."
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="container text-center">
        <h2 className="section-title">Features That Make You Shine</h2>
        <p className="section-subtitle mb-5">
          Portfolio Mate gives you everything you need to showcase your work and skills.
        </p>
        <div className="row g-4">
          {features.map((f, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h5>{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
