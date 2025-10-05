// Footer.jsx
import React, { useRef, useState, useEffect } from "react";
import "./Footer.css";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/*
  Environment / fallback values
  Make sure to set these in your .env as:
  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID_ADMIN,
  VITE_EMAILJS_TEMPLATE_ID_CUSTOMER, VITE_EMAILJS_PUBLIC_KEY
*/
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_oc7r6q8";
const TEMPLATE_ID_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN || "template_9jrtorq";
const TEMPLATE_ID_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER || "template_wdlixie";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "ufL4L475kqoQn_dO6";

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
    mail: "careercraftweb@gmail.com",
  },
}) {
  const formRef = useRef(null);
  const [modal, setModal] = useState({ open: false, type: "info", message: "" });
  const [sending, setSending] = useState(false);
  const timeoutRef = useRef(null);

  // Initialize EmailJS once
  useEffect(() => {
    try {
      if (PUBLIC_KEY && typeof emailjs.init === "function") {
        emailjs.init(PUBLIC_KEY);
      }
    } catch (err) {
      console.error("EmailJS init error:", err);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function showModal(type, message, autoClose = 3500) {
    setModal({ open: true, type, message });
    if (autoClose) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setModal({ open: false, type: "info", message: "" });
        timeoutRef.current = null;
      }, autoClose);
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name ? e.target.elements.name.value.trim() : "";
    const email = e.target.elements.email ? e.target.elements.email.value.trim() : "";
    const phoneEl = e.target.elements.phone;
    const phone = phoneEl ? phoneEl.value.trim() : "";

    if (!name || !email) {
      showModal("error", "Please fill Name and Email to subscribe.");
      return;
    }

    setSending(true);

    const now = new Date();
    const date = now.toLocaleString();
    const year = now.getFullYear();

    // Params for admin (you)
    const adminParams = {
      name,
      email,
      phone,
      brand,
      date,
      year,
      // Optionally include reply_to so you can reply directly to the user from your inbox
      reply_to: email,
    };

    // Params for customer (subscriber)
    const customerParams = {
      name,
      email,
      brand,
      date,
      year,
      support_email: socialLinks.mail || "careercraftweb@gmail.com",
      // If your customer template expects to_email variable, include it:
      to_email: email,
    };

    try {
      // Send both emails in parallel: admin notification + user welcome
      await Promise.all([
        // admin notification (sent to your inbox via the admin template)
        emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminParams, PUBLIC_KEY),
        // customer welcome (template should be configured to send to {{email}} or use to_email)
        emailjs.send(SERVICE_ID, TEMPLATE_ID_CUSTOMER, customerParams, PUBLIC_KEY),
      ]);

      setSending(false);
      showModal("success", "Subscription successful! Emails sent ✅");
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error (one or both sends failed):", err);
      setSending(false);
      showModal("error", "Subscription saved but failed to send emails. Try again later.");
    }
  };

  return (
    <>
      <footer className="pm-footer" role="contentinfo">
        <div className="max">
          <div className="pm-row">
            {/* Brand & Subscribe */}
            <div className="pm-brand">
              <a href="/" className="brand-link" aria-label={`${brand} homepage`}>
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
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="subscribe-input"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="subscribe-input"
                />
                {/* Uncomment to collect phone:
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="subscribe-input"
                /> */}
                <button type="submit" className="subscribe-btn" disabled={sending}>
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
                    <li key={link.href + link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>More</h4>
                <ul>
                  {navLinks.slice(3).map((link) => (
                    <li key={link.href + link.label}>
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
                Built with ❤️ by <strong>{brand}</strong>. Responsive · Accessible · Beautiful.
              </p>
            </div>
          </div>

          <div className="pm-bottom">
            <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Popup message */}
      {modal.open && (
        <div className="pm-modal-overlay">
          <div className={`pm-modal pm-modal-${modal.type}`}>
            <p>{modal.message}</p>
            <button
              onClick={() => setModal({ open: false, type: "info", message: "" })}
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
