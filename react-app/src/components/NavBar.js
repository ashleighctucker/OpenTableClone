import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch } from 'react-redux'
import { login } from '../store/session';
import ProfileButton from './ProfileButton';

const NavBar = () => {
  const sessionUser = useState(state => state.session.user)
  const dispatch = useDispatch();

  const loginGuest = (e) => {
    e.preventDefault()
    return dispatch(login('demo@aa.io', 'password'))
  }

  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton  user={sessionUser}/>
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
        <button type='button' onClick={loginGuest}>Login as Guest</button>
      </div>
    )
  }
  return (
    <nav>
      <h1>L.A. Mesa</h1>
      <h3>Search Bar Here</h3>
      <NavLink to='/' exact={true} activeClassName='active'>Home</NavLink>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
