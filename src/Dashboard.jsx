import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1 className="title">
          Welcome to <span className="brand">Church Konek</span>
        </h1>
        <div className="dashboard-cards">
          <div className="card">
            <Link to="/dashboard" className="card-link">Dashboard</Link>
          </div>
          <div className="card">
            <Link to="/view-appointment" className="card-link">View Appointment</Link>
          </div>
          <div className="card">
            <Link to="/manage-user" className="card-link">Manage User</Link>
          </div>
          <div className="card">
            <Link to="/send-alert" className="card-link">Send Alert</Link>
          </div>
        </div>

        {/* Add Profile link at the bottom */}
        <div className="card profile-card">
          <Link to="/profile" className="card-link">Profile</Link>
        </div>
      </div>
    </div>
  );
}