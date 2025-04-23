import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import { uploadDocument } from "../api";
import "../styles/Forms.css";

function IntakeForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const element = document.getElementById("intake-form");

    const opt = {
      margin: 0.5,
      filename: `intake_form_${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const worker = html2pdf().set(opt).from(element);
    const blob = await worker.outputPdf("blob");
    const file = new File([blob], opt.filename, { type: "application/pdf" });

    const uploadData = new FormData();
    uploadData.append("description", "Patient Intake Form");
    uploadData.append("document_file", file);

    try {
      await uploadDocument(uploadData);
      alert("Form submitted and uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload form.");
    }
  };

  return (
    <div id="intake-form">
      <h2 id="paper-heading">Patient Intake Form</h2>
      <form id="paper-form" onSubmit={handleSubmit}>
        {/* Patient Info */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Patient Information</legend>
          <label id="paper-label">Full Name <input id="paper-input" name="fullName" onChange={handleChange} required /></label>
          <label id="paper-label">Date of Birth <input id="paper-input" name="dob" type="date" onChange={handleChange} required /></label>
          <label id="paper-label">Phone Number <input id="paper-input" name="phone" onChange={handleChange} required /></label>
          <label id="paper-label">Email <input id="paper-input" name="email" type="email" onChange={handleChange} required /></label>
          <label id="paper-label">Address <input id="paper-input" name="address" onChange={handleChange} required /></label>
        </fieldset>

        {/* Medical History */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Medical History</legend>
          <label id="paper-label">Are you currently under a physician's care?
            <input id="paper-input" name="physicianCare" onChange={handleChange} />
          </label>
          <label id="paper-label">List any medications you are taking
            <textarea id="paper-textarea" name="medications" onChange={handleChange} />
          </label>
          <label id="paper-label">Do you have any allergies?
            <textarea id="paper-textarea" name="allergies" onChange={handleChange} />
          </label>
        </fieldset>

        {/* Dental History */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Dental History</legend>
          <label id="paper-label">Reason for today's visit
            <input id="paper-input" name="visitReason" onChange={handleChange} />
          </label>
          <label id="paper-label">Do your gums bleed while brushing/flossing?
            <input id="paper-input" name="bleedingGums" onChange={handleChange} />
          </label>
          <label id="paper-label">Do you have any pain or discomfort?
            <textarea id="paper-textarea" name="dentalPain" onChange={handleChange} />
          </label>
        </fieldset>

        {/* Insurance Info */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Insurance Information</legend>
          <label id="paper-label">Insurance Provider <input id="paper-input" name="insuranceProvider" onChange={handleChange} /></label>
          <label id="paper-label">Policy Number <input id="paper-input" name="policyNumber" onChange={handleChange} /></label>
        </fieldset>

        {/* Emergency Contact */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Emergency Contact</legend>
          <label id="paper-label">Name <input id="paper-input" name="emergencyName" onChange={handleChange} /></label>
          <label id="paper-label">Relationship <input id="paper-input" name="emergencyRelation" onChange={handleChange} /></label>
          <label id="paper-label">Phone Number <input id="paper-input" name="emergencyPhone" onChange={handleChange} /></label>
        </fieldset>

        {/* Consent */}
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Consent</legend>
          <p>I certify that the information provided is accurate to the best of my knowledge. I consent to treatment as deemed necessary by the dental provider.</p>
          <label id="paper-label">Signature <input id="paper-input" name="signature" onChange={handleChange} required /></label>
          <label id="paper-label">Date <input id="paper-input" name="consentDate" type="date" onChange={handleChange} required /></label>
        </fieldset>

        <button id="paper-button" type="submit">
          Submit & Upload PDF
        </button>
      </form>
    </div>
  );
}

export default IntakeForm;
