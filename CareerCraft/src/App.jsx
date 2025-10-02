import React from "react";
import Header from "./pages/Header";
import Hero from "./components/Hero";
import Features from "./pages/Features";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features/>
      <Templates />
      <Pricing />
      <Testimonials />
      <FAQ/>
      <Contact/>
      <Footer />
    </div>
  );
};

export default App;
