import React, { useState } from 'react';
import './SignupStyles.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaApple, FaGoogle } from 'react-icons/fa';
import { supabase } from './supabaseClient';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Sign-up successful! Please check your email to confirm.");
    }
  };

  return (
    <div className="container">
      <div className="signupTitleContainer">
        <h2 className="title">SIGN UP</h2>
      </div>

      <div className="signupContainer">
        <div className="inputContainer">
          <label className="label">NAME</label>
          <input
            className="input lineInput"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">EMAIL</label>
          <input
            className="input lineInput"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">PASSWORD</label>
          <input
            className="input lineInput"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="label">CONFIRM PASSWORD</label>
          <input
            className="input lineInput"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="registerButton" onClick={handleSignUp}>Register</button>
        {message && <p className="message">{message}</p>}
      </div>

      <p className="orText">Or</p>
      <div className="socialIcons">
        <FaFacebook size={30} color="#4267B2" className="icon" />
        <FaApple size={30} color="#000" className="icon" />
        <FaGoogle size={30} color="#DB4437" className="icon" />
      </div>

      <div className="alreadyContainer">
        <p className="alreadyText">Already have an account?</p>
        <button className="loginButton" onClick={() => navigate('/login')}>LOGIN</button>
      </div>
    </div>
  );
};

export default Signup;
