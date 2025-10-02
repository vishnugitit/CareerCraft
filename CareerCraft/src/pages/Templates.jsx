import React, { useState } from "react";
import "./Templates.css";

// Placeholder thumbnails — replace with real images in your project
const SAMPLE_THUMBS = [
  "/images/template-1.jpg",
  "/images/template-2.jpg",
  "/images/template-3.jpg",
  "/images/template-4.jpg",
  "/images/template-5.jpg",
  "/images/template-6.jpg",
];

export default function Templates() {
  const [templates] = useState([
    { id: "t1", title: "Modern Minimal", thumb: SAMPLE_THUMBS[0] },
    { id: "t2", title: "Creative Grid", thumb: SAMPLE_THUMBS[1] },
    { id: "t3", title: "Professional CV", thumb: SAMPLE_THUMBS[2] },
    { id: "t4", title: "Designer Portfolio", thumb: SAMPLE_THUMBS[3] },
    { id: "t5", title: "Photographer Gallery", thumb: SAMPLE_THUMBS[4] },
    { id: "t6", title: "Developer Showcase", thumb: SAMPLE_THUMBS[5] },
  ]);

  const [preview, setPreview] = useState(null);

  function openPreview(item) {
    setPreview(item);
    // Bootstrap modal could be used; for portability we render a simple overlay
  }

  function closePreview() {
    setPreview(null);
  }

  function chooseTemplate(item) {
    // Replace with routing or selection logic in your app
    alert(`Template chosen: ${item.title}`);
  }
  return (
    <section className="templates-section">
      <div className="container">
        <h2>Explore Templates</h2>

        <div className="row g-4">
          {templates.map((t) => (
            <div className="col-12 col-sm-6 col-md-4" key={t.id}>
              <div className="template-card">
                {/* Thumbnail — use <img> with a real src or an inline SVG placeholder */}
                <div
                  style={{
                    height: 180,
                    background: "#f0f3fb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* If image not available, show text */}
                  <img
                    src={t.thumb}
                    alt={t.title}
                    className="template-thumb"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      color: "#9aa8c9",
                    }}
                  >
                    {t.title}
                  </div>
                </div>

                <div className="template-body d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="template-title">{t.title}</div>
                    <div className="small text-muted">Preview</div>
                  </div>

                  <div className="template-actions mt-auto">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openPreview(t)}
                    >
                      Preview
                    </button>
                    <button
                      className="btn btn-sm btn-primary ms-auto"
                      onClick={() => chooseTemplate(t)}
                    >
                      Choose Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Simple modal-style overlay for preview */}
      {preview && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={closePreview}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 900,
              background: "#fff",
              borderRadius: 8,
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-3 d-flex align-items-center justify-content-between"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <strong>{preview.title}</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={closePreview}
              >
                Close
              </button>
            </div>
            <div style={{ padding: "1rem" }}>
              {/* In real app, render a live template preview or iframe. Here we show the thumbnail or placeholder */}
              <img
                src={preview.thumb}
                alt={preview.title}
                className="modal-preview-img"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {!preview.thumb && (
                <div
                  style={{
                    height: 420,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                  }}
                >
                  Preview unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
