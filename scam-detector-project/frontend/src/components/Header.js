import React from 'react';
import { FiShield, FiAlertTriangle } from 'react-icons/fi';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <FiShield className="logo-icon" />
          <h1>AI Scam Detector</h1>
        </div>
        <p className="tagline">Advanced AI-powered scam message detection</p>
      </div>
    </header>
  );
}

export default Header;
