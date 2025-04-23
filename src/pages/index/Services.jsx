import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Portal.css";
import "../../styles/Index.css";
import Footer from "../../components/Footer";

function Services() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="main-container">

      <header className="top-header">
        <div className="clinic-name">San Diego Dental Studio</div>
        <button className="portal-button" onClick={() => navigate("/login")}>
          Enter Portal
        </button>
      </header>

     

      <nav className="main-nav">
      <button 
          onClick={() => navigate("/")} 
          className={location.pathname === "/" ? "nav-button active" : "nav-button"}>
          Home
        </button>
        <button 
          onClick={() => navigate("/our-practice")} 
          className={location.pathname === "/our-practice" ? "nav-button active" : "nav-button"}>
          Our Practice
        </button>
        <button 
          onClick={() => navigate("/community-outreach")} 
          className={location.pathname === "/community-outreach" ? "nav-button active" : "nav-button"}>
          Community Outreach
        </button>
        <button 
          onClick={() => navigate("/services")} 
          className={location.pathname === "/services" ? "nav-button active" : "nav-button"}>
          Dental Services
        </button>
        <button 
          onClick={() => navigate("/technology")} 
          className={location.pathname === "/technology" ? "nav-button active" : "nav-button"}>
          Technology
        </button>
        <button 
          onClick={() => navigate("/additional-info")} 
          className={location.pathname === "/additional-info" ? "nav-button active" : "nav-button"}>
          Additional Info
        </button>
      </nav>

      <section className="content-section">
        <h2>Welcome to San Diego Dental Studio in San Diego, CA</h2>
        <p>
          At San Diego Dental Studio, our skilled team of dentists, hygienists, and dental assistants
          is dedicated to providing outstanding general and cosmetic dentistry in the Sorrento
          Valley/Mira Mesa area. We invest in the latest dental technology, stay current with
          continuing education, and combine our collective expertise to ensure that your dental
          needs are met with precision and care.
        </p>
        <p>
          Whether you’re looking to maintain a healthy smile or transform it through cosmetic
          procedures, we offer a wide range of services tailored to your individual needs. We invite
          you to experience our modern, welcoming environment. Contact us today to schedule an
          appointment and let us help you achieve the smile you deserve.
        </p>
        <p className="italics">Your Smile. Our Mission.</p>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
