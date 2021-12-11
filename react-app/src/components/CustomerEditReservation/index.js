import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerEditReservationForm from './CustomerEditReservationForm';

function CustomerEditReservationCards({ reservation, restaurant }) {
  const [showModal, setShowModal] = useState(false);

  const resDate = new Date(reservation.date);
  const dateString =
    resDate.getFullYear() +
    '-' +
    (resDate.getMonth() + 1) +
    '-' +
    resDate.getDate();

  return (
    <div className="reservation-div">
      <span>
        {restaurant.name} ({reservation.party_size})
      </span>
      <span>Time: {reservation.time_slot}</span>
      <span>Date: {dateString}</span>
      <span onClick={() => setShowModal(true)}>
        <i className="far fa-edit"></i> Edit Booking
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerEditReservationForm
            reservation={reservation}
            close={() => setShowModal(false)}
            restaurantId={restaurant.id}
          />
        </Modal>
      )}
    </div>
  );
}

export default CustomerEditReservationCards;
