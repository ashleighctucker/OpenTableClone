import React from 'react';
import { useHistory } from 'react-router-dom';
import './RestaurantCards.css';

const RestaurantCard = ({ restaurant }) => {
  const history = useHistory();
  const redirectOnClick = () => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  return (
    <div className="restaurant-card" onClick={redirectOnClick}>
      <div>{restaurant.name}</div>
      <div>
        <img
          className="restaurant-card-image"
          src={restaurant.cover_photo}
          alt={restaurant.name}
        />
      </div>
      <div>{restaurant.location}</div>
      <div>{restaurant.phone_number}</div>
    </div>
  );
};

export default RestaurantCard;
