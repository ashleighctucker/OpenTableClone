import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createReservation } from '../../../store/restaurant';
import TIMES from '../../NewRestaurant/times';

const CreateReservations = ({ restaurant }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { restaurantId } = useParams();

  const [time_slot, setTimeSlot] = useState(TIMES[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [available_size, setAvailableSize] = useState(1);

  const loopThroughRange = async (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);

    let loopDate = new Date(start);
    while (loopDate <= end) {
      const dateString =
        loopDate.getFullYear() +
        '-' +
        (loopDate.getMonth() + 1) +
        '-' +
        loopDate.getDate();
      await dispatch(
        createReservation(restaurantId, time_slot, dateString, available_size)
      );

      let nextDate = loopDate.setDate(loopDate.getDate() + 1);
      loopDate = new Date(nextDate);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loopThroughRange(startDate, endDate).then(() =>
      history.push(`/restaurants/${restaurantId}`)
    );
  };

  return (
    <>
      <h2>Create Reservations</h2>
      <h3>for {restaurant.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <label htmlFor="time_slot">Time Slot:</label>
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
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start-date"
            min="2021-12-09"
            max="2022-12-31"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            name="end-date"
            min={startDate}
            max="2022-12-31"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>
        <div className="input-div">
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
        <div className="input-div">
          <button className="edit-page-buttons" type="submit">
            Create Reservation Slots
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateReservations;
