import React, { useState } from 'react';
import './SignupStyles.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaApple, FaGoogle } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="signupContainer">
        <h2 className="title">SIGN UP</h2>
        
        <div className="inputContainer">
          <label className="label">NAME</label>
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">EMAIL</label>
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">PASSWORD</label>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">CONFIRM PASSWORD</label>
          <input
            className="input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="registerButton">Register</button>
      </div>

      <p className="orText">Or</p>
      <div className="socialIcons">
        <FaFacebook size={30} color="#4267B2" className="icon" />
        <FaApple size={30} color="#000" className="icon" />
        <FaGoogle size={30} color="#DB4437" className="icon" />
      </div>
      <p className="alreadyText">Already have an Account?</p>
      <button className="loginButton" onClick={() => navigate('/login')}>LOGIN</button>
    </div>
  );
};

export default Signup;
