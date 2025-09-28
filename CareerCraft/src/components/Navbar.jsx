import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">ResumeForge</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/templates">Templates</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/pricing">Pricing</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/builder">Builder</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
