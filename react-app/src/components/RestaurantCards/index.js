import React from 'react';
import { NavLink } from 'react-router-dom';
import './RestaurantCards.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <NavLink to={`/restaurants/${restaurant?.id}`} className="wrapper-link">
      <div className="restaurant-card">
        <div
          style={{ backgroundImage: `url(${restaurant.cover_photo})` }}
          className="restaurant-card-image"
        ></div>
        <p className="restaurant-name">{restaurant.name}</p>
        <div className="restaurant-description">{restaurant.location}</div>
        <div className="restaurant-description">{restaurant.phone_number}</div>
      </div>
    </NavLink>
  );
};

export default RestaurantCard;
