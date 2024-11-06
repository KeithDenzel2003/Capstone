import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient';
import './ManageUser.css';

export default function ManageUser() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editDetails, setEditDetails] = useState({ name: '', email: '', role: 'User' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('user_id, full_name, email');
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data.map(user => ({
        id: user.user_id,
        name: user.full_name,
        email: user.email,
        role: 'User' // Assuming default role; adjust if you have roles in the database
      })));
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditDetails({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user => user.id === editUserId ? { ...user, ...editDetails } : user));
    setEditUserId(null);
    setEditDetails({ name: '', email: '', role: 'User' });
  };

  const handleRemoveUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('users').delete().eq('user_id', id);
    if (error) {
      console.error('Error deleting user:', error);
      alert("Failed to delete user.");
    } else {
      setUsers(users.filter(user => user.id !== id)); // Update state to remove user locally
      alert("User successfully deleted.");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Main Content */}
      <div className="main-content">
        <div className="manage-user-container">
          <h1>Manage Users</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* User List */}
          <div className="user-list">
            {filteredUsers.map(user => (
              <div className="user-card" key={user.id}>
                <div className="user-info">
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                  <div className="user-details">
                    {editUserId === user.id ? (
                      <>
                        <input
                          type="text"
                          value={editDetails.name}
                          onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
                        />
                        <input
                          type="text"
                          value={editDetails.email}
                          onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })}
                        />
                      </>
                    ) : (
                      <>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="user-actions">
                  <span className="user-role">{user.role}</span>
                  {editUserId === user.id ? (
                    <button className="edit-button" onClick={handleSaveEdit}>Save</button>
                  ) : (
                    <button className="edit-button" onClick={() => handleEditUser(user)}>Edit</button>
                  )}
                  <button className="remove-button" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
