import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaMoneyBill,
  FaFolderOpen,
  FaComments,
  FaUserCog,
  FaSignOutAlt,
  FaFileMedical,
} from "react-icons/fa";
import { getUserById } from "../api";
import { jwtDecode } from "jwt-decode";
import ProfileModal from "./ProfileModal";
import "../styles/Sidebar.css";

function Sidebar({ activePage }) {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user_id || decoded.id;
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error("failed to fetch user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const getInitials = (first, last) => {
    if (!first && !last) return "NA";
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <ul className="menu">
          <li>
            <NavLink
              to="/dashboard"
              className={activePage === "dashboard" ? "active" : ""}
            >
              <FaTachometerAlt className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={activePage === "appointments" ? "active" : ""}
            >
              <FaCalendarAlt className="icon" /> Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/documents"
              className={activePage === "documents" ? "active" : ""}
            >
              <FaFolderOpen className="icon" /> Documents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inbox"
              className={activePage === "messages" ? "active" : ""}
            >
              <FaComments className="icon" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={activePage === "history" ? "active" : ""}
            >
              <FaFileMedical className="icon" /> History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="https://sandiegodental.securepayments.cardpointe.com/pay?"
              target="_blank"
            >
              <FaMoneyBill className="icon" /> Pay Bill
            </NavLink>
          </li>
        </ul>

        <ul className="bottom-menu">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowProfileModal(true);
              }}
              className={activePage === "profile" ? "active" : ""}
            >
              <FaUserCog className="icon" /> Update Info
            </a>
          </li>

          {user && (
            <div className="sidebar-profile-wrapper">
              <div className="sidebar-profile">
                <div className="profile-initials">
                  {getInitials(user.first_name, user.last_name)}
                </div>
                <div className="profile-info">
                  <span className="profile-name">
                    {user.first_name || "First"} {user.last_name || "Last"}
                  </span>
                  <span className="profile-email">
                    @{user.username || "username"}
                  </span>
                </div>
              </div>
              <div className="profile-tooltip">Hi! That's you!</div>
            </div>
          )}
        </ul>

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Log Out
        </button>
      </div>

      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}

export default Sidebar;
