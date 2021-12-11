import React, { useState } from 'react';
import {
  editCustomerReservation,
  cancelCustomerReservation,
} from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';

function CustomerEditReservationForm({
  reservation,
  restaurantId,
  dateString,
}) {
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
    window.location.reload();
  };

  const handleDelete = async () => {
    await dispatch(cancelCustomerReservation(reservation.id, restaurantId));
    window.location.reload();
  };

  return (
    <div className="main-container">
      <h2>Edit Reservation at {reservation.restaurant_name}</h2>
      <h3>
        {dateString} at {reservation.time_slot}
      </h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="error-div">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <div className="input-div">
          <label>Reservation notes</label>
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          ></textarea>
        </div>
        <div className="input-div">
          <label>Party size</label>
          <input
            type="number"
            min="1"
            max={reservation.available_size}
            name="party_size"
            id="party_size"
            onChange={(e) => setPartySize(e.target.value)}
            value={partySize}
          />
        </div>
        <div className="input-div">
          <button className="edit-page-buttons" type="submit">
            Edit Booking
          </button>
        </div>
      </form>
      <div className="input-div">
        <button onClick={handleDelete} className="edit-page-buttons">
          Delete Booking
        </button>
      </div>
    </div>
  );
}

export default CustomerEditReservationForm;
