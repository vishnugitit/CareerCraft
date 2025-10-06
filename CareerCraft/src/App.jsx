import React from "react";
import "./App.css";
import Header from "./pages/Header/Header";
import Hero from "./components/Home/Hero";
import Features from "./pages/Features/Features";
import Templates from "./components/Templates/Templates";
import Pricing from "./components/Pricing/Pricing";
// import Testimonials from "./pages/Testimonials/Testimonials";
import FAQ from "./pages/FAQ/FAQ";
import GetStarted from "./components/GetStarted/GetStarted";

// import Payment from "./components/Payment/Payment";
import Contact from "./components/Contact/Contact";
import Footer from "./pages/Footer/Footer";
const App = () => {
      
  return (

    <div>
      <Header />
      <Hero />
      <Features />
      <Templates />
      <Pricing />
      {/* <Testimonials /> */}
      <FAQ />

      <GetStarted />
      {/* <Payment/> */}
      <Contact />
    <Footer/>
      
    </div>
  );
};

export default App;
