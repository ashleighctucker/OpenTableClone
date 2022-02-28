import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import SignupModal from '../auth/SignupModal';
import './NavBar.css';
import LoginModal from '../auth/LoginModal';
import { useHistory } from 'react-router';
import {useContext} from 'react';
import {MenuContext} from '../../context/Menu'
function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const {showMenu, setShowMenu} = useContext(MenuContext)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

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
      <span className="NavHome point" id="NavLogout" onClick={logout}>
        <i class="fas fa-sign-out-alt"></i> Log Out
      </span>
    );
  } else {
    sessionLinks = (
      <>
        <LoginModal className="NavLogin" />

        <SignupModal className="NavSignin" />

        <span onClick={loginGuest} className="NavHome point">
          <i class="fas fa-user-secret"></i> Demo User
        </span>
      </>
    );
  }

  return (
    <div className="NavProfileDropdown">
      {!showMenu ? (
        <div>
          <button className="MenuButton" onClick={openMenu}>
            <i className="fa-solid fa-bars fa-2x point"></i>
          </button>
        </div>
      ) : (
        <button className="MenuButton" onClick={closeMenu}>
          <i className="far fa-window-close fa-2x point"></i>
        </button>
      )}

      {showMenu && (
        <div className="profile-dropdown">
          <div className="profileButtons">
            {sessionUser ? (
              <>
                <li className="WelcomeUser">
                  Welcome, {sessionUser.firstName}!
                </li>
                <NavLink
                  to="/profile"
                  exact={true}
                  activeClassName="active"
                  className="NavHome"
                  onClick={closeMenu}
                >
                  <i class="fas fa-user"></i> My Profile
                </NavLink>

                <NavLink
                  to="/favorites"
                  exact={true}
                  activeClassName="active"
                  className="NavHome"
                  onClick={closeMenu}
                >
                  <i class="fas fa-heart"></i> My Favorites
                </NavLink>
              </>
            ) : null}
            <NavLink
              to="/home"
              exact={true}
              activeClassName="active"
              className="NavHome"
              onClick={closeMenu}
            >
              <i class="fas fa-home"></i> Home
            </NavLink>
            {sessionLinks}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
