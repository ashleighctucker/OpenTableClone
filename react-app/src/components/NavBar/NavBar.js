import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  console.log(sessionUser)

  return (
    <nav className='NavBarContainer'>
      <h1 className='NavHeader'>La Table</h1>
      {/* <h3 className='NavSearch'>Search Bar Here</h3> */}
      <div className='SearchMenu'>
        <i class="fa-solid fa-magnifying-glass"></i>
        <ProfileButton user={sessionUser}/>
      </div>
    </nav>
  );
}

export default NavBar;
