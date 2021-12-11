import React, { useState } from "react";
import {editCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import { useDispatch, useSelector } from "react-redux";

function CustomerEditReservationForm({
  reservationToEditOrDelete, reservationRestaurantId, reservationPartySize, reservationNotes, reservationAvailableSize}) {
  const dispatch = useDispatch();
  const [partySize, setPartySize] = useState(reservationPartySize);
  const [availableSize, setAvailableSize] = useState(reservationAvailableSize);
  const [notes, setNotes] = useState(reservationNotes);
  const [errors, setErrors] = useState([]);
  const [restaurantId, setRestaurantId] = useState(reservationRestaurantId)
  const [reservationId, setReservationId] = useState(reservationToEditOrDelete);
  const userId = useSelector((state) => state.session?.user?.id);
   

  const checkStatesArentNull = () => {
    if (!restaurantId || !reservationId || !userId || !partySize) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(
      editCustomerReservation(
        restaurantId,
        reservationId,
        userId,
        partySize,
        notes,
      ) 
  )
  await dispatch(authenticate())
  window.location.reload();
  }

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
        <label>
          Reservation notes
        </label>
        <textarea onChange={(e)=>setNotes(e.target.value)} value={notes}></textarea>
        <br/>
        <label>Party size</label>
        <br/>
        <input type="number" min="1" max={availableSize} name="party_size" id="party_size" onChange={(e)=>setPartySize(e.target.value)} value={partySize}/>
        <br/>
        <button type="submit" disabled={checkStatesArentNull}>Book reservation</button>
        </form>
        </div>
)
}

export default CustomerEditReservationForm;
