import React, { useState } from 'react';

export default function ResumeForm({ initialData = {}, onExport }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    title: initialData.title || '',
    email: initialData.email || '',
    summary: initialData.summary || '',
    skills: initialData.skills || '',
  });

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" className="form-control" value={form.title} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" className="form-control" value={form.email} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Summary</label>
          <textarea name="summary" className="form-control" rows="5" value={form.summary} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills (comma separated)</label>
          <input name="skills" className="form-control" value={form.skills} onChange={handleChange}/>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => onExport(form)}>Export PDF</button>
          <button className="btn btn-outline-secondary" onClick={() => alert('Save feature not implemented in demo')}>Save</button>
        </div>
      </div>

      <div className="col-md-6">
        <div className="border rounded p-3 bg-white" style={{minHeight: 400}}>
          <h3>{form.name || 'Your name'}</h3>
          <p className="fst-italic">{form.title}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <hr />
          <h6>Summary</h6>
          <p>{form.summary}</p>
          <h6>Skills</h6>
          <ul>
            {form.skills.split(',').filter(Boolean).map((s,i) => <li key={i}>{s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
