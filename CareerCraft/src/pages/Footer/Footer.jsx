import React, { useRef, useState } from "react";
import "./Footer.css";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// ⚙️ Replace these with your actual EmailJS credentials
const SERVICE_ID = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY = "your_public_key";

export default function Footer({
  brand = "Career Craft",
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ],
  socialLinks = {
    linkedin: "#",
    github: "#",
    twitter: "#",
    mail: "hello@portfolio-mate.com",
  },
}) {
  const formRef = useRef(null);
  const [modal, setModal] = useState({
    open: false,
    type: "info",
    message: "",
  });
  const [sending, setSending] = useState(false);

  function showModal(type, message, autoClose = 3500) {
    setModal({ open: true, type, message });
    if (autoClose)
      setTimeout(
        () => setModal({ open: false, type: "info", message: "" }),
        autoClose
      );
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const phone = e.target.elements.phone.value.trim();

    if (!email || !phone) {
      showModal("error", "Please fill both Email and Phone to subscribe.");
      return;
    }

    setSending(true);
    const templateParams = {
      email,
      phone,
      brand,
      date: new Date().toLocaleString(),
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setSending(false);
        showModal("success", "Data saved & email sent successfully ✅");
        e.target.reset(); // clears the inputs
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setSending(false);
        showModal("error", "Error sending email. Please try again later.");
      });
  };

  return (
    <>
      <footer className="pm-footer" role="contentinfo">
        <div className="max">
          <div className="pm-row">
            {/* Brand & Subscribe */}
            <div className="pm-brand">
              <a
                href="/"
                className="brand-link"
                aria-label={`${brand} homepage`}
              >
                <div className="logo">PM</div>
                <div className="brand-text">
                  <h3>{brand}</h3>
                  <p>Create beautiful resumes & portfolios in minutes.</p>
                </div>
              </a>

              <form
                ref={formRef}
                onSubmit={handleSubscribe}
                className="subscribe-form-vertical"
                aria-label="Subscribe form"
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="subscribe-input"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="subscribe-input"
                />
                <button
                  type="submit"
                  className="subscribe-btn"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Navigation */}
            <nav className="pm-nav" aria-label="Footer navigation">
              <div>
                <h4>Explore</h4>
                <ul>
                  {navLinks.slice(0, 3).map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>More</h4>
                <ul>
                  {navLinks.slice(3).map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Social */}
            <div className="pm-social">
              <h4>Follow</h4>
              <div className="icons">
                <SocialIcon href={socialLinks.linkedin} label="LinkedIn">
                  <Linkedin size={18} />
                </SocialIcon>
                <SocialIcon href={socialLinks.github} label="GitHub">
                  <Github size={18} />
                </SocialIcon>
                <SocialIcon href={socialLinks.twitter} label="Twitter">
                  <Twitter size={18} />
                </SocialIcon>
                <SocialIcon href={`mailto:${socialLinks.mail}`} label="Email">
                  <Mail size={18} />
                </SocialIcon>
              </div>
              <p className="meta">
                Built with ❤️ by <strong>{brand}</strong>. Responsive ·
                Accessible · Beautiful.
              </p>
            </div>
          </div>

          <div className="pm-bottom">
            <p>
              © {new Date().getFullYear()} {brand}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Popup message */}
      {modal.open && (
        <div className="pm-modal-overlay">
          <div className={`pm-modal pm-modal-${modal.type}`}>
            <p>{modal.message}</p>
            <button
              onClick={() =>
                setModal({ open: false, type: "info", message: "" })
              }
              className="pm-modal-close"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="social-icon"
    >
      {children}
    </motion.a>
  );
}
