import React from "react";
import "./Pricing.css";

export default function Pricing() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "Free",
      features: ["1 Template", "Basic Hosting", "PDF Export"],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$8/mo",
      features: [
        "All Templates",
        "Custom Domain",
        "Priority Support",
        "PDF Export",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$16/mo",
      features: [
        "Everything in Pro",
        "Advanced Analytics",
        "Team Members",
        "White-label",
      ],
      popular: false,
    },
  ];
  function handleChoose(plan) {
    // Replace with checkout or signup flow
    alert(`Selected plan: ${plan.name}`);
  }

  return (
    <section className="pricing-section">
      <div className="container">
        <h2>Pricing Plans</h2>
        <p className="lead">
          Choose the plan that fits your needs. Upgrade anytime.
        </p>

        <div className="row g-4 justify-content-center">
          {plans.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`pricing-card h-100 ${p.popular ? "popular" : ""}`}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <div className="h6 mb-0">{p.name}</div>
                    {p.popular && (
                      <div className="small text-muted">Most popular</div>
                    )}
                  </div>
                  {p.popular && <div className="badge-popular">Popular</div>}
                </div>

                <div className="price mb-3">{p.price}</div>

                <ul className="feature-list">
                  {p.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <button
                  className="btn btn-primary choose-btn"
                  onClick={() => handleChoose(p)}
                >
                  Choose {p.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
