import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="container">
      <img src="./images/logo.png" alt=""/>

      <h1 className="title">
        Welcome to <span className="brand">Church Konek'</span>
      </h1>
      
      <p className="subtitle">
        Your one-stop app for managing your<br />
        church appointments and deepening your faith.
      </p>

      <button className="get-started-button" onClick={handleGetStarted}>
        GET STARTED
      </button>
    </div>
  );
}
