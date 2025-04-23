import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import { uploadDocument } from "../api";
import "../styles/Forms.css";

function InsuranceForm() {
  const [formData, setFormData] = useState({});
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (side === "front") setFrontImage(reader.result);
        if (side === "back") setBackImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const element = document.getElementById("intake-form");

    const opt = {
      margin: 0.5,
      filename: `insurance_form_${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const worker = html2pdf().set(opt).from(element);
    const blob = await worker.outputPdf("blob");
    const file = new File([blob], opt.filename, { type: "application/pdf" });

    const uploadData = new FormData();
    uploadData.append("description", "Insurance Form");
    uploadData.append("document_file", file);

    try {
      await uploadDocument(uploadData);
      alert("Insurance form submitted and uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload form.");
    }
  };

  return (
    <div id="intake-form">
      <h2 id="paper-heading">Insurance Information</h2>
      <form id="paper-form" onSubmit={handleSubmit}>
        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Insurance Card Upload (Optional)</legend>
          <label id="paper-label">Upload front of insurance card
            <input id="paper-input" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "front")} />
          </label>
          <label id="paper-label">Upload back of insurance card
            <input id="paper-input" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "back")} />
          </label>

          {frontImage && (
            <div style={{ marginTop: "10px" }}>
              <p>Front of Card:</p>
              <img src={frontImage} alt="Front of Insurance Card" style={{ maxWidth: "100%", maxHeight: 300 }} />
            </div>
          )}

          {backImage && (
            <div style={{ marginTop: "10px" }}>
              <p>Back of Card:</p>
              <img src={backImage} alt="Back of Insurance Card" style={{ maxWidth: "100%", maxHeight: 300 }} />
            </div>
          )}
        </fieldset>

        <fieldset id="paper-fieldset">
          <legend id="paper-legend">Manual Entry</legend>
          <label id="paper-label">Insurance Provider
            <input id="paper-input" name="insuranceProvider" onChange={handleChange} />
          </label>
          <label id="paper-label">Member ID
            <input id="paper-input" name="memberId" onChange={handleChange} />
          </label>
          <label id="paper-label">Group Number
            <input id="paper-input" name="groupNumber" onChange={handleChange} />
          </label>
          <label id="paper-label">Policyholder Name
            <input id="paper-input" name="policyholder" onChange={handleChange} />
          </label>
          <label id="paper-label">Relationship to Patient
            <input id="paper-input" name="relationship" onChange={handleChange} />
          </label>
          <label id="paper-label">Insurance Phone Number
            <input id="paper-input" name="insurancePhone" onChange={handleChange} />
          </label>
        </fieldset>

        <button id="paper-button" type="submit">
          Submit & Upload PDF
        </button>
      </form>
    </div>
  );
}

export default InsuranceForm;
