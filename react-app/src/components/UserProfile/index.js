import React from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import CustomerEditReservationCards from '../CustomerEditReservation';
import { NavLink } from 'react-router-dom';
import '../EditRestaurant/EditRestaurant.css';

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
            <h2>My Profile</h2>
          </div>
          <p className="profileInfoText">
            Name: <span className="my-info">{sessionUser.firstName} {sessionUser.lastName}</span>
          </p>
          <p className="profileInfoText" >
            Username: <span className="my-info">{sessionUser.username}</span>
          </p>
          <p className="profileInfoText">
            Email: <span className="my-info">{sessionUser.email}</span>
          </p>
          <NavLink to="/favorites" className="profileFavorites my-info">
            My Favorites
          </NavLink>
        </div>
        <NavLink className="addbutton" to="/new-restaurant">
            <i className="fas fa-plus"></i> Add New Restaurant
        </NavLink>
        <h3>My Restaurants:</h3>
        <div className="links">{myRestaurants ? myLinks() : null}</div>
      </div>
      <div className="reservation-container">
        <h2 className="profileReservations">
          My Reservations: ({myReservations.length})
        </h2>
        {myReservations.length === 0 ? 'Book a reservation today!' : null}

          {myReservations?.map((reservation) => (
            <CustomerEditReservationCards
              key={reservation.id}
              reservation={reservation}
            />
          ))}

      </div>
    </div>
  );
};

export default Profile;
