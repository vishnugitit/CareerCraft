import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row align-items-center gy-3">
          {/* Left side links */}
          <div className="col-12 col-md-6 d-flex flex-wrap justify-content-center justify-content-md-start gap-3 footer-links">
            <a href="#about">About</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Right side social icons */}
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-3 footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-3 footer-tagline">
          <small>© 2025 Portfolio Mate. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
}
