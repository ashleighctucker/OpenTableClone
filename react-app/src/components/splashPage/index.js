import React from 'react';
import SearchBar from '../SearchBar';
import './splashPage.css';

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className="description">
        <h1>La Table</h1>
        <h3>/lä ˈtābəl/ </h3>
        <SearchBar />
        <p>Find the most exclusive tables in the LA area!</p>
      </div>
    </div>
  );
};

export default SplashPage;
