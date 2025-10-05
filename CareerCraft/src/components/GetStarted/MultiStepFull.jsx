// src/components/MultiStepFull.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import emailjs from "@emailjs/browser";

/* ====== CONFIG ====== */
const LOCAL_KEY = "portfolio_builder_v6";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

/* ====== helpers ====== */
const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
let _id = 1000;
const makeId = () => ++_id;

/* inject small styles */
(function injectStyles() {
  if (document.getElementById("msf-styles")) return;
  const s = document.createElement("style");
  s.id = "msf-styles";
  s.innerHTML = `
    :root{--accent:#0b3da6;--muted:#6c757d}
    .msf-root{min-height:100vh;padding:28px;background:linear-gradient(135deg,#f7fbff,#eef6ff);font-family:Inter,system-ui,Segoe UI,Roboto,Arial}
    .msf-card{background:#fff;border-radius:12px;transition:transform .22s,box-shadow .22s}
    .msf-card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(11,88,255,0.06)}
    .btn-fancy{border-radius:8px;transition:transform .14s}
    .btn-fancy:hover{transform:translateY(-2px)}
    .img-thumb{max-width:88px;max-height:88px;border-radius:8px;object-fit:cover;border:1px solid #eee}
    table.msf-table{width:100%;border-collapse:collapse;margin-top:8px}
    table.msf-table th{background:#f3f7ff;color:var(--accent);padding:8px;border:1px solid #e9f3ff;text-align:left}
    table.msf-table td{padding:8px;border:1px solid #f0f6ff;vertical-align:top}
    .center-popup{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.36);z-index:2200}
    .center-box{background:#fff;border-radius:10px;padding:16px;min-width:320px;max-width:92%}
  `;
  document.head.appendChild(s);
})();

/* ====== Step components (unchanged structure except their Save uses parent's handler) ====== */

