import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Portal.css";
import "../../styles/Index.css";
import Footer from "../../components/Footer";
import IndexResponsiveSidebar from "../../components/IndexResponsiveSidebar";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {question}
        <span className="faq-toggle">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  );
}

function AdditionalInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const faqs = [
    {
      question: "How often should I visit the dentist?",
      answer: "We recommend a checkup and cleaning every six months. Patients with specific conditions may benefit from more frequent visits."
    },
    {
      question: "What’s the difference between a cleaning and deep cleaning?",
      answer: "A standard cleaning removes surface plaque and tartar. A deep cleaning (scaling and root planing) is more involved and targets bacteria below the gumline to treat gum disease."
    },
    {
      question: "Are X-rays really necessary?",
      answer: "Yes. X-rays allow us to detect issues that aren't visible to the naked eye—such as cavities between teeth, bone loss, or impacted teeth."
    },
    {
      question: "Is teeth whitening safe?",
      answer: "When done properly under supervision, yes. We offer professional whitening that is both safe and effective without damaging enamel."
    },
    {
      question: "What can I do about sensitive teeth?",
      answer: "Use a toothpaste designed for sensitivity and avoid acidic foods. If sensitivity persists, we’ll check for receding gums or enamel wear."
    },
    {
      question: "Why do my gums bleed when I brush?",
      answer: "This is often an early sign of gum inflammation or gingivitis. Consistent brushing, flossing, and professional cleanings can help reverse it."
    }
  ];

  return (
    <div className="main-container">

      <header className="top-header">
        <div className="clinic-name">San Diego Dental Studio</div>
        <button className="portal-button" onClick={() => navigate("/login")}>
          Enter Portal
        </button>
      </header>

      <IndexResponsiveSidebar activePage="additional-info" />

      <section className="content-section">
        <h2>Frequently Asked Questions</h2>
        <p>
          We get a lot of great questions from patients—here are some of the most common ones we hear. If you're wondering about something we didn’t answer, feel free to give us a call!
        </p>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AdditionalInfo;
