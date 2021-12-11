import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReservationEntryForm from '../EditReservationEntryForm';

const ReservationCards = ({ reservation }) => {
  const [showModal, setShowModal] = useState(false);

  const resDate = new Date(reservation.date);
  const dateString =
    resDate.getFullYear() +
    '-' +
    (resDate.getMonth() + 1) +
    '-' +
    (resDate.getDate() + 1);

  return (
    <div
      className={`reservation-div ${
        reservation.booked ? 'booked-res' : 'available-res'
      }`}
    >
      <span>Time: {reservation.time_slot}</span>
      <span>Date: {dateString}</span>
      <span>Table Size: {reservation.available_size}</span>
      <span>
        {reservation.booked ? 'Booked: ' : 'Available'}
        {reservation.booked
          ? `${reservation.name} (${reservation.party_size})`
          : null}
      </span>
      <span onClick={() => setShowModal(true)}>
        <i className="far fa-edit"></i> Edit Booking
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReservationEntryForm
            reservation={reservation}
            close={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};
export default ReservationCards;
