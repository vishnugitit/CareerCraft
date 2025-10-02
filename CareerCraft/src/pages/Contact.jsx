import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  // Replace these with your EmailJS service/template IDs
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    preferredTemplate: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.email.trim()) errs.email = "Please enter your email.";
    // simple email regex
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Please enter a valid email.";
    if (!form.message.trim())
      errs.message = "Tell me about the project (1–2 lines).";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setStatus({ loading: true, success: null, message: "" });

    // Prepare template params for EmailJS. Update keys to match your template variables.
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      role: form.role,
      preferred_template: form.preferredTemplate,
      timeline: form.timeline,
      budget: form.budget,
      message: form.message,
      // optional: we can include a dashboard link or client id later
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus({
        loading: false,
        success: true,
        message: "Thanks — your request has been sent! I'll contact you soon.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        preferredTemplate: "",
        timeline: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus({
        loading: false,
        success: false,
        message:
          "Something went wrong sending the message. You can also contact me directly at hello@portfoliomate.com or via WhatsApp.",
      });
    }
  }

  return (
    <section className="contact-builder-section" id="contact">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-lg-6">
            <h2 className="cb-title">Let's build your portfolio</h2>
            <p className="cb-sub">
              Share a few details and I'll get back with a proposal and
              timeline.
            </p>

            <form className="cb-form" onSubmit={handleSubmit} noValidate>
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <label className="form-label">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Email *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="you@example.com"
                    type="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Role / Title</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Frontend Developer, Designer..."
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Preferred template (optional)
                  </label>
                  <input
                    name="preferredTemplate"
                    value={form.preferredTemplate}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. Modern Minimal"
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label">Timeline</label>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="1-2 weeks">1–2 weeks</option>
                    <option value="2-4 weeks">2–4 weeks</option>
                    <option value="1+ month">1+ month</option>
                  </select>
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label">Budget</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Under $50">Under $50</option>
                    <option value="$50 - $150">$50–$150</option>
                    <option value="$150+">$150+</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    placeholder="Describe what you want — sections, features, or examples."
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                <div className="col-12 d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary cb-submit-btn"
                    disabled={status.loading}
                  >
                    {status.loading ? "Sending..." : "Request a Quote"}
                  </button>
                </div>

                {status.message && (
                  <div className={`col-12 mt-2`}>
                    <div
                      className={`alert ${
                        status.success ? "alert-success" : "alert-danger"
                      }`}
                      role="alert"
                    >
                      {status.message}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-6">
            <div className="cb-side">
              <h5>Quick contact</h5>
              <p>Prefer a faster reply? Use WhatsApp or email directly.</p>

              <div className="d-flex flex-column gap-2">
                <a
                  className="btn btn-outline-dark d-flex align-items-center gap-2"
                  href="mailto:hello@portfoliomate.com"
                >
                  <FaEnvelope /> Email: hello@portfoliomate.com
                </a>

                <a
                  className="btn btn-success d-flex align-items-center gap-2"
                  href="https://wa.me/911234567890" // replace with your number
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>

                <a className="btn btn-lg btn-primary mt-3" href="/get-started">
                  Start Building Now 🚀
                </a>
              </div>

              <hr />

              <div>
                <h6>What to include</h6>
                <ul className="cb-tips">
                  <li>Link to your current resume or portfolio (if any)</li>
                  <li>Which sections you want (About, Experience, Projects)</li>
                  <li>Preferred templates or color/style</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
