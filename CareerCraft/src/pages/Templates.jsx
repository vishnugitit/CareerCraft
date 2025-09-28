import React from 'react';
import TemplateCard from '../components/TemplateCard';
import { useNavigate } from 'react-router-dom';

const mockTemplates = [
  { id: 'basic', name: 'Basic', description: 'Clean one-column resume', thumbnail: '/assets/basic.png' },
  { id: 'modern', name: 'Modern', description: 'Two-column modern layout', thumbnail: '/assets/modern.png' }
];

export default function Templates(){
  const navigate = useNavigate();
  const handleSelect = (t) => navigate('/builder', { state: { template: t } });

  return (
    <div>
      <h2>Templates</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {mockTemplates.map(t => (
          <div className="col" key={t.id}><TemplateCard template={t} onSelect={handleSelect} /></div>
        ))}
      </div>
    </div>
  );
}
