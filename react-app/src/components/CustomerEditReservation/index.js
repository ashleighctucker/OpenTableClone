import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerEditReservationForm from './CustomerEditReservationForm';

function CustomerEditReservationCards({ reservation }) {
  const [showModal, setShowModal] = useState(false);

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
      <span>
        {reservation.restaurant_name} ({reservation.party_size})
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
            restaurantId={reservation.restaurant_id}
            dateString={dateString}
          />
        </Modal>
      )}
    </div>
  );
}

export default CustomerEditReservationCards;
