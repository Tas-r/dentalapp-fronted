import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import { getUpcomingAppointments, getNotifications, getDentists } from "../api";

function Dashboard() {
    const [appointment, setAppointment] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [dentists, setDentists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appData = await getUpcomingAppointments();
                setAppointment(appData[0] || null);
            } catch (err) {
                console.error("☹ Failed to fetch upcoming appointments:", err);
            }

            try {
                const notifData = await getNotifications();
                setNotifications(notifData.slice(0, 3));
            } catch (err) {
                console.error("☹ Failed to fetch notifications:", err);
            }

            try {
                const dentistData = await getDentists();
                setDentists(dentistData);
            } catch (err) {
                console.error("☹ Failed to fetch dentists:", err);
            }
        };

        fetchData();
    }, []);

    const getDentistName = (appointment) => {
        if (!appointment || !appointment.dentist || !appointment.dentist.id) return "Unknown Dentist";

        const match = dentists.find((doc) => doc.id === appointment.dentist.id);
        if (match && match.user) {
            const hasNames = match.user.first_name || match.user.last_name;
            return hasNames ? `Dr. ${match.user.first_name || ""} ${match.user.last_name || ""}`.trim() : `Dr. ${match.user.username}`;
        }

        return `Dr. ${appointment.dentist.username || "Unknown"}`;
    };

    const getFormattedDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString();
    };

    const getFormattedTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="page-container">
            <Sidebar activePage="dashboard" />
            <div className="dashboard-content">
                <h1 className="page-title">Dashboard</h1>

                <div className="dashboard-sections">
                    {/* Upcoming Appointment */}
                    <div className="card">
                        <h2>Upcoming Appointment</h2>
                        {appointment ? (
                            <div className="appointment-details">
                                <p>
                                    You’ll be meeting with <b>{getDentistName(appointment)}</b><br />
                                    on <b>{getFormattedDate(appointment.appointment_date)}</b> at <b>{getFormattedTime(appointment.appointment_date)}</b>!
                                </p>
                                <p><b>Location:</b><br />6635 Flanders Dr. Suite E,<br />San Diego, CA 92121</p>
                            </div>
                        ) : (
                            <p>No upcoming appointments found.</p>
                        )}
                    </div>

                    {/* Notifications */}
                    <div className="card">
                        <h2>Notifications</h2>
                        {notifications.length > 0 ? (
                            <div>
                                {notifications.map((n, i) => (
                                    <p key={i}><b>{n.notification_type}</b>: {n.message}</p>
                                ))}
                            </div>
                        ) : (
                            <p>You have no new notifications.</p>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="card quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            <div className="action">
                                <img src="/calendar-icon.png" alt="Schedule" />
                                <p>Schedule an appointment</p>
                            </div>
                            <div className="action">
                                <img src="/update-icon.png" alt="Update Info" />
                                <p>Update your information</p>
                            </div>
                            <div className="action">
                                <img src="/messages-icon.png" alt="Messages" />
                                <p>View messages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;