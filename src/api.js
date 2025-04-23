import axios from "axios";
import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTHENTICATION // AUTHENTICATION // AUTHENTICATION // AUTHENTICATION // AUTHENTICATION // AUTHENTICATION //

export const loginUser = async (username, password) => {
    const res = await axios.post(`${API_BASE_URL}/users/login/`, {
      username,
      password,
    }, { withCredentials: true });
  
    const { access, access_token, refresh, refresh_token } = res.data;
  
    localStorage.setItem("access", access || access_token);
    localStorage.setItem("refresh", refresh || refresh_token);
  
    return res.data;
};  

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  const res = await axios.post(`${API_BASE_URL}/users/token/refresh/`, { refresh });
  localStorage.setItem("access", res.data.access);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/users/signup/`, data);
  return res.data;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APPOINTMENTS // APPOINTMENTS // APPOINTMENTS // APPOINTMENTS // APPOINTMENTS // APPOINTMENTS // APPOINTMENTS //

export const getAllAppointments = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/`, { headers });
  return res.data;
};

export const getAppointmentById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/${id}/`, { headers });
  return res.data;
};

export const getUpcomingAppointments = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/upcoming/`, { headers });
  return res.data;
};

export const getUserAppointments = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/my-appointments/`, { headers });
  return res.data;
};

export const getServices = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/services/`, { headers });
  return res.data;
};

export const getServiceById = async (id) => {
  const services = await getServices();
  return services.find(s => s.id === id);
};

export const getAvailableTimeSlots = async (dentistId, dateStr) => {
  const headers = getAuthHeaders();
  const res = await axios.get(
    `${API_BASE_URL}/appointments/time-slots/?dentist_id=${dentistId}&date=${dateStr}`,
    { headers }
  );
  return res.data.available_slots || [];
};

export const getAppointmentDentists = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/appointments/dentists/`, { headers });
  return res.data;
};

export const createAppointment = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.post(`${API_BASE_URL}/appointments/`, data, { headers });
  return res.data;
};

export const updateAppointment = async (id, data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.put(`${API_BASE_URL}/appointments/${id}/`, data, { headers });
  return res.data;
};

export const rescheduleAppointment = async (id, data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.put(`${API_BASE_URL}/appointments/${id}/reschedule/`, data, { headers });
  return res.data;
};

export const deleteAppointment = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.delete(`${API_BASE_URL}/appointments/${id}/`, { headers });
  return res.data;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS // DOCUMENTS //

export const getAllDocuments = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/documents/`, { headers });
  return res.data;
};

export const getDocumentById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/documents/${id}/`, { headers });
  return res.data;
};

export const uploadDocument = async (formData) => {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    };
    const res = await axios.post(`${API_BASE_URL}/documents/`, formData, { headers });
    return res.data;
  };

export const deleteDocument = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.delete(`${API_BASE_URL}/documents/${id}/`, { headers });
  return res.data;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDICAL HISTORY // MEDICAL HISTORY // MEDICAL HISTORY // MEDICAL HISTORY // MEDICAL HISTORY // MEDICAL HISTORY //

export const getMyMedicalHistory = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/medical_history/medical-history/my_history/`, { headers });
  return res.data;
};

export const getMedicalHistory = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/medical_history/medical-history/my_history/`, {
    headers,
  });
  return res.data;
};


export const getMedicalHistoryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/medical_history/medical-history/${id}/`);
  return response.data;
};

export const createMedicalHistory = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/medical_history/medical-history/`, data);
  return response.data;
};

export const updateMedicalHistory = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/medical_history/medical-history/${id}/`, data);
  return response.data;
};

export const deleteMedicalHistory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/medical_history/medical-history/${id}/`);
  return response.data;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MESSAGING // MESSAGING // MESSAGING // MESSAGING // MESSAGING // MESSAGING // MESSAGING // MESSAGING // MESSAGING //

export const getMessages = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/messaging/list_create/`, { headers });
  return res.data;
};

export const sendMessage = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.post(`${API_BASE_URL}/messaging/list_create/`, data, { headers });
  return res.data;
};

export const getMessageById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/messaging/${id}/view_update_delete/`, { headers });
  return res.data;
};

export const updateMessage = async (id, data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.put(`${API_BASE_URL}/messaging/${id}/view_update_delete/`, data, { headers });
  return res.data;
};

export const deleteMessage = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.delete(`${API_BASE_URL}/messaging/${id}/view_update_delete/`, { headers });
  return res.data;
};

export const replyToMessage = async (id, data) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const res = await axios.post(`${API_BASE_URL}/messaging/${id}/reply/`, data, { headers });
  return res.data;
};

export const getInboxMessages = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/messaging/inbox/`, { headers });
  return res.data;
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTIFICATIONS // NOTIFICATIONS // NOTIFICATIONS // NOTIFICATIONS // NOTIFICATIONS // NOTIFICATIONS // NOTIFICATIONS //

export const getNotifications = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/notifications/`, { headers });
  return res.data;
};

export const markNotificationAsRead = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.post(`${API_BASE_URL}/notifications/${id}/read/`, {}, { headers });
  return res.data;
};

export const markAllNotificationsAsRead = async () => {
  const headers = getAuthHeaders();
  const res = await axios.post(`${API_BASE_URL}/notifications/read-all/`, {}, { headers });
  return res.data;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS // USERS //

export const getAllUsers = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/users/`, { headers });
  return res.data;
};

export const getUserById = async (id) => {
    const headers = getAuthHeaders();
    const res = await axios.get(`${API_BASE_URL}/users/users/${id}/`, { headers });
    return res.data;
};
  
export const updateUser = async (id, data) => {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    };
    const res = await axios.patch(`${API_BASE_URL}/users/users/${id}/`, data, { headers });
    return res.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS // PATIENTS //

export const getAllPatients = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/patients/`, { headers });
  return res.data;
};

export const getPatientById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/patients/${id}/`, { headers });
  return res.data;
};

export const getPatientId = async () => {
    const headers = getAuthHeaders();
    const res = await axios.get(`${API_BASE_URL}/users/patients/`, { headers });
    return res.data[0]?.id;
};

export const getPatientByUsername = async (username) => {
    const headers = getAuthHeaders();
    const res = await axios.get(`${API_BASE_URL}/users/patients/by_username/${username}/`, { headers });
    return res.data;
};
  
export const updatePatient = async (id, data) => {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    };
    const res = await axios.patch(`${API_BASE_URL}/users/patients/${id}/`, data, { headers });
    return res.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS // DENTISTS //

export const getDentists = async () => {
    const headers = getAuthHeaders();
    const res = await axios.get(`${API_BASE_URL}/users/dentists/`, { headers });
    return res.data;
};

export const getDentistById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/dentists/${id}/`, { headers });
  return res.data;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF // STAFF //

export const getAllStaff = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/staff/`, { headers });
  return res.data;
};

export const getStaffById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_BASE_URL}/users/staff/${id}/`, { headers });
  return res.data;
};
