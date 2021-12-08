import React, { useState, useEffect } from "react";
//import {editQuestionById} from "../../store/currentQuestion" //Ask where we will put this thunk
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function CustomerReservationForm() {
  const dispatch = useDispatch();
  const [partySize, setPartySize] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const userId = useSelector((state) => state.session.user);
  const {restaurantId} = useParams();
  let allReservations = useSelector((state) =>state.restaurants?.restaurantId?.reservations)
  console.log(allReservations, "<--------")
  let availableReservationsObj;
  let arrayOfAvailableDates= []

const getAvailableReservations = (availableReservationsObj)=>{
    const arrayOfAvailableReservations = []
    for (const [idx ,reservationObj] of Object.entries(availableReservationsObj)){
        if (reservationObj.booked == "False") {
            arrayOfAvailableReservations.push({idx : reservationObj})}

    }

    // sort array of available reservation by date
    arrayOfAvailableReservations.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
})
    return arrayOfAvailableReservations
}



const getArrayOfAvailableDays = (arrayOfAvailableReservations) =>{
    
    arrayOfAvailableReservations.forEach(reservation => {
        arrayOfAvailableDates.push(reservation.date)
    });
    return arrayOfAvailableDates
} 



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     const newCustomerReservation = dispatch(createCustomerReservation({ userId, notes, partySize })).catch(
//       async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       }
//     );
//     if (newCustomerReservation) {
//       window.location.reload();
//     }
//   };

//   useEffect(() => {
//     setQuestionTitle(currentQuestion.question.questionTitle)

//   setQuestionText(currentQuestion.question.questionText)
//   }, [currentQuestion.question]);

//   if(!currentQuestion.question){
//         return null
//   }
  
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <ul>
//         {errors.map((error, idx) => (
//           <li key={idx}>{error}</li>
//         ))}
//       </ul>
//       <label className="edit-question-modal-label">
//           Reservation Date
//       </label>
//       <select 
//         onChange={(e) => setDate(e.target.value)}
//         value=date
//       >
//           {arrayOfAvailableDates.map((date) => ())}
//       </select>
//       <label className="edit-question-modal-label">
//         Question Title
//         </label>
//         <textarea
//         cols="30"
//         rows="5"
//           className="edit-question-modal-input"
//           type="text"
//           value={questionTitle}
//           onChange={(e) => setQuestionTitle(e.target.value)}
//           required
//         />
//       <label className="edit-question-modal-label">
//         Question Description
//         </label>
//         <textarea
//         rows="5"
//         cols="30"
//           type="text"
//           className="edit-question-modal-input"
//           value={questionText}
//           onChange={(e) => setQuestionText(e.target.value)}
//           required
//         />
//         <br />
//       <button id="update-question" type="submit">Update my question</button>
//     </form>
//   );
}

export default CustomerReservationForm;
