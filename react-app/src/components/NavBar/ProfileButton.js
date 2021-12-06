import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import './NavBar.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  const loginGuest = (e) => {
    e.preventDefault()
    return dispatch(login('demo@aa.io', 'password'))
  }

  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <div className='NavButtons'>
        <NavLink to='/' exact={true} activeClassName='active' className='NavHome'>
          Home
        </NavLink>
        <button className='NavLogout' onClick={logout}>Log Out</button>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='NavButtons'>
        <NavLink to='/' exact={true} activeClassName='active' className='NavHome'>
          Home
        </NavLink>
        <NavLink to='/login' exact={true} activeClassName='active' className='NavLogin'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active' className='NavSignin'>
          Sign Up
        </NavLink>
        <button type='button' onClick={loginGuest} className='NavGuest'>
          Guest User
        </button>
      </div>
    )
  }

  return (
    <div className='NavProfileDropdown'>
      <button className='MenuButton' onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          {sessionUser? (
            <div>
              <li className='WelcomeUser'>Welcome, {sessionUser.firstName}!</li>
              <p className='NavProfile'>My profile</p>
              <p className='NavFavorites'>My Favorites</p>
            </div>
          ): null }
          {sessionLinks}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
