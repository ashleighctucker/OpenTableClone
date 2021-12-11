import React, { useState, useEffect } from 'react';
import { createCustomerReservation } from '../../store/restaurant';
import { authenticate } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import './reservations.css';

function CustomerReservationForm({
  arrayOfAvailableDates,
  availableReservationsArray,
}) {
  const dispatch = useDispatch();
  const [partySize, setPartySize] = useState(1);
  const [availableSize, setAvailableSize] = useState('');
  const [notes, setNotes] = useState('Leave a note for your server...');
  const [errors, setErrors] = useState([]);
  const [date, setDate] = useState('Select a date');
  const [time, setTime] = useState('');
  const [reservationId, setReservationId] = useState('');
  const [idxOfReservationSlotInState, setIdxOfReservationSlotInState] =
    useState('');
  const { restaurantId } = useParams();
  const userId = useSelector((state) => state.session?.user?.id);
  let selectedReservation;

  const checkStatesArentNull = () => {
    if (
      !restaurantId ||
      !reservationId ||
      !userId ||
      !partySize ||
      !idxOfReservationSlotInState
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleTimeSelect = (e) => {
    e.preventDefault();

    for (const button of e.currentTarget.children) {
      if (e.target.textContent === button.textContent) {
        $(button).addClass('selected-btn');
      } else {
        $(button).removeClass('selected-btn');
      }
    }
    setTime(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAvailableSizeForTimeSlot = (
    availableReservationsArray,
    date,
    time
  ) => {
    selectedReservation = availableReservationsArray.filter(
      (reservation) =>
        reservation.date === date && reservation.time_slot === time
    );
    let idxforResSlot = null;
    for (let index = 0; index < availableReservationsArray.length; index++) {
      const reservation = availableReservationsArray[index];
      if (reservation.date === date && reservation.time_slot === time) {
        idxforResSlot = index;
      }
    }
    setAvailableSize(selectedReservation[0]?.available_size);
    setReservationId(selectedReservation[0]?.id);
    setIdxOfReservationSlotInState(idxforResSlot);
    return selectedReservation;
  };

  useEffect(() => {
    getAvailableSizeForTimeSlot(availableReservationsArray, date, time);
  }, [time, date, availableReservationsArray, getAvailableSizeForTimeSlot]);

  let reservationsByDate = availableReservationsArray.filter(
    (reservation) => reservation.date === date
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let booked = true;
    await dispatch(
      createCustomerReservation(
        restaurantId,
        reservationId,
        userId,
        partySize,
        notes,
        booked,
        idxOfReservationSlotInState
      )
    );
    await dispatch(authenticate());
    window.location.reload();
  };

  // }
  return (
    <div className="resContainer">
      <h1 className="resHeader">Book Your Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="error-div">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <label className="resDateLabel">Reservation date:</label>
        <select
          className="resDateSelect"
          onChange={(e) => setDate(e.target.value)}
          name="date"
          id="date"
          value={date}
        >
          <option value="Select a date">Select a date</option>
          {arrayOfAvailableDates.map((dateString, i) => {
            return (
              <option key={i} value={dateString}>
                {dateString.split('00:')[0]}
              </option>
            );
          })}
        </select>
        <br />

        <div className="notesContainer">
          <label className="resNotesHeader">Reservation notes:</label>
          <textarea
            className="resNotes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          ></textarea>
        </div>
        <br />

        <div className="timesLabel">Available Times: </div>
        <div className="resDateButtons" onClick={handleTimeSelect}>
          {reservationsByDate.map((res) => {
            return (
              <button
                className="confirmResButton"
                value={res.time_slot}
                key={res.id}
              >
                {res.time_slot}
              </button>
            );
          })}
        </div>
        <br />

        <div className="partySizeContainer">
          <div className="partySizeLabel">Select Party Size:</div>
          <input
            className="partySizeInput"
            type="number"
            min="1"
            max={availableSize}
            name="party_size"
            id="party_size"
            onChange={(e) => setPartySize(e.target.value)}
            value={partySize}
          />
        </div>
        <br />

        <button
          className="submitButton"
          type="submit"
          disabled={checkStatesArentNull()}
        >
          {userId ? 'Book Reservation' : 'Log in to Book a Reservation'}
        </button>
      </form>
    </div>
  );
}

export default CustomerReservationForm;
