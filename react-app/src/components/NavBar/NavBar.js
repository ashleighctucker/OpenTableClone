import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  let sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="NavBarContainer">
      {/* <h1 className="NavHeader">la table</h1> */}
      <NavLink to='/home' className="NavHeader">la table</NavLink>
      {/* <h3 className='NavSearch'>Search Bar Here</h3> */}
      <div className="SearchMenu">
        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        <ProfileButton user={sessionUser} className="NavProfileDropdown" />
      </div>
    </nav>
  );
};

export default NavBar;
