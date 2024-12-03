import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient'; // Import Supabase client
import './Alert.css';

export default function Alert() {
  const location = useLocation(); // Get the current path for active menu item highlighting
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(""); // State to track the message input
  const [users, setUsers] = useState([]); // State to hold user data
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user for notification

  // Function to toggle modal visibility
  const toggleModal = (user) => {
    setSelectedUser(user); // Set the selected user to send the notification to
    setShowModal(!showModal);
  };

  // Function to handle message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to handle sending notification
  const handleSendNotif = async () => {
    if (!message || !selectedUser) {
      alert("Please select a user and enter a message.");
      return;
    }

    const recipientEmail = selectedUser.email;

    try {
      const response = await fetch('https://your-backend-url.com/send-notif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: recipientEmail,
          message: message,
          subject: "New Notification from Church Konek",
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Notification sent successfully!");
        setShowModal(false); // Close modal
        setMessage(""); // Clear message field
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification.");
    }
  };

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('user_id, full_name, email');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data.map(user => ({
          id: user.user_id,
          name: user.full_name,
          email: user.email
        })));
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only on component mount

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src="./images/logo.png" alt="Church Konek Logo" className="logo" />
          <h2 className="brand-text" style={{ fontSize: '20px' }}>Church Konek</h2>
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
          <input
            type="text"
            placeholder="Search User"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange} // Update search term on input change
          />
        </div>

        {/* User Notification List */}
        <div className="alert-list">
          {filteredUsers.map((user, index) => (
            <div className="alert-item" key={index}>
              <div className="user-info">
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
                <div className="email-details">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
              <div className="user-role">USER</div>
              <button className="send-alert-btn" onClick={() => toggleModal(user)}>SEND NOTIF</button>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {/* X Close Button */}
              <button className="close-btn" onClick={() => setShowModal(false)}>
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
