import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import "./alert.css";

import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  // Track input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { name, email, project } = formData;

    if (name.trim() && email.trim() && project.trim()) {
      emailjs
        .sendForm("service_f9f6ffx", "template_2t6pr9l", form.current, {
          publicKey: "oQjjRjplihvV0zZOA",
        })
        .then(() => {
          // Show Alert
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000); // 3 sec auto close

          // Reset form + state
          setFormData({ name: "", email: "", project: "" });
          e.target.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
        });
    }
  };

  return (
    <section className="contact section" id="contact-data">
      <h2 className="section__title">Get in touch</h2>
      <span className="section__subtitle">Contact Me</span>

      <div className="contact__container container grid">
        {/* Contact Info */}
        <div className="contact__content">
          <h3 className="contact__title">Talk to me</h3>
          <div className="contact__info">
            {/* Email */}
            <div className="contact__card">
              <i className="bx bx-mail-send contact__card-icon" id="email"></i>
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">
                vishnu.jangam117@gmail.com
              </span>
              <a
                href="mailto:vishnu.jangam117@gmail.com"
                className="contact__button"
              >
                <button>
                  Message
                  <i className="bx bx-right-arrow-alt contact__button-icon"></i>
                </button>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact__card">
              <i
                className="bx bxl-whatsapp contact__card-icon"
                id="whatsapp"
              ></i>
              <h3 className="contact__card-title">Whatsapp</h3>
              <span className="contact__card-data">+91 79890 06946</span>
              <a
                href="https://api.whatsapp.com/send?phone=7989006946&text=Hello, more information!"
                className="contact__button"
              >
                <button>
                  Message
                  <i className="bx bx-right-arrow-alt contact__button-icon"></i>
                </button>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="contact__card">
              <i className="fab fa-linkedin contact-icon" id="linkedin"></i>
              <h3 className="contact__card-title">LinkedIn</h3>
              <span className="contact__card-data">
                VISHNU VARDHAN JANGAM
              </span>
              <a
                href="https://www.linkedin.com/in/vishnu-vardhan-jangam-a04550258/"
                className="contact__button"
              >
                <button>
                  Connect
                  <i className="bx bx-right-arrow-alt contact__button-icon"></i>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact__content">
          <h3 className="contact__title">Write me your project</h3>
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            {/* Name */}
            <div className="contact__form-div">
              <label className="contact__form-tag">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="contact__form-input"
                placeholder="Insert your name"
                required
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="contact__form-div">
              <label className="contact__form-tag">Mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="contact__form-input"
                placeholder="Insert your email"
                required
                onChange={handleChange}
              />
            </div>

            {/* Project */}
            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Project</label>
              <textarea
                name="project"
                value={formData.project}
                cols="30"
                rows="10"
                className="contact__form-input"
                placeholder="Write your Project"
                required
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="button button--flex">
              Send Message
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                  stroke="var(--container-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </form>

          {/* Custom Alert */}
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="alert-overlay"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="alert-box"
                >
                  <p className="alert-message">Data Saved ✅</p>
                  <button onClick={() => setShowAlert(false)}>OK</button>



                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
