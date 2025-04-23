import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import { getMedicalHistory } from "../api";

function MedicalHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMedicalHistory();
        console.log("Fetched medical history:", data);
        setHistory(data);
      } catch (err) {
        console.error("Error fetching medical history:", err);
        setError("Could not load medical history.");
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formatDentistName = (dentist) => {
        if (!dentist) return "Unassigned";
        const hasName = dentist.last_name || dentist.first_name;
        if (hasName) {
          return `Dr. ${dentist.last_name || dentist.first_name}`;
        }
        return `Dr. ${dentist.username || "Unknown"}`;
      };
      
  return (
    <div className="page-container">
      <Sidebar activePage="medical-history" />
      <div className="dashboard-content">
        <h1 className="page-title">Medical History</h1>

        {error && <div className="error-message">{error}</div>}

        {history.length === 0 ? (
          <p>No medical history entries found.</p>
        ) : (
          <div className="dashboard-sections">
            {history.map((entry) => (
              <div className="card" key={entry.id}>
                <h3>{entry.diagnosis}</h3>
                <p><b>Date of Diagnosis:</b> {formatDate(entry.date_of_diagnosis)}</p>
                <p><b>Treatment Plan:</b> {entry.treatment_plan || "None provided"}</p>
                <p>
                <b>Dentist:</b>{" "}
                    {entry.dentist?.user?.last_name
                    ? `Dr. ${entry.dentist.user.last_name}`
                    : entry.dentist?.user?.username
                    ? `Dr. ${entry.dentist.user.username}`
                    : "Unassigned"}
                </p>
                <p style={{ fontSize: "13px", color: "#888" }}>
                  Created: {formatDate(entry.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalHistory;
