import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './ManageUser.css';

export default function ManageUser() {
  const location = useLocation();
  const [users, setUsers] = useState([
    { id: 1, name: 'Francis Flancia', email: 'flanciafrancis@gmail.com', role: 'User' },
    // Add more user objects here if needed
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editUserId, setEditUserId] = useState(null);
  const [editDetails, setEditDetails] = useState({ name: '', email: '', role: 'User' });
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Handler for adding a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {  // Check for non-empty fields
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id, ...newUser }]);
      setNewUser({ name: '', email: '', role: 'User' });
    }
  };

  // Handler for initiating the edit mode
  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditDetails({ name: user.name, email: user.email, role: user.role });
  };

  // Handler for saving the edited user details
  const handleSaveEdit = () => {
    setUsers(users.map(user => user.id === editUserId ? { ...user, ...editDetails } : user));
    setEditUserId(null);
    setEditDetails({ name: '', email: '', role: 'User' });
  };

  // Handler for removing a user
  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Filter users based on the search term
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

          {/* Search Bar Above Add User */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>

          {/* Add User Section */}
          <div className="add-user-section">
            <input
              type="text"
              placeholder="User name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="User email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button className="add-user-button" onClick={handleAddUser}>Add User</button>
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
