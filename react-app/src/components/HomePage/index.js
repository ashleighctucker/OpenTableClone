import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantCard from '../RestaurantCards';
import './HomePage.css';

const HomePage = () => {
  const restaurants = useSelector((state) => state.restaurants);

  const createCards = (restaurants) => {
    const cards = [];
    for (let restaurant in restaurants) {
      let card = (
        <RestaurantCard key={restaurant} restaurant={restaurants[restaurant]} />
      );
      cards.push(card);
    }
    return cards;
  };

  return (
    <div className="homepage-container">
      <header className="headerContainer">
        <div className="header-description">
          <h1>Find your table for any occasion</h1>
        </div>
      </header>
      <div className="info-container">
        <h2 className="title">Book your restaurant today</h2>
        <hr></hr>
        <div className="card-container">
          {restaurants ? createCards(restaurants) : null}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
