import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // React router for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'; // Added faTimes for X button
import './Alert.css';
import axios from 'axios';

export default function Alert() {
  const location = useLocation(); // Get the current path for active menu item highlighting
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(""); // State to track the message input

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to handle message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to handle sending notification     BINAGO KO TO PERO HINDI PA NA TETESTING
  const handleSendNotif = async () => {
    try {
      // Replace "user-id-example" with the actual ID you need
      const userId = "user-id-example";
      const response = await axios.post('http://localhost:5000/api/sendNotification', {
        userId,
        message,
      });
  
      if (response.data.success) {
        alert("Notification sent successfully!");
        setShowModal(false); // Close modal after sending
        setMessage(""); // Clear message
      }
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert("Failed to send notification");
    } // HANGGANG  DITO
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
      <div className="brand">
          <h2 className="brand-text">Church Konek</h2>
        </div>
        
        {/* Menu Items */}
        <div className="menu-items">
          <div className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <Link to="/dashboard" className="menu-link">
              <FontAwesomeIcon icon={faThLarge} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </Link>
          </div>
          <div className={`menu-item ${location.pathname === '/view-appointment' ? 'active' : ''}`}>
            <Link to="/view-appointment" className="menu-link">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              <span className="menu-text">View Appointments</span>
            </Link>
          </div>
          <div className={`menu-item ${location.pathname === '/manage-user' ? 'active' : ''}`}>
            <Link to="/manage-user" className="menu-link">
              <FontAwesomeIcon icon={faUserCog} className="menu-icon" />
              <span className="menu-text">Manage User</span>
            </Link>
          </div>
          <div className={`menu-item ${location.pathname === '/send-alert' ? 'active' : ''}`}>
            <Link to="/send-alert" className="menu-link">
              <FontAwesomeIcon icon={faBell} className="menu-icon" />
              <span className="menu-text">Send Alerts</span>
            </Link>
          </div>
        </div>

        {/* Profile at the bottom */}
        <div className={`menu-item profile-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <Link to="/profile" className="menu-link">
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
            <span className="menu-text">Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Content - Alert Section */}
      <div className="alert-page">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search User" className="search-input" />
        </div>

        {/* User Notification List */}
        <div className="alert-list">
          {['Francis Flancia', 'Boyka', 'Lebron Jordan'].map((user, index) => (
            <div className="alert-item" key={index}>
              <div className="user-info">
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
                <div className="email-details">
                  <h3 className="user-name">{user}</h3>
                  <p className="user-email">{`${user.toLowerCase().replace(' ', '')}@gmail.com`}</p>
                </div>
              </div>
              <div className="user-role">USER</div>
              <button className="send-alert-btn" onClick={toggleModal}>SEND NOTIF</button>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {/* X Close Button */}
              <button className="close-btn" onClick={toggleModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2>SEND NOTIF</h2>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter your message here..."
                className="modal-textarea"
              />
              <button className="modal-send-btn" onClick={handleSendNotif}>SEND NOTIF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
