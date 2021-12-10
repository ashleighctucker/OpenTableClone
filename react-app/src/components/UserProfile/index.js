import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  let sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="profileContainer">
      <div className="profileSidebarContainer">
        <div className="profileAboutContainer">
          <h2 className="profileAbout">About Me</h2>
        </div>
        <p className="profileInfoText" id="name">
          {' '}
          {sessionUser.firstName} {sessionUser.lastName}
        </p>
        <p className="profileInfoText" id="username">
          {' '}
          {sessionUser.username}
        </p>
        <p className="profileInfoText" id="email">
          {' '}
          {sessionUser.email}
        </p>
        <NavLink to="/favorites" className="profileFavorites">
          My Favorites
        </NavLink>
      </div>

      <h2 className="profileReservations">My Reservations</h2>
    </div>
  );
};

export default Profile;
