import React from 'react';

const ReservationCards = ({ reservation }) => {
  const resDate = new Date(reservation.date);
  const dateString =
    resDate.getFullYear() +
    '-' +
    (resDate.getMonth() + 1) +
    '-' +
    resDate.getDate();

  return (
    <div
      className={`reservation-div ${
        reservation.booked ? 'booked-res' : 'available-res'
      }`}
    >
      <span>Time: {reservation.time_slot}</span>
      <span>Date: {dateString}</span>
      <span>Table Size: {reservation.available_size}</span>
      <span>{reservation.booked ? 'Booked' : 'Available'}</span>
    </div>
  );
};
export default ReservationCards;
