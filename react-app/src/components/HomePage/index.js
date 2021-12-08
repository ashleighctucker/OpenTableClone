import React from 'react';
import './HomePage.css';
<<<<<<< HEAD

const HomePage = () => {


=======
import { useDispatch } from 'react-redux';
import { getRestaurants, deleteRestaurant } from '../../store/restaurant';

const HomePage = () => {
  const dispatch = useDispatch();

  const load = async () => {
    await dispatch(getRestaurants());
    await dispatch(deleteRestaurant(3));
  };
  load();
>>>>>>> 37f0d05 (edit/delete thunks tested)
  return (
    <div className="homepage-container">
      <header className="headerContainer">
        <div className="header-description">
          <h1>Find your table for any occasion</h1>
        </div>
      </header>
    </div>
  );
};
export default HomePage;
