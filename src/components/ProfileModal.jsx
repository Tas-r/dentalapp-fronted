import React, { useEffect, useState } from "react";
import "../styles/ProfileModal.css";
import {
  getUserById,
  updateUser,
  getPatientId,
  getPatientById,
  updatePatient
} from "../api";
import { jwtDecode } from "jwt-decode";

function ProfileModal({ onClose }) {
  const [userData, setUserData] = useState({});
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user_id || decoded.id;
        const userRes = await getUserById(userId);
        setUserData(userRes);

        if (userRes.user_type === "patient") {
          const pId = await getPatientId();
          if (pId) {
            const pRes = await getPatientById(pId);
            setPatientData(pRes);
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) =>
    setUserData((prev) => ({ ...prev, [field]: value }));
  const handlePatientChange = (field, value) =>
    setPatientData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      await updateUser(userData.id, {
        username: userData.username,
        email: userData.email,
        phone_number: userData.phone_number,
        address: userData.address,
      });

      if (userData.user_type === "patient" && patientData?.id) {
        await updatePatient(patientData.id, {
          emergency_contact_name: patientData.emergency_contact_name,
          emergency_contact_phone: patientData.emergency_contact_phone,
          medical_history: patientData.medical_history,
          insurance_provider: patientData.insurance_provider,
          insurance_policy_number: patientData.insurance_policy_number,
        });
      }

      alert("Profile updated successfully.");
      setIsEditing(false);
      onClose();
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Update failed.");
    }
  };

  const renderField = (label, value, fieldKey, alwaysReadOnly = false) => (
    <div className="field-row" key={fieldKey}>
      <strong>{label}:</strong>
      {isEditing && !alwaysReadOnly ? (
        <input
          value={value || ""}
          onChange={(e) => handleChange(fieldKey, e.target.value)}
        />
      ) : (
        <span>{value || "Not Provided"}</span>
      )}
    </div>
  );

  const renderPatientField = (label, value, fieldKey) => (
    <div className="field-row" key={fieldKey}>
      <strong>{label}:</strong>
      {isEditing ? (
        <input
          value={value || ""}
          onChange={(e) => handlePatientChange(fieldKey, e.target.value)}
        />
      ) : (
        <span>{value || "Not Provided"}</span>
      )}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Your Info</h2>
          {!isEditing && (
            <button className="confirm-button" onClick={() => setIsEditing(true)}>
              Edit Info
            </button>
          )}
        </div>

        {renderField("Full Name", `${userData.first_name || ""} ${userData.last_name || ""}`, "fullName", true)}
        {renderField("Username", userData.username, "username")}
        {renderField("Email", userData.email, "email")}
        {renderField("Phone Number", userData.phone_number, "phone_number")}
        {renderField("Address", userData.address, "address")}

        {userData.user_type === "patient" && patientData && (
          <>
            {renderPatientField("Emergency Contact Name", patientData.emergency_contact_name, "emergency_contact_name")}
            {renderPatientField("Emergency Contact Phone", patientData.emergency_contact_phone, "emergency_contact_phone")}
            {renderPatientField("Medical History", patientData.medical_history, "medical_history")}
            {renderPatientField("Insurance Provider", patientData.insurance_provider, "insurance_provider")}
            {renderPatientField("Insurance Policy Number", patientData.insurance_policy_number, "insurance_policy_number")}
          </>
        )}

        {isEditing && (
          <div className="modal-actions">
            <button className="confirm-button" onClick={handleSave}>Save</button>
            <button className="danger-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileModal;

