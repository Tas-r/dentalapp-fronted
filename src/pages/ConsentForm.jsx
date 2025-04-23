import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import { uploadDocument } from "../api";
import "../styles/Forms.css";

function ConsentForm() {
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
      filename: `consent_form_${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const worker = html2pdf().set(opt).from(element);
    const blob = await worker.outputPdf("blob");
    const file = new File([blob], opt.filename, { type: "application/pdf" });

    const uploadData = new FormData();
    uploadData.append("description", "Consent Form");
    uploadData.append("document_file", file);

    try {
      await uploadDocument(uploadData);
      alert("Consent form submitted and uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload form.");
    }
  };

  return (
    <div id="intake-form">
      <h2 id="paper-heading">Consent to Treatment</h2>
      <form id="paper-form" onSubmit={handleSubmit}>
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Patient Information</legend>
          <label id="paper-label">Full Name <input id="paper-input" name="fullName" onChange={handleChange} required /></label>
          <label id="paper-label">Date of Birth <input id="paper-input" name="dob" type="date" onChange={handleChange} required /></label>
        </fieldset>

        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Consent Details</legend>
          <p>
            I hereby authorize the dental professionals at this clinic to perform evaluations, diagnostic procedures, and treatments as deemed necessary for my dental health. This includes but is not limited to cleanings, x-rays, examinations, fillings, and any emergency treatments required.
          </p>
          <p>
            I understand the nature of the procedures, possible alternatives, and potential risks involved. I acknowledge that no guarantees have been made regarding the outcomes of treatments.
          </p>
        </fieldset>

        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Acknowledgement</legend>
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

export default ConsentForm;