function ContactStep({ data, onSave, onNext }) {
  const update = (k, v) => onSave({ ...data, [k]: v }, true); // true = immediate save popup
  return (
    <div>
      <h5>Contact</h5>
      <div className="mb-2">
        <label className="form-label">
          Full Name <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          placeholder="Enter Your Full Name"
          value={data.name || ""}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="you@example.com"
          value={data.email || ""}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Role / Domain</label>
        <select
          className="form-select"
          value={data.role || ""}
          onChange={(e) => update("role", e.target.value)}
        >
          <option value="">Select</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Fullstack Developer</option>
          <option>Data Scientist</option>
          <option>Designer</option>
        </select>
      </div>
      <div>
        <label className="form-label">Tagline</label>
        <input
          className="form-control"
          value={data.tagline || ""}
          onChange={(e) => update("tagline", e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(data, false)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(data)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function AboutStep({ data, onSave, onNext }) {
  const update = (k, v, saveImmediately = true) =>
    onSave({ ...data, [k]: v }, saveImmediately);

  async function handlePhoto(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const d = await fileToDataUrl(f);
    update("photoFileName", f.name, false);
    update("photoDataUrl", d, true);
  }

  async function handleResume(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const d = await fileToDataUrl(f);
    update("resumeFileName", f.name, false);
    update("resumeDataUrl", d, true);
  }

  return (
    <div>
      <h5>About</h5>
      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">
            Bio <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={4}
            value={data.bio || ""}
            onChange={(e) => update("bio", e.target.value)}
          />
          <div className="mt-2">
            <label className="form-label">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="form-control"
              onChange={handleResume}
            />
            {data.resumeFileName && (
              <small className="text-muted d-block mt-1">
                Uploaded: {data.resumeFileName}
              </small>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label">Mobile Number</label>
          <input
          type="number"
            className="form-control"
            value={data.mobile || ""}
            onChange={(e) => update("mobile", e.target.value)}
          />
          <label className="form-label mt-2">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handlePhoto}
          />
          {data.photoDataUrl && (
            <img src={data.photoDataUrl} alt="u" className="img-thumb mt-2" />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(data, false)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(data)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function SkillsStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length ? data : [{ id: makeId(), name: "" }]
  );
  useEffect(() => onSave(list, false), []); // initial announce draft
  useEffect(
    () => setList(data.length ? data : [{ id: makeId(), name: "" }]),
    [data]
  );

  const add = () =>
    setList((s) => {
      const next = [...s, { id: makeId(), name: "" }];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, name: val } : it));
      onSave(next, false);
      return next;
    });

  return (
    <div>
      <h5>Skills</h5>
      {list.map((it) => (
        <div key={it.id} className="d-flex gap-2 align-items-center mb-2">
          <input
            className="form-control"
            placeholder="Skill"
            value={it.name}
            onChange={(e) => update(it.id, e.target.value)}
          />
          <button
            className="btn btn-sm btn-danger"
            onClick={() => remove(it.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mb-2">
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function EducationStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length
      ? data
      : [
          {
            id: makeId(),
            qualification: "",
            college: "",
            startDate: "",
            endDate: "",
          },
        ]
  );
  useEffect(
    () =>
      setList(
        data.length
          ? data
          : [
              {
                id: makeId(),
                qualification: "",
                college: "",
                startDate: "",
                endDate: "",
              },
            ]
      ),
    [data]
  );
  useEffect(() => onSave(list, false), []);

  const degrees = [
    "M.Tech",
    "MCA",
    "B.Tech",
    "BCA",
    "Intermediate",
    "Diploma",
    "SSC",
  ];
  const add = () =>
    setList((s) => {
      const next = [
        ...s,
        {
          id: makeId(),
          qualification: "",
          college: "",
          startDate: "",
          endDate: "",
        },
      ];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, field, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, [field]: val } : it));
      onSave(next, false);
      return next;
    });

  return (
    <div>
      <h5>Education</h5>
      {list.map((it) => (
        <div key={it.id} className="border rounded p-3 mb-2">
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label">Education</label>
              <select
                className="form-select"
                value={it.qualification}
                onChange={(e) => update(it.id, "qualification", e.target.value)}
              >
                <option value="">Select</option>
                {degrees.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label">University / College</label>
              <input
                className="form-control"
                value={it.college}
                onChange={(e) => update(it.id, "college", e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Start / End</label>
              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  type="text"
                  value={it.startDate}
                  onChange={(e) => update(it.id, "startDate", e.target.value)}
                />
                <input
                  className="form-control"
                  type="text"
                  value={it.endDate}
                  onChange={(e) => update(it.id, "endDate", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => remove(it.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div>
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function ExperienceStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length
      ? data
      : [
          {
            id: makeId(),
            domain: "",
            role: "",
            company: "",
            startDate: "",
            endDate: "",
          },
        ]
  );
  useEffect(
    () =>
      setList(
        data.length
          ? data
          : [
              {
                id: makeId(),
                domain: "",
                role: "",
                company: "",
                startDate: "",
                endDate: "",
              },
            ]
      ),
    [data]
  );
  useEffect(() => onSave(list, false), []);

  const add = () =>
    setList((s) => {
      const next = [
        ...s,
        {
          id: makeId(),
          domain: "",
          role: "",
          company: "",
          startDate: "",
          endDate: "",
        },
      ];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, field, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, [field]: val } : it));
      onSave(next, false);
      return next;
    });

  return (
    <div>
      <h5>Experience</h5>
      {list.map((it) => (
        <div key={it.id} className="border rounded p-3 mb-2">
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label">Domain</label>
              <input
                className="form-control"
                value={it.domain}
                onChange={(e) => update(it.id, "domain", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <input
                className="form-control"
                value={it.role}
                onChange={(e) => update(it.id, "role", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Company</label>
              <input
                className="form-control"
                value={it.company}
                onChange={(e) => update(it.id, "company", e.target.value)}
              />
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input
                className="form-control"
                type="date"
                value={it.startDate}
                onChange={(e) => update(it.id, "startDate", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input
                className="form-control"
                type="date"
                value={it.endDate}
                onChange={(e) => update(it.id, "endDate", e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => remove(it.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mb-2">
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function ProjectsStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length
      ? data
      : [
          {
            id: makeId(),
            photoFileName: "",
            photoDataUrl: "",
            name: "",
            bio: "",
            url: "",
          },
        ]
  );
  useEffect(
    () =>
      setList(
        data.length
          ? data
          : [
              {
                id: makeId(),
                photoFileName: "",
                photoDataUrl: "",
                name: "",
                bio: "",
                url: "",
              },
            ]
      ),
    [data]
  );
  useEffect(() => onSave(list, false), []);

  const add = () =>
    setList((s) => {
      const next = [
        ...s,
        {
          id: makeId(),
          photoFileName: "",
          photoDataUrl: "",
          name: "",
          bio: "",
          url: "",
        },
      ];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, field, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, [field]: val } : it));
      onSave(next, false);
      return next;
    });

  async function handleFile(id, e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const d = await fileToDataUrl(f);
    update(id, "photoFileName", f.name);
    update(id, "photoDataUrl", d);
  }

  return (
    <div>
      <h5>Projects</h5>
      {list.map((it) => (
        <div key={it.id} className="border rounded p-3 mb-2">
          <div className="row g-2">
            <div className="col-md-3">
              <label className="form-label">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleFile(it.id, e)}
              />
              {it.photoFileName && (
                <small className="text-muted d-block mt-1">
                  {it.photoFileName}
                </small>
              )}
            </div>
            <div className="col-md-9">
              <label className="form-label">Project Name</label>
              <input
                className="form-control"
                value={it.name}
                onChange={(e) => update(it.id, "name", e.target.value)}
              />
              <label className="form-label mt-2">Project Bio</label>
              <textarea
                className="form-control"
                rows={2}
                value={it.bio}
                onChange={(e) => update(it.id, "bio", e.target.value)}
              />
              <label className="form-label mt-2">Project URL</label>
              <input
                className="form-control"
                value={it.url}
                onChange={(e) => update(it.id, "url", e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => remove(it.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div>
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function CertificationsStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length
      ? data
      : [
          {
            id: makeId(),
            photoFileName: "",
            photoDataUrl: "",
            name: "",
            certId: "",
            url: "",
          },
        ]
  );
  useEffect(
    () =>
      setList(
        data.length
          ? data
          : [
              {
                id: makeId(),
                photoFileName: "",
                photoDataUrl: "",
                name: "",
                certId: "",
                url: "",
              },
            ]
      ),
    [data]
  );
  useEffect(() => onSave(list, false), []);

  const add = () =>
    setList((s) => {
      const next = [
        ...s,
        {
          id: makeId(),
          photoFileName: "",
          photoDataUrl: "",
          name: "",
          certId: "",
          url: "",
        },
      ];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, field, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, [field]: val } : it));
      onSave(next, false);
      return next;
    });

  async function handleFile(id, e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const d = await fileToDataUrl(f);
    update(id, "photoFileName", f.name);
    update(id, "photoDataUrl", d);
  }

  return (
    <div>
      <h5>Certifications</h5>
      {list.map((it) => (
        <div key={it.id} className="border rounded p-3 mb-2">
          <div className="row g-2">
            <div className="col-md-3">
              <label className="form-label">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleFile(it.id, e)}
              />
              {it.photoFileName && (
                <small className="text-muted d-block mt-1">
                  {it.photoFileName}
                </small>
              )}
            </div>
            <div className="col-md-9">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={it.name}
                onChange={(e) => update(it.id, "name", e.target.value)}
              />
              <label className="form-label mt-2">ID</label>
              <input
                className="form-control"
                value={it.certId}
                onChange={(e) => update(it.id, "certId", e.target.value)}
              />
              <label className="form-label mt-2">URL</label>
              <input
                className="form-control"
                value={it.url}
                onChange={(e) => update(it.id, "url", e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => remove(it.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div>
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function SocialStep({ data = [], onSave, onNext }) {
  const [list, setList] = useState(() =>
    data.length ? data : [{ id: makeId(), network: "LinkedIn", url: "" }]
  );
  useEffect(
    () =>
      setList(
        data.length ? data : [{ id: makeId(), network: "LinkedIn", url: "" }]
      ),
    [data]
  );
  useEffect(() => onSave(list, false), []);

  const add = () =>
    setList((s) => {
      const next = [...s, { id: makeId(), network: "LinkedIn", url: "" }];
      onSave(next, false);
      return next;
    });
  const remove = (id) =>
    setList((s) => {
      const next = s.filter((x) => x.id !== id);
      onSave(next, false);
      return next;
    });
  const update = (id, field, val) =>
    setList((s) => {
      const next = s.map((it) => (it.id === id ? { ...it, [field]: val } : it));
      onSave(next, false);
      return next;
    });

  return (
    <div>
      <h5>Social Media</h5>
      {list.map((it) => (
        <div key={it.id} className="d-flex gap-2 align-items-center mb-2">
          <select
            className="form-select"
            style={{ maxWidth: 160 }}
            value={it.network}
            onChange={(e) => update(it.id, "network", e.target.value)}
          >
            <option>LinkedIn</option>
            <option>GitHub</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Twitter</option>
          </select>
          <input
            className="form-control"
            placeholder="URL"
            value={it.url}
            onChange={(e) => update(it.id, "url", e.target.value)}
          />
          <button
            className="btn btn-sm btn-danger"
            onClick={() => remove(it.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button className="btn btn-sm btn-outline-primary" onClick={add}>
          Add
        </button>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSave(list, true)}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => onNext(list)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

/* Acknowledgement step */
function AcknowledgementStep({
  stateSnapshot,
  onSaveAck,
  onProceed,
  onSaveNow,
}) {
  const [accepted, setAccepted] = useState(
    !!stateSnapshot.acknowledgement?.accepted
  );

  useEffect(
    () => setAccepted(!!stateSnapshot.acknowledgement?.accepted),
    [stateSnapshot]
  );

  return (
    <div>
      <h5>Acknowledgement — Review</h5>

      <table className="msf-table">
        <tbody>
          <tr>
            <th style={{ width: 160 }}>Full name</th>
            <td>{stateSnapshot.contact?.name || "-"}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{stateSnapshot.contact?.email || "-"}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{stateSnapshot.contact?.role || "-"}</td>
          </tr>
          <tr>
            <th>Tagline</th>
            <td>{stateSnapshot.contact?.tagline || "-"}</td>
          </tr>
          <tr>
            <th>Bio</th>
            <td style={{ whiteSpace: "pre-wrap" }}>
              {stateSnapshot.about?.bio || "-"}
            </td>
          </tr>
          <tr>
            <th>Mobile</th>
            <td>{stateSnapshot.about?.mobile || "-"}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-3">
        <h6>Projects</h6>
        <table className="msf-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>URL</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {(stateSnapshot.projects || []).length ? (
              stateSnapshot.projects.map((p, i) => (
                <tr key={i}>
                  <td>{p.name || "-"}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{p.bio || "-"}</td>
                  <td>{p.url || "-"}</td>
                  <td>
                    {p.photoDataUrl ? (
                      <img
                        src={p.photoDataUrl}
                        alt=""
                        style={{ height: 48, borderRadius: 6 }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No projects</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <h6>Certifications</h6>
        <table className="msf-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>URL</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {(stateSnapshot.certifications || []).length ? (
              stateSnapshot.certifications.map((c, i) => (
                <tr key={i}>
                  <td>{c.name || "-"}</td>
                  <td>{c.certId || "-"}</td>
                  <td>{c.url || "-"}</td>
                  <td>
                    {c.photoDataUrl ? (
                      <img
                        src={c.photoDataUrl}
                        alt=""
                        style={{ height: 48, borderRadius: 6 }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No certifications</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <h6>Social</h6>
        <table className="msf-table">
          <thead>
            <tr>
              <th>Network</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {(stateSnapshot.social || []).length ? (
              stateSnapshot.social.map((s, i) => (
                <tr key={i}>
                  <td>{s.network}</td>
                  <td>{s.url || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No social links</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>I confirm the above information is accurate.</span>
        </label>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSaveNow({ accepted }, true)}
        >
          Save
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!accepted) {
              onSaveNow(
                { accepted },
                false,
                "Please accept the acknowledgement checkbox to continue."
              );
              return;
            }
            onSaveAck({ accepted: true, savedAt: new Date().toISOString() });
            onProceed();
          }}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

/* Payment Step */
function PaymentStep({
  payment,
  onSavePayment,
  onGenerateReceipt,
  onFinalSubmit,
  receiptGenerated,
}) {
  const update = (k, v, saveNow = false) =>
    onSavePayment({ ...payment, [k]: v }, saveNow);

  async function handleTemplateFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const d = await fileToDataUrl(f);
    update("templateImageName", f.name, false);
    update("templateImageDataUrl", d, true);
  }

  const amountInr = () => {
    const rate = 88.78;
    const amt = Number(payment.amountUSD || 0);
    return isNaN(amt) ? "-" : `₹${(amt * rate).toFixed(2)}`;
  };

  return (
    <div>
      <h5>Payment</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name *</label>
          <input
            className="form-control"
            value={payment.name || ""}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            className="form-control"
            value={payment.email || ""}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">Phone *</label>
          <input
            className="form-control"
            value={payment.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Preferred Template</label>
          <select
            className="form-select"
            value={payment.template || "Basic"}
            onChange={(e) => update("template", e.target.value)}
          >
            <option>Basic</option>
            <option>Pro</option>
            <option>Premium</option>
          </select>
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <label className="form-label">Template Image (opt)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleTemplateFile}
          />
          {payment.templateImageDataUrl && (
            <img
              src={payment.templateImageDataUrl}
              alt="tmpl"
              className="img-thumb mt-2"
            />
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Timeline</label>
          <select
            className="form-select"
            value={payment.timeline || "1 week"}
            onChange={(e) => update("timeline", e.target.value)}
          >
            <option>1 week</option>
            <option>2 week</option>
            <option>3 week</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Amount (USD)</label>
          <select
            className="form-select"
            value={payment.amountUSD || "5"}
            onChange={(e) => update("amountUSD", e.target.value)}
          >
            <option value="5">$5 Basic</option>
            <option value="10">$10 Pro</option>
            <option value="15">$15 Premium</option>
          </select>
          <div className="text-muted mt-1">INR: {amountInr()}</div>
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label">Additional Features / Notes</label>
        <textarea
          className="form-control"
          rows={3}
          value={payment.additional || ""}
          onChange={(e) => update("additional", e.target.value)}
        />
      </div>

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          id="txConfirm"
          type="checkbox"
          checked={!!payment.agree}
          onChange={(e) => update("agree", e.target.checked)}
        />
        <label className="form-check-label" htmlFor="txConfirm">
          I confirm this payment transaction.
        </label>
      </div>

      <div className="d-flex gap-2 justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onSavePayment(payment, true)}
        >
          Save
        </button>
        <button className="btn btn-outline-info" onClick={onGenerateReceipt}>
          Generate Receipt (Download PDF)
        </button>
        <button
          className="btn btn-success"
          onClick={() => onFinalSubmit(payment)}
        >
          Submit & Save
        </button>
      </div>

      {!receiptGenerated && (
        <div className="mt-2 text-danger">
          You must generate & download the receipt before final submission.
        </div>
      )}
    </div>
  );
}

/* ====== Main component ====== */

export default function MultiStepFull() {
  const emptyState = {
    contact: { name: "", email: "", role: "", tagline: "" },
    about: {
      bio: "",
      mobile: "",
      photoFileName: "",
      photoDataUrl: "",
      resumeFileName: "",
      resumeDataUrl: "",
    },
    skills: [{ id: makeId(), name: "" }],
    education: [
      {
        id: makeId(),
        qualification: "",
        college: "",
        startDate: "",
        endDate: "",
      },
    ],
    experience: [
      {
        id: makeId(),
        domain: "",
        role: "",
        company: "",
        startDate: "",
        endDate: "",
      },
    ],
    projects: [
      {
        id: makeId(),
        photoFileName: "",
        photoDataUrl: "",
        name: "",
        bio: "",
        url: "",
      },
    ],
    certifications: [
      {
        id: makeId(),
        photoFileName: "",
        photoDataUrl: "",
        name: "",
        certId: "",
        url: "",
      },
    ],
    social: [{ id: makeId(), network: "LinkedIn", url: "" }],
    acknowledgement: { accepted: false, savedAt: null },
    payment: {
      name: "",
      email: "",
      phone: "",
      template: "Basic",
      timeline: "1 week",
      amountUSD: "5",
      additional: "",
      agree: false,
      templateImageDataUrl: null,
      templateImageName: "",
    },
  };

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return emptyState;
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [popupMsg, setPopupMsg] = useState("");
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptDataUrl, setReceiptDataUrl] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const steps = [
    "Contact",
    "About",
    "Skills",
    "Education",
    "Experience",
    "Projects",
    "Certifications",
    "Social",
    "Acknowledgement",
    "Payment",
  ];

  /* unified section setter with popup & validation */
  const setSection = (
    key,
    payload,
    showMessage = false,
    customError = null
  ) => {
    setState((prev) => ({ ...prev, [key]: payload }));
    try {
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify({ ...state, [key]: payload })
      );
    } catch {}
    if (showMessage) {
      // validate this section
      const err = validateSingleSection(key, payload);
      if (customError) {
        showPopup(customError);
        return;
      }
      if (err) showPopup(err);
      else showPopup(`${capitalize(key)} saved successfully.`);
    }
  };

  const showPopup = (msg, time = 3000) => {
    setPopupMsg(msg);
    if (time) setTimeout(() => setPopupMsg(""), time);
  };

  const validateSingleSection = (key, payload) => {
    // return string message when invalid, otherwise null
    if (key === "contact") {
      if (!payload.name || !payload.name.trim())
        return "Please enter Full name.";
      if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email))
        return "Please enter a valid Email.";
      return null;
    }
    if (key === "about") {
      if (!payload.bio || !payload.bio.trim()) return "Please fill Bio.";
      return null;
    }
    if (key === "skills") {
      if (!payload || payload.length === 0) return "Add at least one skill.";
      if (payload.some((s) => !s.name || !s.name.trim()))
        return "Please fill all skill names or remove empty ones.";
      return null;
    }
    if (key === "education") {
      if (!payload || payload.length === 0) return "Add education entry.";
      for (let i = 0; i < payload.length; i++) {
        const e = payload[i];
        if (!e.qualification.trim() || !e.college.trim())
          return `Complete Education #${i + 1}.`;
      }
      return null;
    }
    if (key === "projects") {
      for (let i = 0; i < payload.length; i++) {
        const p = payload[i];
        if ((p.name || p.bio || p.url) && (!p.name || !p.name.trim()))
          return `Please provide name for Project #${i + 1} or remove it.`;
      }
      return null;
    }
    if (key === "certifications") {
      for (let i = 0; i < payload.length; i++) {
        const c = payload[i];
        if ((c.name || c.certId || c.url) && (!c.name || !c.name.trim()))
          return `Please provide name for Certification #${
            i + 1
          } or remove it.`;
      }
      return null;
    }
    if (key === "social") {
      for (let i = 0; i < payload.length; i++) {
        const s = payload[i];
        if (s.url && !s.url.trim())
          return `Please fill URL for Social #${i + 1} or remove it.`;
      }
      return null;
    }
    if (key === "acknowledgement") {
      if (!payload || !payload.accepted)
        return "Please accept the acknowledgement.";
      return null;
    }
    if (key === "payment") {
      if (!payload.name || !payload.name.trim())
        return "Please enter Name in Payment.";
      if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email))
        return "Please enter valid Email in Payment.";
      if (!payload.phone || !payload.phone.trim())
        return "Please enter Phone in Payment.";
      if (!payload.agree)
        return "Please confirm the payment transaction checkbox.";
      return null;
    }
    return null;
  };

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  /* Save handler passed into children: payload + showImmediately flag */
  const handleSaveSection = (
    key,
    payload,
    showImmediately = false,
    customError = null
  ) => {
    setSection(key, payload, showImmediately, customError);
  };

  /* navigation helpers */
  const validateStep = (i) => {
    // use the single-section validator for the current step
    const mapping = {
      0: "contact",
      1: "about",
      2: "skills",
      3: "education",
      4: "experience",
      5: "projects",
      6: "certifications",
      7: "social",
      8: "acknowledgement",
      9: "payment",
    };
    const key = mapping[i];
    return validateSingleSection(key, state[key]);
  };

  const saveAndContinue = () => {
    const err = validateStep(stepIndex);
    if (err) {
      showPopup(err);
      return;
    }
    setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => setStepIndex((s) => Math.max(s - 1, 0));
  const saveDraft = () => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
      showPopup("Draft saved locally.");
    } catch {
      showPopup("Failed to save draft.");
    }
  };
  const clearDraft = () => {
    if (!confirm("Clear saved draft?")) return;
    localStorage.removeItem(LOCAL_KEY);
    setState(emptyState);
    setReceiptGenerated(false);
    setReceiptDataUrl(null);
    setStepIndex(0);
    showPopup("Draft cleared.");
  };

  /* PDF generator: now loads each image element to get naturalWidth/Height and converts px->pt (pt = px * 0.75 assuming 96dpi),
     and fits image to page margins preserving aspect ratio. */
  const pxToPt = (px) => px * 0.75;

  const addImageToDoc = async (doc, dataUrl, x, y, maxW, maxH) => {
    // returns final height to increment Y by
    if (!dataUrl) return 0;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // natural sizes in px
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        // convert to points
        let wPt = pxToPt(nw);
        let hPt = pxToPt(nh);
        // if image is bigger than allowed, scale down
        const scale = Math.min(1, maxW / wPt, maxH / hPt);
        wPt *= scale;
        hPt *= scale;
        try {
          const type = dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
          doc.addImage(dataUrl, type, x, y, wPt, hPt);
        } catch (e) {
          // fallback: skip image
          console.warn("addImage failed", e);
        }
        resolve(hPt);
      };
      img.onerror = () => resolve(0);
      img.src = dataUrl;
    });
  };

  const generateReceiptPdf = async () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 36;
      const contentW = pageW - margin * 2;
      const labelColW = 160;
      const lineH = 14;
      let y = margin;

      // header
      doc.setFillColor(11, 61, 145);
      doc.rect(0, 0, pageW, 64, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text("Acknowledgement — Review & Payment Receipt", margin, 42);
      doc.setFontSize(10);
      doc.text(new Date().toLocaleString(), pageW - margin, 42, {
        align: "right",
      });
      y = 84;

      const drawLabelValue = (label, value) => {
        const valWrapped = doc.splitTextToSize(
          String(value || "-"),
          contentW - labelColW - 8
        );
        const rowH = Math.max(lineH, valWrapped.length * lineH) + 8;
        doc.setFillColor(243, 247, 255);
        doc.setDrawColor(230, 236, 255);
        doc.rect(margin, y - 10, labelColW, rowH + 12, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 61, 145);
        doc.setFontSize(11);
        doc.text(label, margin + 8, y + 2);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(30, 40, 50);
        doc.text(valWrapped, margin + labelColW + 8, y + 2);
        y += rowH + 14;
        doc.setDrawColor(240, 245, 255);
        doc.line(margin, y - 6, margin + contentW, y - 6);
      };

      // acknowledgement title
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 61, 145);
      doc.setFontSize(13);
      doc.text("Acknowledgement — Review", margin, y);
      y += 18;

      drawLabelValue("Full name", state.contact?.name || "-");
      drawLabelValue("Email", state.contact?.email || "-");
      drawLabelValue("Role", state.contact?.role || "-");
      drawLabelValue("Tagline", state.contact?.tagline || "-");
      drawLabelValue("Bio", state.about?.bio || "-");
      drawLabelValue("Mobile", state.about?.mobile || "-");

      // add photo top-right if exists (use actual pixel size converted to points, capped)
      if (state.about?.photoDataUrl) {
        try {
          const maxW = pxToPt(220); // cap
          const maxH = pxToPt(220);
          const imgX = pageW - margin - maxW;
          const imgY = 96;
          await addImageToDoc(
            doc,
            state.about.photoDataUrl,
            imgX,
            imgY,
            maxW,
            maxH
          );
        } catch (e) {}
      }

      if (y > pageH - 240) {
        doc.addPage();
        y = margin;
      }

      // Projects
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 61, 145);
      doc.setFontSize(12);
      doc.text("Projects", margin, y);
      y += 18;
      doc.setFillColor(243, 247, 255);
      doc.setDrawColor(230, 236, 255);
      doc.rect(margin, y - 8, contentW, 28, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Name", margin + 8, y);
      doc.text("Description", margin + 160, y);
      doc.text("URL", margin + 420, y);
      doc.text("Photo", margin + 520, y);
      y += 36;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 40, 50);

      if (state.projects && state.projects.length) {
        for (const p of state.projects) {
          const descWrapped = doc.splitTextToSize(p.bio || "-", 240);
          doc.text(p.name || "-", margin + 8, y);
          doc.text(descWrapped, margin + 160, y);
          doc.text(p.url || "-", margin + 420, y);
          if (p.photoDataUrl) {
            const maxW = pxToPt(120),
              maxH = pxToPt(80);
            await addImageToDoc(
              doc,
              p.photoDataUrl,
              margin + 520,
              y - 6,
              maxW,
              maxH
            );
          } else doc.text("-", margin + 520, y);
          y += Math.max(descWrapped.length * lineH, pxToPt(40)) + 8;
          if (y > pageH - 140) {
            doc.addPage();
            y = margin;
          }
        }
      } else {
        doc.text("-", margin + 8, y);
        y += 22;
      }

      // Certifications
      if (y > pageH - 240) {
        doc.addPage();
        y = margin;
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 61, 145);
      doc.setFontSize(12);
      doc.text("Certifications", margin, y);
      y += 18;
      doc.setFillColor(243, 247, 255);
      doc.rect(margin, y - 8, contentW, 28, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Name", margin + 8, y);
      doc.text("ID", margin + 240, y);
      doc.text("URL", margin + 360, y);
      doc.text("Photo", margin + 520, y);
      y += 36;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 40, 50);

      if (state.certifications && state.certifications.length) {
        for (const c of state.certifications) {
          doc.text(c.name || "-", margin + 8, y);
          doc.text(c.certId || "-", margin + 240, y);
          doc.text(c.url || "-", margin + 360, y);
          if (c.photoDataUrl) {
            const maxW = pxToPt(120),
              maxH = pxToPt(80);
            await addImageToDoc(
              doc,
              c.photoDataUrl,
              margin + 520,
              y - 6,
              maxW,
              maxH
            );
          } else doc.text("-", margin + 520, y);
          y += pxToPt(48) + 8;
          if (y > pageH - 140) {
            doc.addPage();
            y = margin;
          }
        }
      } else {
        doc.text("No certifications", margin + 8, y);
        y += 22;
      }

      // Social
      if (y > pageH - 240) {
        doc.addPage();
        y = margin;
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 61, 145);
      doc.setFontSize(12);
      doc.text("Social", margin, y);
      y += 18;
      doc.setFillColor(243, 247, 255);
      doc.rect(margin, y - 8, contentW, 28, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Network", margin + 8, y);
      doc.text("URL", margin + 240, y);
      y += 36;
      doc.setFont("helvetica", "normal");

      if (state.social && state.social.length) {
        for (const s of state.social) {
          doc.text(s.network || "-", margin + 8, y);
          doc.text(s.url || "-", margin + 240, y);
          y += 18;
          if (y > pageH - 140) {
            doc.addPage();
            y = margin;
          }
        }
      } else {
        doc.text("No social links", margin + 8, y);
        y += 22;
      }

      // Payment section
      if (y > pageH - 260) {
        doc.addPage();
        y = margin;
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 61, 145);
      doc.setFontSize(13);
      doc.text("Payment Summary", margin, y);
      y += 18;
      const payment = state.payment || {};
      const payRows = [
        ["Name", payment.name || state.contact?.name || "-"],
        ["Email", payment.email || state.contact?.email || "-"],
        ["Phone", payment.phone || state.about?.mobile || "-"],
        ["Template", payment.template || "-"],
        ["Timeline", payment.timeline || "-"],
        ["Amount (USD)", payment.amountUSD ? `$${payment.amountUSD}` : "-"],
        [
          "Amount (INR)",
          payment.amountUSD
            ? `₹${(Number(payment.amountUSD) * 88.78).toFixed(2)}`
            : "-",
        ],
        ["Additional Notes", payment.additional || "-"],
      ];
      for (const [lab, val] of payRows) drawLabelValue(lab, val);

      // add template image actual size converted to points and capped to fit
      if (payment.templateImageDataUrl) {
        try {
          const maxW = pxToPt(300),
            maxH = pxToPt(200);
          const imgX = pageW - margin - maxW;
          const imgY = y - payRows.length * 28 - 50;
          if (imgY > margin)
            await addImageToDoc(
              doc,
              payment.templateImageDataUrl,
              imgX,
              imgY,
              maxW,
              maxH
            );
        } catch (e) {}
      }

      // footer
      if (y + 60 > pageH) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("Generated by Portfolio Builder", margin, pageH - 40);

      const dataUriStr = doc.output("datauristring");
      doc.save("acknowledgement_payment_receipt.pdf");

      setReceiptGenerated(true);
      setReceiptDataUrl(dataUriStr);
      showPopup("PDF generated & downloaded. You may now submit.", 3500);
      return dataUriStr;
    } catch (err) {
      console.error("PDF generation error", err);
      showPopup("Failed to generate PDF. Check console.");
      throw err;
    }
  };

  /* final submit using EmailJS (requires receiptGenerated) */
  const finalSubmit = async (paymentForm) => {
    const err = validateSingleSection("payment", paymentForm);
    if (err) {
      showPopup(err);
      return;
    }
    if (!receiptGenerated || !receiptDataUrl) {
      showPopup("Please generate and download receipt before submitting.");
      return;
    }

    const templateParams = {
      to_name: state.contact?.name || paymentForm.name || "User",
      to_email: paymentForm.email || state.contact?.email || "",
      message: `Portfolio submission from ${state.contact?.name || "-"}`,
      receipt_pdf: receiptDataUrl,
      contact_name: state.contact?.name || "",
      contact_email: state.contact?.email || "",
      amount_usd: `$${paymentForm.amountUSD || "0"}`,
      amount_inr: `₹${(Number(paymentForm.amountUSD || 0) * 88.78).toFixed(2)}`,
    };

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      localStorage.removeItem(LOCAL_KEY);
      setState(emptyState);
      setReceiptGenerated(false);
      setReceiptDataUrl(null);
      setStepIndex(0);
      showPopup("Submission sent — Email dispatched.", 4000);
    } catch (err) {
      console.error("EmailJS send error", err);
      showPopup(
        "Submission saved but failed to send email. See console.",
        6000
      );
      localStorage.removeItem(LOCAL_KEY);
      setState(emptyState);
      setReceiptGenerated(false);
      setReceiptDataUrl(null);
      setStepIndex(0);
    }
  };

  /* render step */
  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return (
          <ContactStep
            data={state.contact}
            onSave={(d, saveNow) => handleSaveSection("contact", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("contact", d, true);
              const m = validateSingleSection("contact", d);
              if (!m) setStepIndex(1);
              else showPopup(m);
            }}
          />
        );
      case 1:
        return (
          <AboutStep
            data={state.about}
            onSave={(d, saveNow) => handleSaveSection("about", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("about", d, true);
              const m = validateSingleSection("about", d);
              if (!m) setStepIndex(2);
              else showPopup(m);
            }}
          />
        );
      case 2:
        return (
          <SkillsStep
            data={state.skills}
            onSave={(d, saveNow) => handleSaveSection("skills", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("skills", d, true);
              const m = validateSingleSection("skills", d);
              if (!m) setStepIndex(3);
              else showPopup(m);
            }}
          />
        );
      case 3:
        return (
          <EducationStep
            data={state.education}
            onSave={(d, saveNow) => handleSaveSection("education", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("education", d, true);
              const m = validateSingleSection("education", d);
              if (!m) setStepIndex(4);
              else showPopup(m);
            }}
          />
        );
      case 4:
        return (
          <ExperienceStep
            data={state.experience}
            onSave={(d, saveNow) => handleSaveSection("experience", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("experience", d, true);
              const m = validateSingleSection("experience", d);
              if (!m) setStepIndex(5);
              else showPopup(m);
            }}
          />
        );
      case 5:
        return (
          <ProjectsStep
            data={state.projects}
            onSave={(d, saveNow) => handleSaveSection("projects", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("projects", d, true);
              const m = validateSingleSection("projects", d);
              if (!m) setStepIndex(6);
              else showPopup(m);
            }}
          />
        );
      case 6:
        return (
          <CertificationsStep
            data={state.certifications}
            onSave={(d, saveNow) =>
              handleSaveSection("certifications", d, saveNow)
            }
            onNext={(d) => {
              handleSaveSection("certifications", d, true);
              const m = validateSingleSection("certifications", d);
              if (!m) setStepIndex(7);
              else showPopup(m);
            }}
          />
        );
      case 7:
        return (
          <SocialStep
            data={state.social}
            onSave={(d, saveNow) => handleSaveSection("social", d, saveNow)}
            onNext={(d) => {
              handleSaveSection("social", d, true);
              const m = validateSingleSection("social", d);
              if (!m) setStepIndex(8);
              else showPopup(m);
            }}
          />
        );
      case 8:
        return (
          <AcknowledgementStep
            stateSnapshot={state}
            onSaveAck={(ack) => handleSaveSection("acknowledgement", ack, true)}
            onProceed={() => {
              const m = validateSingleSection(
                "acknowledgement",
                state.acknowledgement
              );
              if (!m) setStepIndex(9);
              else showPopup(m);
            }}
            onSaveNow={(ack, saveNow, customErr) => {
              handleSaveSection(
                "acknowledgement",
                { ...state.acknowledgement, ...ack },
                saveNow,
                customErr
              );
            }}
          />
        );
      case 9:
        return (
          <PaymentStep
            payment={state.payment}
            onSavePayment={(p, saveNow) =>
              handleSaveSection("payment", p, saveNow)
            }
            onGenerateReceipt={generateReceiptPdf}
            onFinalSubmit={(p) => finalSubmit(p)}
            receiptGenerated={receiptGenerated}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container msf-root">
      <h3 className="mb-3" style={{ textAlign: "center" }}>
        Portfolio Builder
      </h3>

      <div
        className="mb-3"
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        {steps.map((s, i) => (
          <button
            key={s}
            className={`btn btn-sm ${
              i === stepIndex ? "btn-primary" : "btn-outline-secondary"
            } btn-fancy`}
            onClick={() => setStepIndex(i)}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="card msf-card mb-3">
        <div className="card-body">{renderStep()}</div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <button
            className="btn btn-outline-secondary me-2 btn-fancy"
            onClick={goBack}
            disabled={stepIndex === 0}
          >
            Back
          </button>
          <button
            className="btn btn-primary me-2 btn-fancy"
            onClick={saveAndContinue}
          >
            Save & Continue
          </button>
          <button
            className="btn btn-outline-secondary btn-fancy"
            onClick={saveDraft}
          >
            Save Draft
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline-danger btn-fancy"
            onClick={clearDraft}
          >
            Clear Draft
          </button>
        </div>
      </div>

      {popupMsg && (
        <div className="center-popup">
          <div className="center-box">
            <div style={{ fontWeight: 700 }}>Notice</div>
            <div style={{ marginTop: 8 }}>{popupMsg}</div>
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setPopupMsg("")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
