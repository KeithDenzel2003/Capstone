import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient'; // Import Supabase client
import './Dashboard.css';

export default function Dashboard() {
  const location = useLocation(); // Get the current URL path
  const [appointments, setAppointments] = useState([]); // State to store fetched appointments

  // Fetch appointments from Supabase
  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments') // Table name
        .select('id, title, user_name') // Select relevant fields from the appointments table
        .order('created_at', { ascending: false }); // Optional: order by created date, descending

      if (error) {
        console.error('Error fetching appointments:', error);
      } else {
        setAppointments(data); // Set appointments data to state
      }
    };

    fetchAppointments();
  }, []); // Run only once when the component mounts

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Brand Logo */}
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
        <h1 className="welcome-text">WELCOME, Francis Flancia</h1>

        {/* Appointment Cards */}
        <div className="appointment-section">
          <div className="appointment-header">
            <FontAwesomeIcon icon={faCalendarAlt} className="appointment-icon" />
            <span className="appointment-title">{appointments.length} New Appointments</span>
          </div>

          {/* Appointment List */}
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <FontAwesomeIcon icon={faUser} className="card-icon" />
                <span className="card-text">{appointment.user_name} - {appointment.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
