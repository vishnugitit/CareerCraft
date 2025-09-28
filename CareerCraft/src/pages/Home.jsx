import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="text-center py-5">
      <h1 className="display-5">Build a professional resume in minutes</h1>
      <p className="lead">Choose a template, fill your details, export to PDF, or share an online portfolio.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link className="btn btn-primary btn-lg" to="/templates">Choose Template</Link>
        <Link className="btn btn-outline-secondary btn-lg" to="/pricing">See Pricing</Link>
      </div>
    </div>
  );
}
