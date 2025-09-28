import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // in prod call auth backend
    login(email);
    nav('/builder');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control my-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="form-control my-2" placeholder="Password" type="password" />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
