import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import { getDentistById, getServiceById } from "../api";

function AppointmentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { dentist, date, time, reason, notes } = location.state || {};

    const [dentistName, setDentistName] = useState(null);
    const [serviceName, setServiceName] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
          if (dentist) {
            try {
              const dentistData = await getDentistById(dentist);
              const user = dentistData.user;
              const fullName = user.first_name || user.last_name
                ? `Dr. ${user.first_name} ${user.last_name}`.trim()
                : `Dr. ${user.username}`;
              setDentistName(fullName);
            } catch (err) {
              console.error("Failed to fetch dentist name:", err);
              setDentistName(`Dentist #${dentist}`);
            }
          }
      
          if (reason) {
            try {
              const service = await getServiceById(reason);
              setServiceName(service ? service.name : `Service #${reason}`);
            } catch (err) {
              console.error("Failed to fetch service name:", err);
              setServiceName(`Service #${reason}`);
            }
          }
        };
      
        fetchInfo();
    }, [dentist, reason]);
      

    return (
        <div className="page-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1 className="page-title">Appointment Confirmed</h1>
                <div className="confirmation-wrapper" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <p className="confirmation-text" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        Your appointment with <strong>{dentistName || "your dentist"}</strong> has been successfully scheduled for <strong>{date}</strong> at <strong>{time}</strong>.<br /><br />
                        The reason selected was <strong>{serviceName || "your selected service"}</strong>.
                        {notes && <><br /><br /><strong>Additional notes:</strong> "{notes}"</>}<br /><br />
                        You will receive a reminder closer to the appointment date.
                    </p>
                    <div className="confirm-button-container">
                        <button className="confirm-button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentConfirmation;