import React from 'react';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites)
  console.log(favorites)
  return (
    <div>
      <h1>My Restaurants</h1>
    </div>
  );
};

export default Favorites;
