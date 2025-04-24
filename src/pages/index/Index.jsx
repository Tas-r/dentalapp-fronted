import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Portal.css";
import "../../styles/Index.css";
import Footer from "../../components/Footer";
import IndexResponsiveSidebar from "../../components/IndexResponsiveSidebar";

function Index() {
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

      <IndexResponsiveSidebar activePage="index" />

      <div className="hero-container">
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Your Perfect Smile,<br />Our Commitment</h1>
        </div>
      </div>

      <section className="content-section">
        <h2>Welcome to San Diego Dental Studio</h2>
        <p>
          At San Diego Dental Studio, our mission is simple: provide world-class dental care in a warm, welcoming environment where patients feel heard, respected, and confident in their treatment.
        </p>
        <p>
          Led by <strong>Dr. Tom Bierman</strong> and <strong>Dr. Quan Ma</strong>, our team of experienced dentists, hygienists, and clinical staff serve the communities of <strong>Sorrento Valley</strong>, <strong>Mira Mesa</strong>, and beyond. Whether you're here for a routine cleaning or a complete cosmetic transformation, we approach every smile with the same commitment to precision, comfort, and results.
        </p>
        <p>
          Our clinic integrates advanced dental technology with compassionate care. From digital imaging and same-day CEREC crowns to gentle oral surgery and preventive care, we tailor every treatment to your unique needs and goals.
        </p>
        <p>
          We invite you to experience the difference for yourself, schedule your appointment today and let us help you achieve the healthy, radiant smile you deserve.
        </p>
        <p />
        <h2>We're located at:</h2>
        <div className="map-embed">
          <iframe
            title="Google Map to Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.7144985328!2d-117.17980958481466!3d32.90571598093327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc0763bc11ff2d%3A0x5d91c53b4330488c!2sSan+Diego+Dental+Studio!5e0!3m2!1sen!2sus!4v1534280731286"
            width="100%"
            height="350"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>

      </section>

      
      <Footer />
    </div>
  );
}

export default Index;
