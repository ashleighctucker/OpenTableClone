import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantCard from '../RestaurantCards';
import './Search.css';

const SearchResults = () => {
  const results = useSelector((state) => state.search_results);

  return (
    <div className="search-result-container">
      <h1>Search Results:</h1>
      {results.length === 0
        ? `Sorry! No restaurants matched your search.`
        : null}
      <div className="card-container">
        {results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
