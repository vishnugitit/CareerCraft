import React from 'react';

export default function TemplateCard({ template, onSelect }){
  return (
    <div className="card h-100">
      <img src={template.thumbnail} className="card-img-top" alt={template.name}/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{template.name}</h5>
        <p className="card-text">{template.description}</p>
        <div className="mt-auto">
          <button className="btn btn-primary w-100" onClick={() => onSelect(template)}>Use Template</button>
        </div>
      </div>
    </div>
  );
}
