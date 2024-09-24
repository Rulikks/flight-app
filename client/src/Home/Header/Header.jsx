import React from 'react';
import { FaTags, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <img src="/airplane-header.svg" alt="Plane Scape Logo" />
        <h1>PLANE SCAPE</h1>
      </div>
      
      <div className="right-section">
        <nav className="nav-menu">
          <a href="#deals">
            <FaTags className="icon" /> Deals
          </a>
          <a href="#discover">
            <FaGlobe className="icon" /> Discover
          </a>
          <Link to="/my-flights">
            <div className="nav-item">
              <img src="/airplane.svg" alt="My Flights" className="my-flights-icon" />
              My Flights
            </div>
          </Link>
        </nav>
        <div className="user-profile">
          <span>Joane Smith</span>
          <img src="/profile-image.jpg" alt="Profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
