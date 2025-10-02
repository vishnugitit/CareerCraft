import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // custom styles (see file below)

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((s) => !s);
  const closeMenu = () => setOpen(false);

  return (
    <header className="pm-header sticky-top shadow-sm">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* Left - Logo */}
          <div className="d-flex align-items-center logo-wrap">
            <a href="/" className="brand d-flex align-items-center text-decoration-none">
              <span className="brand-mark" aria-hidden>PM</span>
              <span className="ms-2 brand-text">Portfolio Mate</span>
            </a>
          </div>

          {/* Middle - Nav (centered on md+) */}
          <nav className="d-none d-md-flex nav-center">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#templates">Templates</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          {/* Right - CTA */}
          <div className="d-flex align-items-center gap-2">
            <a href="#get-started" className="btn btn-primary d-none d-md-inline-block">Get Started</a>

            {/* Mobile Hamburger */}
            <button
              className="btn btn-outline-secondary d-md-none"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu (collapsible) */}
        <div className={`mobile-menu d-md-none ${open ? "open" : ""}`}>
          <ul className="list-unstyled mb-3">
            <li><a href="#home" onClick={closeMenu}>Home</a></li>
            <li><a href="#templates" onClick={closeMenu}>Templates</a></li>
            <li><a href="#pricing" onClick={closeMenu}>Pricing</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>

          <div className="mb-3">
            <a href="#get-started" className="btn btn-primary w-100" onClick={closeMenu}>Get Started</a>
          </div>
        </div>
      </div>
    </header>
  );
}
