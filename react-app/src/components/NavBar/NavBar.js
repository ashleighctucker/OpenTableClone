import React from 'react';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='NavBarContainer'>
      <h1 className='NavHeader'>La Table</h1>
      {/* <h3 className='NavSearch'>Search Bar Here</h3> */}
      <div className='SearchMenu'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default NavBar;
