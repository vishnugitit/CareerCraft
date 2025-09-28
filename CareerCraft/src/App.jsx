import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';


export default function App(){
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>404 - Not found</h2>} />
      
        </Routes>
      </main>
      <Footer />
    </>
  );
}
