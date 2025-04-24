import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Sidebar.css";

function IndexMobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/our-practice", label: "Our Practice" },
    { path: "/additional-info", label: "Additional Info" },
    { path: "/login", label: "Log In" },
  ];

  return (
    <div className="mobile-nav-container">
      <div className="mobile-nav-bar">
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-dropdown-menu">
          {navLinks.map(({ path, label }) => (
            <button
            key={path}
            onClick={() => {
              navigate(path);
              toggleMenu();
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#F4F3EF", 
              fontSize: "20px",
              fontFamily: "Nunito, sans-serif",
              padding: "10px 0",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
          
          ))}
        </div>
      )}
    </div>
  );
}

export default IndexMobileSidebar;

