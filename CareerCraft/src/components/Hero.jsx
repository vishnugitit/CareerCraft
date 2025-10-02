import React from "react";
import "./Hero.css"; // import the CSS file you just added

export default function Hero() {
  return (
    <header className="pm-hero">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left column: text */}
          <div className="col-12 col-lg-7">
            <div className="content-wrap">
              <h1>Create Stunning Portfolios in Minutes</h1>

              <p className="lead">
                Build beautiful, professional portfolios and resumes with
                drag-and-drop templates — no design skills required. Share with
                employers, export to PDF, or publish your personal site
                instantly.
              </p>

              <div className="d-flex flex-wrap gap-2 pm-cta">
                <a href="/get-started" className="btn btn-lg btn-primary me-2">
                  Get Started
                </a>
                <a href="/templates" className="btn btn-lg btn-outline-light">
                  Try a Template
                </a>
              </div>

              <div className="mt-4 text-muted small" style={{ opacity: 0.9 }}>
                No credit card required • Free templates • Export-ready
              </div>
            </div>
          </div>

          {/* Right column: mock preview */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <div className="mock-browser w-100" style={{ maxWidth: 420 }}>
              {/* simple mockup — replace with a live preview component or image if you want */}
              <div
                className="mb-3"
                style={{
                  height: 10,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 6,
                }}
              ></div>
              <div
                style={{
                  height: 260,
                  borderRadius: 8,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center", padding: "1.25rem" }}>
                  <h6 style={{ marginBottom: 8 }}>Your portfolio, live</h6>
                  <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>
                    Preview templates instantly — edit content, reorder
                    sections, publish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
