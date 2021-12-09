import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import L from '../../resources/L.png';
import './NavBar.css';

const NavBar = () => {
  let sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="NavBarContainer">
      {/* <h1 className="NavHeader">la table</h1> */}
      <NavLink to="/home" className="NavHeader">
        {/* <img src={L} className="logo"></img> */}
        <p className="logo2">La Table</p>
      </NavLink>
      {/* <h3 className='NavSearch'>Search Bar Here</h3> */}
      <div className="SearchMenu">
        <i className="fa-solid fa-magnifying-glass fa-lg search"></i>
        <ProfileButton user={sessionUser} className="NavProfileDropdown" />
      </div>
    </nav>
  );
};

export default NavBar;
