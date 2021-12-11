import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReservationEntryForm from '../EditReservationEntryForm';

const ReservationCards = ({ reservation }) => {
  const [showModal, setShowModal] = useState(false);

  const resDate = new Date(reservation.date);
  let realresDate = resDate.setDate(resDate.getDate() + 1);
  realresDate = new Date(realresDate);
  const dateString =
    realresDate.getFullYear() +
    '-' +
    (realresDate.getMonth() + 1) +
    '-' +
    realresDate.getDate();

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
