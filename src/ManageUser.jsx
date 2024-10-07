import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './ManageUser.css';

export default function ManageUser() {
  const location = useLocation(); // Get the current URL path
  const [users, setUsers] = useState([
    { id: 1, name: 'Francis Flancia', email: 'flanciafrancis@gmail.com', role: 'User' },
    // Add more user objects here
  ]);

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Brand Logo */}
        <div className="brand">
          <img src="./images/logo.png" alt="Church Konek Logo" className="logo" />
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

      {/* Main Content */}
      <div className="main-content">
        <div className="manage-user-container">
          <h1>Manage Users</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search User..." />
            <button className="add-user-button">Add User</button>
          </div>

          {/* User List */}
          <div className="user-list">
            {users.map(user => (
              <div className="user-card" key={user.id}>
                <div className="user-info">
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                  <div className="user-details">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="user-actions">
                  <span className="user-role">{user.role}</span>
                  <button className="edit-button">Edit</button>
                  <button className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
