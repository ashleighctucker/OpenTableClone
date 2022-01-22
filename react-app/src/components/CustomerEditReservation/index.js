import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import CustomerEditReservationForm from './CustomerEditReservationForm';

function CustomerEditReservationCards({ reservation }) {
  let restaurants = useSelector((state) => state.restaurants);
  const [showModal, setShowModal] = useState(false);
  console.log(restaurants, reservation);

  let resDate = new Date(reservation.date);
  let realresDate = resDate.setDate(resDate.getDate() + 1);
  realresDate = new Date(realresDate);
  const dateString =
    realresDate.getFullYear() +
    '-' +
    (realresDate.getMonth() + 1) +
    '-' +
    realresDate.getDate();

  return (
    <div className="reservation-div">
      <div
        style={{
          backgroundImage: `url(${
            restaurants[reservation.restaurant_id]['cover_photo']
          })`,
        }}
        className="res-photo"
      ></div>
      <div className="res-info">
        <h4>{reservation.restaurant_name}</h4>
        <span>
          {dateString} at {reservation.time_slot}
        </span>
        <span>
          Table for {reservation.party_size}{' '}
          {reservation.party_size === 1 ? 'person' : 'people'}.
        </span>
      </div>
      <span className="edit point" onClick={() => setShowModal(true)}>
        <i className="far fa-edit"></i> Edit Booking
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerEditReservationForm
            reservation={reservation}
            restaurantId={reservation.restaurant_id}
            dateString={dateString}
          />
        </Modal>
      )}
    </div>
  );
}

export default CustomerEditReservationCards;
