import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateReservation,
  deleteReservationEntry,
} from '../../../store/restaurant';
import TIMES from '../../NewRestaurant/times';

function EditReservationEntryForm({ reservation, close }) {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();

  const resDate = new Date(reservation.date);
  let realresDate = resDate.setDate(resDate.getDate() + 1);
  realresDate = new Date(realresDate);
  const resDateString =
    realresDate.getFullYear() +
    '-' +
    (realresDate.getMonth() + 1) +
    '-' +
    realresDate.getDate();

  const [time_slot, setTimeSlot] = useState(reservation.time_slot);
  const [date, setDate] = useState('');
  const [available_size, setAvailableSize] = useState(
    reservation.available_size
  );
  const today = new Date();
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateReservation(reservation.id, time_slot, date, available_size)
    );
    window.location.reload();
  };

  const handleDelete = async () => {
    await dispatch(deleteReservationEntry(reservation.id, restaurantId));
    close();
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>
          Edit Reservation for {reservation.available_size} on {resDateString}{' '}
          at {reservation.time_slot}
        </h3>
        <div className="input-div">
          <label htmlFor="time-slote">
            Time Slot: (currently {reservation.time_slot})
          </label>
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
        <div className="input-div">
          <label htmlFor="date">
            Reservation Date: (currently {resDateString})
          </label>
          <input
            type="date"
            name="date"
            min={dateString}
            max="2022-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="avaiable_size">
            Available Size (1-10): (currently {reservation.available_size})
          </label>
          <input
            type="number"
            name="avaiable_size"
            min="1"
            max="10"
            value={available_size}
            onChange={(e) => setAvailableSize(e.target.value)}
          />
        </div>
        <div className="input-div">
          <button className="edit-page-buttons" type="submit">
            Edit Reservation
          </button>
        </div>
      </form>
      <div className="input-div">
        <button className="edit-page-buttons" onClick={handleDelete}>
          Delete Reservation
        </button>
        <span className="booked">
          {reservation.booked ? 'CAUTION: Booked' : null}
        </span>
        <span>
          {reservation.booked
            ? `Email ${reservation.email} to notify if cancelling reservation`
            : null}
        </span>
      </div>
    </div>
  );
}
export default EditReservationEntryForm;
