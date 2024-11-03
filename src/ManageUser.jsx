import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faCalendarAlt, faUserCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './ManageUser.css';

export default function ManageUser() {
  const location = useLocation();
  
  // States for managing users and input fields
  const [users, setUsers] = useState([
    { id: 1, name: 'Francis Flancia', email: 'flanciafrancis@gmail.com', role: 'User' },
    // Additional users here
  ]);
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });

  // Function to handle editing a user's role
  const handleEdit = (userId, currentRole) => {
    console.log("Edit button clicked for user:", userId);
    setEditUserId(userId);
    setNewRole(currentRole);
  };

  // Function to save the updated role
  const handleSaveRole = (userId) => {
    console.log("Save button clicked for user:", userId);
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    setEditUserId(null);
  };

  // Function to remove a user
  const handleRemove = (userId) => {
    console.log("Remove button clicked for user:", userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  // Function to add a new user
  const handleAddUser = () => {
    console.log("Add User button clicked:", newUser);
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: 'User' });
    } else {
      console.log("Name and Email are required");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar and other content */}

      {/* Main Content */}
      <div className="main-content">
        <div className="manage-user-container">
          <h1>Manage Users</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search User..."
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <button className="add-user-button" onClick={handleAddUser}>Add User</button>
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
                  {editUserId === user.id ? (
                    <>
                      <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                      />
                      <button className="save-button" onClick={() => handleSaveRole(user.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className="user-role">{user.role}</span>
                      <button className="edit-button" onClick={() => handleEdit(user.id, user.role)}>Edit</button>
                    </>
                  )}
                  <button className="remove-button" onClick={() => handleRemove(user.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
