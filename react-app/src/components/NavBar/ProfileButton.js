import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import SignupModal from '../auth/SignupModal';
import './NavBar.css';
import LoginModal from '../auth/LoginModal';
import { useHistory } from 'react-router';

function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    return history.push('/');
  };
  const loginGuest = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
    setShowMenu(false)
    return history.push('/home');
  };

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='NavButtons'>
        <NavLink to='/home' exact={true} activeClassName='active' className='NavHome' onClick={closeMenu} >
          Home
        </NavLink>
        <button className="NavLogout" onClick={logout}>
          Log Out
        </button>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='NavButtons'>
        <NavLink to='/home' exact={true} activeClassName='active' className='NavHome' onClick={closeMenu}>
          Home
        </NavLink>

        <LoginModal className='NavLogin'/>

        <SignupModal className='NavSignin'/>

        <button type="button" onClick={loginGuest} className="NavGuest">
          Guest User
        </button>
      </div>
    );
  }

  // console.log(sessionLinks)

  return (
    <div className="NavProfileDropdown">
      {!showMenu ? (
        <div>
          <button className="MenuButton" onClick={openMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      ) : (
        <button className="MenuButton" onClick={closeMenu}>
          X
        </button>
      )}

      {showMenu && (
        <div className="profile-dropdown">
          {sessionUser ? (
            <div className='profileButtons'>
              <li className='WelcomeUser'>Welcome, {sessionUser.firstName}!</li>
              <NavLink to='/profile' exact={true} activeClassName='active' className='NavHome' onClick={closeMenu}>
                My Profile
              </NavLink>

              <NavLink to='/favorites' exact={true} activeClassName='active' className='NavHome' onClick={closeMenu}>
                My Favorites
              </NavLink>
            </div>
          ) : null}
          {sessionLinks}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
