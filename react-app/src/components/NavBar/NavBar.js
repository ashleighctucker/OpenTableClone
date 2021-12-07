import React from 'react';
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  let sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='NavBarContainer'>
      <h1 className='NavHeader'>La Table</h1>
      {/* <h3 className='NavSearch'>Search Bar Here</h3> */}
      <div className='SearchMenu'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <ProfileButton user={sessionUser} className='NavProfileDropdown'/>
      </div>
    </nav>
  );
}

export default NavBar;
