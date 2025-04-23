import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import { getAllDocuments, uploadDocument, deleteDocument } from "../api";
import { API_BASE_URL } from "../../constants";

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const data = await getAllDocuments();
            const sorted = data.sort(
                (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
            );
            setDocuments(sorted);
        } catch (err) {
            console.error("Failed to fetch documents:", err);
        }
    };
    

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !description) {
            alert("Please select a file and document type.");
            return;
        }

        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must not exceed 5MB.");
            return;
        }

        const formData = new FormData();
        formData.append("description", description);
        formData.append("document_file", file);

        try {
            await uploadDocument(formData);
            setDescription("");
            setFile(null);
            fetchDocuments();
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Make sure the file is a PDF under 5MB and you're logged in as a patient.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDocument(id);
            fetchDocuments();
        } catch (err) {
            console.error("Failed to delete document:", err);
            alert("Unable to delete document.");
        }
    };

    const getDocURL = (path) =>
        path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

    return (
        <div className="page-container">
            <Sidebar activePage="documents" />
            <div className="dashboard-content">
                <h1 className="page-title">My Documents</h1>

                <div className="dashboard-sections two-column">
                    {/* LEFT PANEL */}
                    <div className="left-column">
                        <div className="card upload-card">
                            <h2>Upload a Document</h2>
                            <form onSubmit={handleUpload}>
                                <select
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                >
                                    <option value="">Select Document Type</option>
                                    <option value="Patient Intake Form">Patient Intake Form</option>
                                    <option value="X-Ray">X-Ray</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Consent Form">Consent Form</option>
                                    <option value="Insurance Card">Insurance Card</option>
                                </select>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                />
                                <button type="submit" className="confirm-button">Upload</button>
                            </form>
                        </div>

                        <div className="form-links">
                            <a href="/intake" target="_blank" rel="noopener noreferrer">Patient Intake Form</a>
                            <a href="/consent" target="_blank" rel="noopener noreferrer">Medical Consent Form</a>
                            <a href="/insurance" target="_blank" rel="noopener noreferrer">Insurance Form</a>
                        </div>
                    </div>

                    <div className="right-column">
  {documents.length > 0 ? (
    documents.map((doc) => (
      <div className="card document-card" key={doc.id}>
        <div className="doc-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0 }}><strong>{doc.description}</strong></p>
            <p style={{ margin: "4px 0" }}>Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => window.open(getDocURL(doc.document_file), "_blank")}
            >
              View Document
            </button>
          </div>
          <button
            onClick={() => handleDelete(doc.id)}
            className="text-link"
            title="Delete Document"
          >
            delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No documents uploaded yet.</p>
  )}
</div>

                </div>
            </div>
        </div>
    );
}

export default Documents;
