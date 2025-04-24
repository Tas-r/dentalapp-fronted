import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Sidebar.css";

function MobileSidebar({ activePage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="mobile-nav-container">
      <div className="mobile-nav-bar">
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-dropdown-menu">
          <NavLink to="/dashboard" className={activePage === "dashboard" ? "active" : ""} onClick={toggleMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/appointments" className={activePage === "appointments" ? "active" : ""} onClick={toggleMenu}>
            Appointments
          </NavLink>
          <NavLink to="/documents" className={activePage === "documents" ? "active" : ""} onClick={toggleMenu}>
            Documents
          </NavLink>
          <NavLink to="/inbox" className={activePage === "messages" ? "active" : ""} onClick={toggleMenu}>
            Messages
          </NavLink>
          <NavLink to="/history" className={activePage === "history" ? "active" : ""} onClick={toggleMenu}>
            History
          </NavLink>
          <a href="https://sandiegodental.securepayments.cardpointe.com/pay?" target="_blank" rel="noreferrer" onClick={toggleMenu}>
            Pay Bill
          </a>
          <button
            className="mobile-logout-button"
                onClick={() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    window.location.href = "/login";
                }}
                >
                Log Out
            </button>
        </div>
      )}
    </div>
  );
}

export default MobileSidebar;
