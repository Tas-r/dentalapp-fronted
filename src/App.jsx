import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OurPractice from "./pages/index/OurPractice";
import CommunityOutreach from "./pages/index/CommunityOutreach";
import Services from "./pages/index/services";
import Technology from "./pages/index/Technology";
import AdditionalInfo from "./pages/index/AdditionalInfo";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Appointments from "./pages/Appointments";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import AppointmentCreate from "./pages/AppointmentCreate";
import AppointmentEdit from "./pages/AppointmentEdit";
import Documents from "./pages/Documents";
import Messaging from "./pages/Messaging";
import MedicalHistory from "./pages/MedicalHistory";
import IntakeForm from "./pages/IntakeForm";
import ConsentForm from "./pages/ConsentForm";
import InsuranceForm from "./pages/InsuranceForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/our-practice" element={<OurPractice />} />
        <Route path="/community-outreach" element={<CommunityOutreach />} />
        <Route path="/services" element={<Services />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route wrapper */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointment/confirmation" element={<AppointmentConfirmation />} />
          <Route path="/appointment/create" element={<AppointmentCreate />} />
          <Route path="/appointment/edit/:id" element={<AppointmentEdit />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/inbox" element={<Messaging />} />
          <Route path="/history" element={<MedicalHistory />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/consent" element={<ConsentForm />} />
          <Route path="/insurance" element={<InsuranceForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;