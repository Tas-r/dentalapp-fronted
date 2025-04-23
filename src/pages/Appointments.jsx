import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import "../styles/Appointments.css";
import { getAllAppointments, getDentists } from "../api";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [dentists, setDentists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [apptData, dentistData] = await Promise.all([
            getAllAppointments(),
            getDentists()
            ]);
            setAppointments(apptData);
            setDentists(dentistData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const getDentistName = (appointment) => {
        const match = dentists.find((doc) => doc.id === appointment.dentist?.id);
        if (match?.user) {
        const { first_name, last_name, username } = match.user;
        return first_name || last_name
            ? `Dr. ${first_name || ""} ${last_name || ""}`.trim()
            : `Dr. ${username}`;
        }
        return `Dr. ${appointment.dentist?.username || "Unknown"}`;
    };

    const now = new Date();

    const upcoming = appointments
        .filter((a) => new Date(a.appointment_date) >= now)
        .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
        .slice(0, 3);

    const past = appointments
        .filter((a) => new Date(a.appointment_date) < now)
        .sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date))
        .slice(0, 3);

    const AppointmentCard = ({ appt }) => {
        const isPast = new Date(appt.appointment_date) < now;

        return (
        <div className="card">
            <div className="appointment-info-grid">
            <div><strong>Dentist:</strong></div>
            <div>{getDentistName(appt)}</div>

            <div><strong>Date:</strong></div>
            <div>{new Date(appt.appointment_date).toLocaleDateString()}</div>

            <div><strong>Time:</strong></div>
            <div>{new Date(appt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>

            <div><strong>Reason:</strong></div>
            <div>{appt.services?.map(s => s.name).join(", ") || "N/A"}</div>

            <div><strong>Notes:</strong></div>
            <div>{appt.notes || "None"}</div>

            {isPast && appt.treatment_outcome && (
                <>
                <div><strong>Outcome:</strong></div>
                <div>{appt.treatment_outcome}</div>
                </>
            )}

            {isPast && appt.doctor_notes && (
                <>
                <div><strong>Doctor's Notes:</strong></div>
                <div>{appt.doctor_notes}</div>
                </>
            )}
            </div>

            {!isPast && (
            <button className="confirm-button" onClick={() => navigate(`/appointment/edit/${appt.id}`)}>
                Edit Appointment
            </button>
            )}

            {isPast && (
            <p className="past-note">This appointment has already occurred.</p>
            )}
        </div>
        );
    };

    return (
        <div className="page-container">
        <Sidebar activePage="appointments" />
        <div className="dashboard-content">
            <h1 className="page-title">Appointments</h1>

            <div className="appointments-inner">
            <button className="confirm-button" onClick={() => navigate("/appointment/create")}>
                Create New Appointment
            </button>

            {loading ? (
                <p>Loading appointments...</p>
            ) : (
                <>
                <div className="appointment-section">
                    <h2>Upcoming Appointments</h2>
                    <div className="appointments-list">
                    {upcoming.length
                        ? upcoming.map((appt) => <AppointmentCard key={appt.id} appt={appt} />)
                        : <p>No upcoming appointments.</p>}
                    </div>
                </div>

                <div className="appointment-section">
                    <h2>Past Appointments</h2>
                    <div className="appointments-list">
                    {past.length
                        ? past.map((appt) => <AppointmentCard key={appt.id} appt={appt} />)
                        : <p>No past appointments.</p>}
                    </div>
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    );
}

export default Appointments;
