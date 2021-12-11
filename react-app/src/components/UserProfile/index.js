import React from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import CustomerEditReservationCards from '../CustomerEditReservation';
import { NavLink } from 'react-router-dom';

import { NavLink } from 'react-router-dom';


const Profile = () => {
  let sessionUser = useSelector((state) => state.session.user);
  let restaurants = useSelector((state) => state.restaurants);
  let myReservations = useSelector((state) => state.my_reservations);
  myReservations?.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let myRestaurants = {};
  for (let id in restaurants) {
    if (restaurants[id].ownerId === sessionUser.id) {
      myRestaurants[id] = restaurants[id];
    }
  }

  const myLinks = () => {
    const links = [];
    for (let id in myRestaurants) {
      links.push(
        <NavLink
          className="single-link"
          key={id}
          to={`/restaurants/${id}/edit`}
        >
          {myRestaurants[id].name}
        </NavLink>
      );
    }
    return links;
  };


  return (
    <div className="profileContainer">
      <div id="side-contain">
        <div className="profileSidebarContainer">
          <div className="profileAboutContainer">
            <h2 className="profileAbout">About Me</h2>
          </div>
          <p className="profileInfoText" id="name">
            {sessionUser.firstName} {sessionUser.lastName}
          </p>
          <p className="profileInfoText" id="username">
            {sessionUser.username}
          </p>
          <p className="profileInfoText" id="email">
            {sessionUser.email}
          </p>
          <NavLink to="/favorites" className="profileFavorites">
            My Favorites
          </NavLink>
        </div>
        <NavLink to="/new-restaurant">
          <button>
            <i className="fas fa-plus"></i> Add New Restaurant
          </button>
        </NavLink>
        <h3>My Restaurants:</h3>
        <div className="links">{myRestaurants ? myLinks() : null}</div>
      </div>
      <div>
        <h2 className="profileReservations">
          My Reservations: ({myReservations.length})
        </h2>
        {myReservations.length === 0 ? 'Book a reservation today!' : null}
        <div id="reservation-card-container">
          {myReservations?.map((reservation) => (
            <CustomerEditReservationCards
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
