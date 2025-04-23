import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Portal.css";
import {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
  replyToMessage,
  getDentists,
  getInboxMessages,
  getMessageById,
  refreshToken,
  getUserById,
} from "../api";
import { jwtDecode } from "jwt-decode";

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [dentists, setDentists] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newMessage, setNewMessage] = useState({
    recipient_id: "",
    subject: "",
    body: "",
  });
  const [replyMessage, setReplyMessage] = useState({
    recipient_id: "",
    subject: "",
    body: "",
  });
  const [error, setError] = useState("");
  const [view, setView] = useState("inbox");

  const formatDisplayName = (user) => {
    if (!user) return "Unknown";
    if (user.id === loggedInUser?.id) return `${user.first_name} ${user.last_name}`;
    return user.user_type === "dentist"
      ? `Dr. ${user.last_name || user.username}`
      : `${user.first_name || ""} ${user.last_name || user.username}`.trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.user_id || decoded.id;
          const userData = await getUserById(userId);
          setLoggedInUser(userData);
        }

        const dentistsData = await getDentists();
        setDentists(dentistsData);
        const messagesData = await getMessages();
        setMessages(messagesData);
        const inboxData = await getInboxMessages();
        setInboxMessages(inboxData);
      } catch (err) {
        handleError(err);
      }
    };
    fetchData();
  }, []);

  const handleError = async (err) => {
    if (err.response?.status === 401) {
      try {
        await refreshToken();
        const dentistsData = await getDentists();
        setDentists(dentistsData);
        const messagesData = await getMessages();
        setMessages(messagesData);
        const inboxData = await getInboxMessages();
        setInboxMessages(inboxData);
        setError("");
      } catch {
        setError("Session expired. Please log in again.");
      }
    } else if (err.code === "ERR_NETWORK") {
      setError("Cannot connect to the server. Please ensure the backend is running.");
    } else {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  };

  const handleSelectMessage = async (message) => {
    if (selectedMessage?.id === message.id) {
      setSelectedMessage(null);
      return;
    }
    try {
      const messageData = await getMessageById(message.id);
      setSelectedMessage(messageData);
      setReplyMessage({
        recipient_id: messageData.sender.id,
        subject: `Re: ${messageData.subject}`,
        body: "",
      });
      if (!messageData.is_read) {
        await updateMessage(message.id, { is_read: true });
        const messagesData = await getMessages();
        setMessages(messagesData);
        const inboxData = await getInboxMessages();
        setInboxMessages(inboxData);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(newMessage);
      setNewMessage({ recipient_id: "", subject: "", body: "" });
      const messagesData = await getMessages();
      setMessages(messagesData);
      const inboxData = await getInboxMessages();
      setInboxMessages(inboxData);
      setError("");
    } catch (err) {
      handleError(err);
    }
  };

  const handleReplyMessage = async (e) => {
    e.preventDefault();
    try {
      await replyToMessage(selectedMessage.id, {
        ...replyMessage,
        recipient_id: selectedMessage.sender.id,
      });
      setReplyMessage({ recipient_id: "", subject: "", body: "" });
      setSelectedMessage(null);
      const messagesData = await getMessages();
      setMessages(messagesData);
      const inboxData = await getInboxMessages();
      setInboxMessages(inboxData);
      setError("");
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setSelectedMessage(null);
      setReplyMessage({ recipient_id: "", subject: "", body: "" });
      const messagesData = await getMessages();
      setMessages(messagesData);
      const inboxData = await getInboxMessages();
      setInboxMessages(inboxData);
      setError("");
    } catch (err) {
      handleError(err);
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <div className="portal-container">
      <Sidebar activePage="messages" />
      <div className="main-content dashboard-content">
        <h1 className="page-title">Messaging</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="view-toggle">
          <button className={view === "inbox" ? "active" : ""} onClick={() => setView("inbox")}>Inbox ({inboxMessages.length})</button>
          <button className={view === "all" ? "active" : ""} onClick={() => setView("all")}>All Messages</button>
        </div>

        <div className="message-list">
          <h3>{view === "inbox" ? "Unread Messages" : "All Messages"}</h3>
          {(view === "inbox" ? inboxMessages : messages).length === 0 ? (
            <p>{view === "inbox" ? "No unread messages." : "No messages available."}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(view === "inbox" ? inboxMessages : messages).map((message) => (
                  <React.Fragment key={message.id}>
                    <tr
                      onClick={() => handleSelectMessage(message)}
                      className={selectedMessage?.id === message.id ? "selected" : ""}
                    >
                      <td>{formatDisplayName(message.sender)}</td>
                      <td>{formatDisplayName(message.recipient)}</td>
                      <td>{message.subject}</td>
                      <td>{formatDate(message.created_at)}</td>
                      <td>{message.is_read ? "Read" : "Unread"}</td>
                    </tr>
                    {selectedMessage?.id === message.id && (
                      <tr>
                        <td colSpan={5}>
                          <div className="message-details">
                            <h3>Message Details</h3>
                            <p><strong>From:</strong> {formatDisplayName(selectedMessage.sender)}</p>
                            <p><strong>To:</strong> {formatDisplayName(selectedMessage.recipient)}</p>
                            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                            <p><strong>Date:</strong> {formatDate(selectedMessage.created_at)}</p>
                            <p><strong>Body:</strong> {selectedMessage.body}</p>
                            <button onClick={() => handleDeleteMessage(selectedMessage.id)}>Delete Message</button>

                            <div className="reply-form">
                              <h4>Reply</h4>
                              <form onSubmit={handleReplyMessage}>
                                <input
                                  type="text"
                                  value={replyMessage.subject}
                                  onChange={(e) =>
                                    setReplyMessage({
                                      ...replyMessage,
                                      subject: e.target.value,
                                    })
                                  }
                                  placeholder="Subject"
                                  required
                                />
                                <textarea
                                  value={replyMessage.body}
                                  onChange={(e) =>
                                    setReplyMessage({
                                      ...replyMessage,
                                      body: e.target.value,
                                    })
                                  }
                                  placeholder="Type your reply..."
                                  required
                                ></textarea>
                                <button type="submit">Send Reply</button>
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {view === "inbox" && (
          <div className="new-message-form">
            <h3>Compose New Message</h3>
            <form onSubmit={handleSendMessage}>
              <select
                value={newMessage.recipient_id}
                onChange={(e) => setNewMessage({ ...newMessage, recipient_id: e.target.value })}
                required
              >
                <option value="">Select Recipient</option>
                {dentists.map((dentist) => (
                  <option key={dentist.id} value={dentist.user.id}>
                    Dr. {dentist.user.last_name || dentist.user.username} ({dentist.specialization})
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                placeholder="Subject"
                required
              />
              <textarea
                value={newMessage.body}
                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                placeholder="Type your message..."
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messaging;