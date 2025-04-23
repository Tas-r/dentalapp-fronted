import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        
      </div>

      <div className="footer-middle">
        <p>
          <strong>San Diego Dental Studio</strong> | <a href="https://sandiegodentalstudio.com">sandiegodentalstudio.com</a> | <a href="tel:8584574100">(858) 457-4100</a><br />
          6635 Flanders Dr, Suite E, San Diego, CA 92121-2978
        </p>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2014–2024 San Diego Dental Studio. All rights reserved.
        </p>
        <p className="smallprint">
          San Diego Dentists Bierman & Ma look forward to serving you and your family. We offer preventive care, dental restorations and cosmetic dentistry.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
