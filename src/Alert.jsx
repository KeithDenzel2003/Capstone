import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './Alert.css';
import logo from '/images/logo.png';

export default function Alert() {
  const location = useLocation(); // Use this hook to get the current path

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Brand Logo */}
        <div className="brand">
        <img src={logo} alt="logo" className="logo" />
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

          {/* Add the Send Alerts Link */}
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
          <div className="alert-item">
            <div className="user-info">
              <img src="./images/user1.png" alt="User Profile" className="profile-image" /> {/* Profile Image */}
              <div className="email-details">
                <h3>Francis Flancia</h3>
                <p>flanciafrancis@gmail.com</p>
              </div>
            </div>
            <div className="user-role">USER</div>
            <button className="send-alert-btn">SEND NOTIF</button>
          </div>

          {/* Duplicate this block for more users */}
          <div className="alert-item">
            <div className="user-info">
              <img src="./images/user2.png" alt="User Profile" className="profile-image" /> {/* Profile Image */}
              <div className="email-details">
                <h3>John Doe</h3>
                <p>johndoe@gmail.com</p>
              </div>
            </div>
            <div className="user-role">USER</div>
            <button className="send-alert-btn">SEND NOTIF</button>
          </div>

          <div className="alert-item">
            <div className="user-info">
              <img src="./images/user3.png" alt="User Profile" className="profile-image" /> {/* Profile Image */}
              <div className="email-details">
                <h3>Jane Smith</h3>
                <p>janesmith@gmail.com</p>
              </div>
            </div>
            <div className="user-role">USER</div>
            <button className="send-alert-btn">SEND NOTIF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
