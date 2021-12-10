import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditRestaurantForm from './EditRestuarantForm';
import CreateReservations from './CreateReservations';
import ReservationCards from './ReservationCards';
import { deleteRestaurant } from '../../store/restaurant';
import '../NewRestaurant/restaurant.css';
import './EditRestaurant.css';

const EditRestaurant = () => {
  const dispatch = useDispatch();
   const history = useHistory();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const reservations = useSelector(
    (state) => state.restaurants[restaurantId]?.reservations
  );
  reservations?.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  const handleDelete = async () => {
    await dispatch(deleteRestaurant(restaurant.id));
    history.push('/home');
  };

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
        <div className="input-div">
          <button onClick={handleDelete} className="delete-button">
            Delete Restaurant
          </button>
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
