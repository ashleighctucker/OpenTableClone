import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditRestaurantForm from './EditRestuarantForm';
import CreateReservations from './CreateReservations';
import ReservationCards from './ReservationCards';
import '../NewRestaurant/restaurant.css';
import './EditRestaurant.css';

const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const reservations = useSelector(
    (state) => state.restaurants[restaurantId]?.reservations
  );
  reservations?.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <>
      <div id="edit-page-container">
        <h1>{restaurant?.name}</h1>
        <div className="main-container">
          <>
            <EditRestaurantForm />
          </>
          <div id="reservation-form-container">
            <CreateReservations />
          </div>
        </div>
        <h2>Current Reservations:</h2>
        <div id="reservation-card-container">
          {reservations?.map((reservation, i) => (
            <ReservationCards reservation={reservation} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EditRestaurant;
