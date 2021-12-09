import React from 'react';

const ReservationCards = ({ reservation }) => {
  console.log(reservation.booked);
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
      <span>
        {reservation.booked ? 'Reservation Booked' : 'Reservation Available'}
      </span>
    </div>
  );
};
export default ReservationCards;
