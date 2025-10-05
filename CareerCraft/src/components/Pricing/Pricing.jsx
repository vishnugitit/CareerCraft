import React, { useState, useEffect, useMemo } from "react";
import "./Pricing.css";

// Swiper imports (Navigation removed - arrows hidden)
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
  FaSpinner,
  FaBars,
  FaMobileAlt,
  FaDownload,
  FaEnvelope,
  FaPalette,
  FaMoon,
  FaUsers,
  FaTachometerAlt,
  FaCheckCircle,
  FaRegHandshake,
} from "react-icons/fa";

export default function Pricing() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  const plans = useMemo(
    () => [
      {
        id: "basic",
        name: "Basic",
        price: "$8",
        highlight: "For starters",
        features: [
          "Custom CSS",
          "Flat colors",
          "Simple navbar",
          "View resume",
          "Simple hover & color effects",
          "Basic buttons & forms",
          "Social media links & icons",
          "Responsive design",
        ],
        popular: false,
      },
      {
        id: "pro",
        name: "Pro",
        price: "$12",
        highlight: "Most popular",
        features: [
          "Loader",
          "Smooth scroll navbar",
          "Bootstrap components (cards/ modals/ tabs)",
          "Transitions & animations",
          "Download resume",
          "Email JS integration",
          "Social media + favicons",
          "Responsive design",
        ],
        popular: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: "$18",
        highlight: "All features",
        features: [
          "Custom loader",
          "Dynamic Scroll navbar",
          "Dark / Light mode",
          "Tailwind CSS utilities",
          "Accordions",
          "View + download resume",
          "Email JS + Mobile SMS",
          "Contact form + social links",
          "Responsive design",
        ],
        popular: false,
      },
    ],
    []
  );

  // Enforce Basic -> Pro -> Premium
  const desiredOrder = useMemo(() => ["basic", "pro", "premium"], []);
  const sortedPlans = useMemo(() => {
    const map = new Map(plans.map((p) => [p.id, p]));
    return desiredOrder.map((id) => map.get(id)).filter(Boolean);
  }, [plans, desiredOrder]);

  function featureIcon(feature) {
    const s = feature.toLowerCase();
    if (s.includes("loader"))
      return <FaSpinner className="icon-spin" aria-hidden="true" />;
    if (s.includes("nav") || s.includes("navbar"))
      return <FaBars aria-hidden="true" />;
    if (s.includes("responsive")) return <FaMobileAlt aria-hidden="true" />;
    if (s.includes("download")) return <FaDownload aria-hidden="true" />;
    if (s.includes("email") || s.includes("sms") || s.includes("mobile"))
      return <FaEnvelope aria-hidden="true" />;
    if (
      s.includes("colors") ||
      s.includes("gradient") ||
      s.includes("paint") ||
      s.includes("theme")
    )
      return <FaPalette aria-hidden="true" />;
    if (s.includes("dark") || s.includes("light"))
      return <FaMoon aria-hidden="true" />;
    if (s.includes("testimonial") || s.includes("testimonials"))
      return <FaUsers aria-hidden="true" />;
    if (s.includes("drag") || s.includes("accord"))
      return <FaTachometerAlt aria-hidden="true" />;
    if (s.includes("social") || s.includes("icons") || s.includes("favicons"))
      return <FaRegHandshake aria-hidden="true" />;
    return <FaCheckCircle style={{ color: "#10b981" }} aria-hidden="true" />;
  }

  function handleChoose(plan) {
    if (typeof window !== "undefined")
      window.alert(`Selected plan: ${plan.name}`);
  }

  const fallback = (
    <div className="fallback-grid" role="list">
      {sortedPlans.map((p) => (
        <article
          key={p.id}
          className={`pricing-card ${p.popular ? "popular" : ""}`}
          data-plan={p.id}
          aria-labelledby={`${p.id}-title`}
          role="listitem"
        >
          {p.popular && <div className="badge-popular">{p.highlight}</div>}

          <header className="card-head">
            <div>
              <h3 id={`${p.id}-title`}>{p.name}</h3>
              <div className="sub">
                {p.popular ? "Popular choice" : "Great for professionals"}
              </div>
            </div>
            <div className="price">{p.price}</div>
          </header>

          <ul className="feature-list" role="list">
            {p.features.map((f, i) => (
              <li key={i}>
                <span className="f-icon">{featureIcon(f)}</span>
                <span className="f-text">{f}</span>
              </li>
            ))}
          </ul>

          <div className="card-cta">
            <button className="choose-btn" onClick={() => handleChoose(p)}>
              Choose {p.name}
            </button>
            <div className="small-note">Billed monthly. Cancel anytime.</div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section
      id="pricing"
      className="pricing-section"
      aria-label="Pricing plans"
    >
      <div className="pricing-inner">
        <div className="pricing-header">
          <h2>Pricing Plans</h2>
          <p className="lead">
            Choose the plan that fits your needs — upgrade anytime.
          </p>
        </div>

        <div className="pricing-swiper-wrap">
          {isClient ? (
            <Swiper
              modules={[Pagination, Autoplay, A11y]}
              loop={false}
              initialSlide={0}
              watchOverflow={true}
              grabCursor={true}
              pagination={{ clickable: true, type: "bullets" }}
              autoplay={{ delay: 4500, disableOnInteraction: true }}
              // explicit breakpoints: 1 slide on small, 2 on medium, 3 on desktop
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 12,
                  centeredSlides: false,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 14,
                  centeredSlides: false,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                  centeredSlides: false,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  centeredSlides: false,
                },
                1600: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                  centeredSlides: false,
                },
              }}
              className="pricing-swiper"
              aria-label="Pricing plans carousel"
            >
              {sortedPlans.map((p) => (
                <SwiperSlide
                  key={p.id}
                  className="pricing-slide"
                  data-plan={p.id}
                >
                  <article
                    className={`pricing-card ${p.popular ? "popular" : ""}`}
                    data-plan={p.id}
                    aria-labelledby={`${p.id}-title`}
                  >
                    {p.popular && (
                      <div className="badge-popular">{p.highlight}</div>
                    )}

                    <header className="card-head">
                      <div>
                        <h3 id={`${p.id}-title`}>{p.name}</h3>
                        <div className="sub">
                          {p.popular
                            ? "Popular choice"
                            : "Great for professionals"}
                        </div>
                      </div>
                      <div className="price">{p.price}</div>
                    </header>

                    <ul className="feature-list" role="list">
                      {p.features.map((f, i) => (
                        <li key={i}>
                          <span className="f-icon">{featureIcon(f)}</span>
                          <span className="f-text">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="card-cta">
                      <button
                        className="choose-btn"
                        onClick={() => handleChoose(p)}
                      >
                        Choose {p.name}
                      </button>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            fallback
          )}
        </div>
      </div>
    </section>
  );
}
