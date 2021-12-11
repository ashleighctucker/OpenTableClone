import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import EditRestaurantForm from './EditRestuarantForm';
import CreateReservations from './CreateReservations';
import ReservationCards from './ReservationCards';
import DeleteRestaurantConfirm from './DeleteRestaurantConfirm';
import '../NewRestaurant/restaurant.css';
import './EditRestaurant.css';

import { Modal } from '../../context/Modal';

const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const reservations = useSelector(
    (state) => state.restaurants[restaurantId]?.reservations
  );
  reservations?.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div id="edit-page-container">
        <div className="main-container">
          <h1>{restaurant?.name} Admin Page</h1>
          <h3>Welcome back, {restaurant?.ownerName}!</h3>
          <NavLink to={`/restaurants/${restaurant?.id}`}>
            <button className="edit-page-buttons">
              Return to {restaurant?.name} Main Page
            </button>
          </NavLink>
          <button
            className="edit-page-buttons"
            onClick={() => setShowEditModal(true)}
          >
            Edit Restuarant Information
          </button>
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <EditRestaurantForm close={() => setShowEditModal(false)} />
            </Modal>
          )}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="edit-page-buttons"
          >
            Delete Restaurant
          </button>
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <DeleteRestaurantConfirm
                close={() => setShowDeleteModal(false)}
                restaurant={restaurant}
              />
            </Modal>
          )}
          <div id="reservation-form-container">
            <CreateReservations restaurant={restaurant} />
          </div>
        </div>
        <h2>Current Reservations: ({reservations?.length})</h2>
        {reservations?.length === 0
          ? 'Add reservations to your restaurant!'
          : null}
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
