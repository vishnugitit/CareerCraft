import React, { useState } from "react";
import "./FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How long does it take to build my portfolio?",
      a: "You can create a stunning portfolio in just a few minutes using our drag-and-drop builder and ready-made templates.",
    },
    {
      q: "Can I use my own domain?",
      a: "Yes, you can connect your custom domain easily with any of our paid plans.",
    },
    {
      q: "Is it mobile-friendly?",
      a: "Absolutely! Every template is fully responsive and looks great on any device.",
    },
    {
      q: "Do I need coding skills?",
      a: "No coding is required. Our intuitive builder lets you design and publish without writing a single line of code.",
    },
    {
      q: "Can I export my portfolio as a PDF?",
      a: "Yes, you can download your portfolio and resume as professional PDFs anytime.",
    },
    {
      q: "Is hosting included?",
      a: "Yes, all plans include secure hosting, so your portfolio is live instantly.",
    },
    {
      q: "Can I switch templates later?",
      a: "Definitely! You can change templates at any time without losing your content.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((item, i) => (
          <div
            className={`faq-item ${activeIndex === i ? "active" : ""}`}
            key={i}
          >
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              {item.q}
              {activeIndex === i ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className="faq-answer">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
