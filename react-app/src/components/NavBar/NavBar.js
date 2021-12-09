import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  let sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="NavBarContainer">
      <NavLink to="/home" className="NavHeader">
        <p className="logo2">La Table</p>
      </NavLink>
      <div className="SearchMenu">
        <i className="fa-solid fa-magnifying-glass fa-lg search"></i>
        <ProfileButton user={sessionUser} className="NavProfileDropdown" />
      </div>
    </nav>
  );
};

export default NavBar;
