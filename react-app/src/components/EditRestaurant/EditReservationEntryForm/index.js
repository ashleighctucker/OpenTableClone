import React, { useState } from 'react';
import TIMES from '../../NewRestaurant/times';

function EditReservationEntryForm({ reservation }) {
  const [time_slot, setTimeSlot] = useState(reservation.time_slot);
  const [date, setDate] = useState(reservation.date);
  const [available_size, setAvailableSize] = useState(
    reservation.available_size
  );
  const today = new Date();
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <>
      <form>
        <div>
          <label htmlFor="time-slote">Time Slot:</label>
          <select
            name="time_slot"
            value={time_slot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            {TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            min={dateString}
            max="2022-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="avaiable_size">Available Size (1-10):</label>
          <input
            type="number"
            name="avaiable_size"
            min="1"
            max="10"
            value={available_size}
            onChange={(e) => setAvailableSize(e.target.value)}
          />
        </div>
        <div>
          <button className="edit-page-buttons" type="submit">
            Edit Reservation
          </button>
        </div>
      </form>
    </>
  );
}
export default EditReservationEntryForm;
