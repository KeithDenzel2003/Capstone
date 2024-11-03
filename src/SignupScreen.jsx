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
  const [retryCount, setRetryCount] = useState(0); // Keep track of retry attempts
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.includes("rate limit exceeded")) {
        setMessage("Too many requests. Please wait a few minutes before trying again.");
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          setTimeout(() => handleSignUp(), 3000); // Retry after 3 seconds
        }
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage("Sign-up successful! Please check your email to confirm.");
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Optional delay to show the message before redirect
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
        <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} color="#4267B2" className="icon" />
        </a>
        <a href="https://appleid.apple.com/" target="_blank" rel="noopener noreferrer">
          <FaApple size={30} color="#000" className="icon" />
        </a>
        <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
          <FaGoogle size={30} color="#DB4437" className="icon" />
        </a>
      </div>

      <div className="alreadyContainer">
        <p className="alreadyText">Already have an account?</p>
        <button className="loginButton" onClick={() => navigate('/login')}>LOGIN</button>
      </div>
    </div>
  );
};

export default Signup;
