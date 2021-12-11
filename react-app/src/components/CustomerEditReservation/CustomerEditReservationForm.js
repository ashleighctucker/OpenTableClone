<<<<<<< HEAD
import React, { useState } from "react";
import {editCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import { useDispatch, useSelector } from "react-redux";
=======
import React, { useState } from 'react';
import { editCustomerReservation } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> 0692c03 (refactorAZZ)

function CustomerEditReservationForm({ reservation, restaurantId, close }) {
  const dispatch = useDispatch();
  const [partySize, setPartySize] = useState(reservation.party_size);
  const [notes, setNotes] = useState(reservation.notes);
  const [errors, setErrors] = useState([]);
  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(
      editCustomerReservation(
        restaurantId,
        reservation.id,
        userId,
        partySize,
        notes
      )
    );
    close();
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="error-div">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <br />
        <label>Reservation notes</label>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
        <br />
        <label>Party size</label>
        <br />
        <input
          type="number"
          min="1"
          max={reservation.availabe_size}
          name="party_size"
          id="party_size"
          onChange={(e) => setPartySize(e.target.value)}
          value={partySize}
        />
        <br />
        <button type="submit">Edit reservation</button>
      </form>
    </div>
  );
}

export default CustomerEditReservationForm;
