import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaLayerGroup,
  FaDollarSign,
  FaEnvelope,
  FaPlay,
  FaBell,
} from "react-icons/fa";
import logo from "../Header/Logo.png"; // adjust path if needed
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const root = document.documentElement;

    function updateHeaderOffset() {
      const header = document.querySelector(".pm-header");
      const headerHeight = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 80;
      root.style.setProperty("--header-height-runtime", `${headerHeight}px`);
      root.style.scrollPaddingTop = `calc(${headerHeight}px + 8px)`; // reduced spacing
    }

    updateHeaderOffset();
    window.addEventListener("resize", updateHeaderOffset);

    function onDocClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const header = document.querySelector(".pm-header");
      const headerHeight = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 80;
      const extraGap = 8;
      const top =
        window.pageYOffset +
        target.getBoundingClientRect().top -
        headerHeight -
        extraGap;

      try {
        window.history.pushState(null, "", hash);
      } catch (err) {}

      window.scrollTo({ top, behavior: "smooth" });
      if (menuOpen) setMenuOpen(false);
    }

    document.addEventListener("click", onDocClick, { passive: false });
    const fontTimeout = setTimeout(updateHeaderOffset, 800);

    return () => {
      window.removeEventListener("resize", updateHeaderOffset);
      document.removeEventListener("click", onDocClick);
      clearTimeout(fontTimeout);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="pm-header">
        <div className="container nav-container">
          {/* Left side: Logo */}
          <div className="logo-wrap">
            <img src={logo} alt="Portfolio Mate Logo" className="logo-img" />
            <span className="brand-text">Career Craft</span>
          </div>

          {/* Right side: Navbar links (Desktop) */}
          <nav className="navbar-right">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#templates" className="nav-link">
              Templates
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
           
            <a href="#GetStarted" className="btn-primary">
              Get Started
            </a>
 <a href="#contact-data" className="nav-link">
              Contact
            </a>

            <a href="#subscribed" className="nav-link">
              Subscribe
            </a>
          </nav>

          {/* Mobile hamburger / close button */}
          <button
            className="btn-outline-secondary d-lg-none"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FaTimes size={18} color="red" />
            ) : (
              <FaBars size={18} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu with icons */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <ul>
          <li>
            <a href="#home" onClick={closeMenu}>
              <FaHome className="menu-icon" /> Home
            </a>
          </li>
          <li>
            <a href="#templates" onClick={closeMenu}>
              <FaLayerGroup className="menu-icon" /> Templates
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={closeMenu}>
              <FaDollarSign className="menu-icon" /> Pricing
            </a>
          </li>
           <li>
            <a
              href="#GetStarted"
              // className="menu-getstarted"
              onClick={closeMenu}
            >
              <FaPlay className="menu-icon" /> Get Started
            </a>
          </li>
          <li>
            <a href="#contact-data" onClick={closeMenu}>
              <FaEnvelope className="menu-icon" /> Contact
            </a>
          </li>

          {/* <li>
            <a
              href="#GetStarted"
              className="menu-getstarted"
              onClick={closeMenu}
            >
              <FaPlay className="menu-icon" /> Get Started
            </a> */}
          {/* </li> */}
         

          <li>
            <a href="#subscribed" onClick={closeMenu}>
              <FaBell className="menu-icon" /> Subscribe
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
