import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginScreen.css';
import logo from '/images/logo.png';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = () => {
    console.log('Login button pressed');
    console.log('Name:', name, 'Password:', password, 'Remember Me:', rememberMe);
    navigate('/dashboard'); // Redirect to Dashboard
  };

  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="login-header">LOG IN</h1>

      <div className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-row">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="checkbox-label">Remember me</label>
          </div>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>
      </div>

      <p className="or">Or</p>

      <div className="social-login-row">
        <img src="./images/Facebook.png" alt="Facebook" />
        <img src="./images/apple.png" alt="Apple" />
        <img src="./images/Google.png" alt="Google" />
      </div>

      <div className="signup-container">
        <span className="signup-prompt">Don't have an account?</span>
        <Link to="/signup" className="signup-text">SIGN UP</Link>
      </div>
    </div>
  );
}
