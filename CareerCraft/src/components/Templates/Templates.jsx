import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Templates.css";

const generateTemplateHTML = (template) => {
  const { title, subtitle, color, accent } = template;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} - Portfolio Template</title>
<style>
body{font-family:Poppins,Arial,Helvetica,sans-serif;margin:0;padding:24px;background:#f7f9fb;color:#222}
.hero{max-width:900px;margin:24px auto;padding:28px;background:${color};border-radius:12px;color:${accent};}
.hero h1{margin:0 0 8px;font-size:28px;}
.hero p{margin:0 0 12px;opacity:0.95;}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:18px}
.card{background:#fff;padding:14px;border-radius:10px;box-shadow:0 6px 20px rgba(10,20,40,0.04)}
a{color:${accent};text-decoration:none}
</style>
</head>
<body>
<div class="hero">
<h1>${title}</h1>
<p>${subtitle}</p>
<div class="grid">
<div class="card">About me<br/>- role<br/>- location</div>
<div class="card">Skills<br/>- item</div>
<div class="card">Projects<br/>- project 1</div>
<div class="card">Contact<br/>- email</div>
</div>
</div>
</body>
</html>`;
};



// Generate Templates
const allTemplates = (() => {
  const categories = ["Basic", "Pro", "Premium"];
  const templates = [];
  categories.forEach((cat) => {
    for (let i = 1; i <= 6; i++) {
      const id = `${cat.toLowerCase()}-${i}`;
      templates.push({
        id,
        category: cat,
   
        title: `${cat} Template ${i}`,
        subtitle: `A ${cat.toLowerCase()} portfolio layout — variation ${i}`,
        color:
          cat === "Basic" ? "#ffffff" : cat === "Pro" ? "#0d6efd" : "#111827",
        accent:
          cat === "Basic" ? "#0d6efd" : cat === "Pro" ? "#ffffff" : "#f59e0b",
        thumbnail: `data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'>
          <rect fill='${
            cat === "Basic" ? "#f8fafc" : cat === "Pro" ? "#0d6efd" : "#111827"
          }' width='100%' height='100%'/>
          <text x='50%' y='50%' fill='${
            cat === "Basic" ? "#0d6efd" : cat === "Pro" ? "#fff" : "#f59e0b"
          }'
          font-family='Poppins' font-size='28' dominant-baseline='middle' text-anchor='middle'>${cat} ${i}</text>
          </svg>`
        )}`,
      });
    }
  });
  return templates;
})();

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("Basic");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = allTemplates.filter((t) => t.category === activeCategory);

  const handleView = (t) => setPreviewTemplate(t);
  const handleClosePreview = () => setPreviewTemplate(null);

  const handleDownload = (t) => {
    const html = generateTemplateHTML(t);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.title.replace(/\s+/g, "_").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="templates" className="templates-section">
      <div className="container">
        <h2 className="section-title">Templates</h2>

        {/* Category Buttons */}
        <div className="category-buttons">
          {["Basic", "Pro", "Premium"].map((c) => (
            <button
              key={c}
              className={`category-btn ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
          className="templates-swiper"
        >
          {templates.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="template-card">
                <img
                  src={t.thumbnail}
                  alt={t.title}
                  className="template-thumb"
                />
                <div className="template-body">
                  <h5 className="template-title">{t.title}</h5>
                  <p className="template-subtitle">{t.subtitle}</p>
                  <div className="template-actions">
                    <button
                      className="btn-preview"
                      onClick={() => handleView(t)}
                    >
                      Preview
                    </button>
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(t)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal Preview */}
        {previewTemplate && (
          <div className="modal-backdrop-custom" onClick={handleClosePreview}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5>{previewTemplate.title}</h5>
                <button className="btn-close" onClick={handleClosePreview}>
                  ✕
                </button>
              </div>
              <div
                className="preview-frame"
                dangerouslySetInnerHTML={{
                  __html: generateTemplateHTML(previewTemplate),
                }}
              />
              <div className="modal-actions">
                <button
                  className="btn-download"
                  onClick={() => handleDownload(previewTemplate)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
