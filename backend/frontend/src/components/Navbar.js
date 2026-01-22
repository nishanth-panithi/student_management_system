import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthTokens, clearUserInfo } from '../services/auth';
import './Navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens and user info
    clearAuthTokens();
    clearUserInfo();
    // Redirect to login
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Student Management System</h2>
        </div>
        <div className="navbar-menu">
          <span className="navbar-user">Welcome, {username}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

