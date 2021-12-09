
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { deleteReview } from '../../store/restaurant';
import EditReviewModal from '../EditReview/EditReviewModal';
import CustomerBookReservationModal from '../CustomerBookReservation';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const [date, setDate]= useState("");
  const restaurant = useSelector((state) => state.restaurants[+restaurantId]);
  const dispatch = useDispatch();
  let allReservations = useSelector((state) =>state.restaurants?.[restaurantId]?.reservations)
  let availableReservationsArray = allReservations.filter(res => res.booked === false).sort(function(a,b){
//                 // Turn your strings into dates, and then subtract them
//                 // to get a value that is either negative, positive, or zero.
                return new Date(a.date) - new Date(b.date);
             })
  console.log(availableReservationsArray)
  let reservationsByDate = availableReservationsArray.filter((reservation) => reservation.date == date) 
  let arrayOfAvailableDates= availableReservationsArray.map((reservation) => reservation.date)
  let reviews;
  const rawReviews = useSelector(
    (state) =>
      state.restaurants[restaurantId]?.reviews

  );

  if (rawReviews) {
    reviews = Object.values(rawReviews);
  }


  const deleteOneReview = (id) => {
    dispatch(deleteReview(id));
  };

  return (
    <div className="restaurant-container">
      <h1>Single Restaurant Page</h1>
      <CustomerBookReservationModal arrayOfAvailableDates={arrayOfAvailableDates} availableReservationsArray={availableReservationsArray} />
      <h1>{restaurant?.name}</h1>
      <div>
        {reviews?.map((review) => {
          return (
            <div>
              {review.rating}
              {review.comment}
              <div>
                <EditReviewModal id={review.id} />
                <button onClick={() => deleteOneReview(review.id)}>
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Restaurant;
