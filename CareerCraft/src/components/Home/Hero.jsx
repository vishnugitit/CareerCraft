import React from "react";
import "./Hero.css";
import logo from "./Logo.png";
import { Rocket, Layout, CheckCircle, FileText, Globe } from "lucide-react";

/*
  Short & sweet hero with pricing-style visual language:
  - Light gradient background
  - Dark text and strong contrast
  - Gradient CTA buttons (purple -> blue)
  - Feature list with relevant icons
  - Image-first on mobile, side-by-side on desktop
*/

export default function Hero({
  brand = {
    name: "Career Craft",
    tagline: "Your Career Companion",
    short:
      "Create a polished portfolio in minutes with pro templates, instant PDF export, and one-click publishing.",
    founded: "2024",
  },
  ctaPrimary = { label: "Get Started", href: "/get-started" },
  ctaSecondary = { label: "View Templates", href: "/templates" },
  mockImage = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop&s=7a7b38b7b8f2d3a1d6f3f3b1e0b16f1c",
}) {
  return (
    <header
      id="home"
      className="pm-hero"
      role="banner"
      aria-label={`${brand.name} hero`}
    >
      <div className="pm-hero-inner">
        {/* Image (first in DOM) */}
        <div className="hero-media">
          <div className="mock-browser-card">
            <div className="mock-topbar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <figure
              className="mock-frame"
              role="img"
              aria-label="Portfolio preview screenshot"
            >
              <img
                src={mockImage}
                alt="Portfolio preview"
                className="mock-image"
                loading="lazy"
              />
            </figure>

            <figcaption className="mock-caption">
              Ready-to-use templates for every profession.
            </figcaption>
          </div>
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="brand-row">
            {/* <div className="brand-badge">PM</div> */}
            {/* Logo Image */}
            <div className="brand-badge">
              <img src={logo} alt="Career Craft Logo" className="brand-logo" />
            </div>

            <div>
              <div className="brand-name">Career Craft</div>
              <div className="brand-tagline">{brand.tagline}</div>
            </div>
          </div>

          <h1 className="hero-headline">
            Create your portfolio — effortlessly
          </h1>

          <p className="hero-lead">{brand.short}</p>

          <ul className="features-list">
            <li>
              <CheckCircle className="feat-icon" /> 30+ professional templates
            </li>
            <li>
              <FileText className="feat-icon" /> Export to PDF & download
            </li>
            <li>
              <Globe className="feat-icon" /> Publish to custom domains
            </li>
          </ul>

          <div className="pm-cta">
            <a
              // href={ctaPrimary.href}
              href="#GetStarted"
              className="btn cta-primary"
              title="Get Started"
            >
              <Rocket size={16} /> <span>{ctaPrimary.label}</span>
            </a>

            <a
              // href={ctaSecondary.href}
              href="#templates"
              className="btn cta-secondary"
              title="View Templates"
            >
              <Layout size={16} /> <span>{ctaSecondary.label}</span>
            </a>
          </div>

          <div className="brand-meta">
            Founded {brand.founded} • Modern portfolios for professionals
          </div>
        </div>
      </div>
    </header>
  );
}
