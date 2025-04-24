import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Index.css"; 
import "../styles/Sidebar.css"; 

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/our-practice", label: "Our Practice" },
    { path: "/additional-info", label: "Additional Info" },
  ];

  return (
    <nav className="main-nav">
      {navLinks.map(({ path, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={location.pathname === path ? "nav-button active" : "nav-button"}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default NavBar;

