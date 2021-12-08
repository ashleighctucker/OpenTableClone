import React from 'react';
import './splashPage.css';
import { useHistory } from 'react-router-dom';

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className="description">
        <h1>La table</h1>
        <h3>/lä ˈtābəl/ </h3>
        <div className="search">
          <input
            type="text"
            id="splash-search"
            placeholder="Find my next experience"
          ></input>
          <div className="icon-div">
            <i className="fas fa-search"></i>
          </div>
        </div>
        <p>Find the most exclusive tables in the LA area!</p>
      </div>
    </div>
  );
};

export default SplashPage;
