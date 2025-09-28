import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';

export default function ResumeBuilder(){
  const { state } = useLocation();
  const template = state?.template || { name: 'basic' };

  const exportPdf = (formData) => {
    // placeholder: use html2pdf or server-side export later
    console.log('Exporting:', formData);
    alert('PDF export not implemented in demo — implement with html2pdf or Puppeteer.');
  };

  return (
    <div>
      <h2>Resume Builder — {template.name}</h2>
      <ResumeForm initialData={{}} onExport={exportPdf} />
    </div>
  );
}
