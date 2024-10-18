// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Dashboard from './Dashboard';
import ProfileScreen from './ProfileScreen';
import Alert from './Alert';
import ManageUser from './ManageUser';
import ViewAppointment from './ViewAppointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/send-alert" element={<Alert />} />
        <Route path="/manage-user" element={<ManageUser/>} />
        <Route path="/view-appointment" element={<ViewAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
