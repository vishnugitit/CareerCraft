// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
// IMPORT the namespaced CSS file
import Header from "./pages/Header/Header";



import Hero from "./components/Home/Hero";
import Features from "./pages/Features/Features";
import Templates from "./components/Templates/Templates";
import Pricing from "./components/Pricing/Pricing";
// import Testimonials from "./pages/Testimonials/Testimonials";

import FAQ from "./pages/FAQ/FAQ";
// import Payment from "./components/Payment/Payment";
import Contact from "./components/Contact/Contact";

import Footer from "./pages/Footer/Footer";

export default function App() {
  


  return (
    <div>
      <Header />
   
      {/* Other sections below */}
      <Hero />
      <Features />
      <Templates />
      <Pricing />
      {/* <Testimonials /> */}
      <FAQ />
      {/* <Payment /> */}


     
      <Contact />

    
      <Footer />
    </div>
  );
}
