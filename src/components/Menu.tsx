import React from 'react';
import { Link } from 'react-router-dom';
import HouseIcon from '../images/house.png';
import SettingsIcon from '../images/settings.png';
import UserIcon from '../images/user.png';

const Menu=()=> {
  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link`}>
        <img src={HouseIcon} alt="Home" className="nav-icon" />
        <span className="nav-text">Home</span>
      </Link>
      <Link to="/settings" className={`nav-link`}>
        <img src={SettingsIcon} alt="Settings" className="nav-icon" />
        <span className="nav-text">Settings</span>
      </Link>
      <Link to="/" className={`nav-link`}>
        <img src={UserIcon} alt="User" className="nav-icon" />
        <span className="nav-text">User</span>
      </Link>
    </nav>
  );
};

export default Menu;
