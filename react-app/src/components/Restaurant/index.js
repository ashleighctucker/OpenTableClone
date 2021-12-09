import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomerBookReservationModal from '../CustomerBookReservation';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const [date, setDate]= useState("");

  let allReservations = useSelector((state) =>state.restaurants?.[restaurantId]?.reservations)
  let availableReservationsArray = allReservations.filter(res => res.booked === false).sort(function(a,b){
//                 // Turn your strings into dates, and then subtract them
//                 // to get a value that is either negative, positive, or zero.
                return new Date(a.date) - new Date(b.date);
             })
  console.log(availableReservationsArray)
  let reservationsByDate = availableReservationsArray.filter((reservation) => reservation.date == date) 
  let arrayOfAvailableDates= availableReservationsArray.map((reservation) => reservation.date)

  const rawReviews = useSelector(
    (state) =>
      state.restaurants[restaurantId]?.reviews
  );
  let reviews;
  if (rawReviews) {
    reviews = Object.values(rawReviews);
  }
  console.log(rawReviews);

  return (
    <div className="restaurant-container">
      <h1>Single Restaurant Page</h1>
      <CustomerBookReservationModal arrayOfAvailableDates={arrayOfAvailableDates} availableReservationsArray={availableReservationsArray} />
      <div>
        {reviews?.map((review) => {
          return (
            <div>
              {review.rating}
              {review.comment}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Restaurant;
