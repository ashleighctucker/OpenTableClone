import React, { useState, useEffect } from "react";
import {createCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';

function CustomerReservationForm({
  arrayOfAvailableDates,
  availableReservationsArray,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [partySize, setPartySize] = useState(1);
  const [availableSize, setAvailableSize] = useState('');
  const [notes, setNotes] = useState('Leave a note for your server...');
  const [errors, setErrors] = useState([]);
  const [date, setDate] = useState(arrayOfAvailableDates[0] || null);
  const [time, setTime] = useState('');
  const [reservationId, setReservationId] = useState('');
  const [idxOfReservationSlotInState, setIdxOfReservationSlotInState] =
    useState('');
  const { restaurantId } = useParams();
  const userId = useSelector((state) => state.session?.user?.id);
  let selectedReservation;

<<<<<<< HEAD
  const handleTimeSelect = (e) => {
=======
  const checkStatesArentNull = () => {
    if (!restaurantId || !reservationId || !userId || !partySize || !idxOfReservationSlotInState) {
      return true;
    } else {
      return false;
    }
  }

  const handleTimeSelect = (e) =>{
>>>>>>> WIP
    e.preventDefault();
    setTime(e.target.value);
  };

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
  }, [time]);

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
<<<<<<< HEAD
      )
    );
    history.push(`/restaurants/${restaurantId}`);
  };
=======
      ) 
  )
  await dispatch(authenticate())
  window.location.reload();
  }

>>>>>>> WIP

  // }
  return (
    <div>
      <h1>reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="error-div">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <label>Reservation date</label>
        <select onChange={(e) => setDate(e.target.value)} name="date" id="date">
          {arrayOfAvailableDates.map((dateString, i) => {
            return (
              <option key={i} value={dateString}>
                {dateString}
              </option>
            );
          })}
        </select>
        <br />
<<<<<<< HEAD
        <label>Reservation notes</label>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
        <br />
        {reservationsByDate.map((res) => {
          return (
            <button
              key={res.id}
              onClick={handleTimeSelect}
              value={res.time_slot}
            >
              {res.time_slot}
            </button>
          );
        })}
        <br />
        <input
          type="number"
          min="1"
          max={availableSize}
          name="party_size"
          id="party_size"
          onChange={(e) => setPartySize(e.target.value)}
          value={partySize}
        />
        <button type="submit">Book reservation</button>
      </form>
    </div>
  );
=======
        <label>
          Reservation notes
        </label>
        <textarea onChange={(e)=>setNotes(e.target.value)} value={notes}></textarea>
        <br/>
        {reservationsByDate.map(res => {return <button onClick={handleTimeSelect} value={res.time_slot}>{res.time_slot}</button>})}
        <br/>
        <input type="number" min="1" max={availableSize} name="party_size" id="party_size" onChange={(e)=>setPartySize(e.target.value)} value={partySize}/>
        <button type="submit" disabled={checkStatesArentNull}>Book reservation</button>
        </form>
        </div>
)
>>>>>>> WIP
}

export default CustomerReservationForm;
