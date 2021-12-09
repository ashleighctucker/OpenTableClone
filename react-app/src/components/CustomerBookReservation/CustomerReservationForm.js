import React, { useState, useEffect } from "react";
//import {editQuestionById} from "../../store/currentQuestion" //Ask where we will put this thunk
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function CustomerReservationForm({arrayOfAvailableDates, availableReservationsArray}) {
  const dispatch = useDispatch();
  const [partySize, setPartySize] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [date, setDate]= useState("");
  const userId = useSelector((state) => state.session.user);
  console.log(arrayOfAvailableDates, "YOOOOOOOOOOOOOOOOOOOOOOO")
//   const {restaurantId} = useParams();
//   //let allReservations = useSelector((state) =>state.restaurants?.restaurantId?.reservations)
//   let allReservations = useSelector((state) => state.restaurants[restaurantId]).reservations
//   console.log(allReservations, "<--------")
//   console.log(restaurantId, "*********************")
//   let availableReservationsArray = allReservations.filter(res => res.booked === false).sort(function(a,b){
// //                 // Turn your strings into dates, and then subtract them
// //                 // to get a value that is either negative, positive, or zero.
//                 return new Date(a.date) - new Date(b.date);
//              })
//   console.log(availableReservationsArray)
//   let reservationsByDate = availableReservationsArray.filter((reservation) => reservation.date == date) 
//   let arrayOfAvailableDates= availableReservationsArray.map((reservation) => reservation.date)
//   console.log(arrayOfAvailableDates, "HIIII")
console.log(date)



// const getArrayOfAvailableDays = (arrayOfAvailableReservations) =>{
    
//     arrayOfAvailableReservations.forEach(reservation => {
//         arrayOfAvailableDates.push(reservation.date)
//     });
//     return arrayOfAvailableDates
// }
let reservationsByDate = availableReservationsArray.filter((reservation) => reservation.date == date)
return(
<div>
    <h1>reservation</h1>
    <form method="post" action="/">
<select  onChange={(e)=>setDate(e.target.value)} name="date" id="date">
    {arrayOfAvailableDates.map(dateString => {return <option value={dateString} >{dateString}</option>})}
</select>
</form>
{reservationsByDate.map(res => {return <button>{res.time_slot}</button>})}
</div>)
}

export default CustomerReservationForm;
