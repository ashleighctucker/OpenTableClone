<<<<<<< HEAD
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const rawReviews = useSelector(
    (state) =>
      // Object.values(state.restaurants[restaurantId]?.reviews)
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
=======
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import CustomerBookReservationModal from '../CustomerBookReservation';
import getRestaurants from '../../store/restaurant'


const Restaurant = () => {
  const dispatch = useDispatch();
  //dispatch(getRestaurants())
  const asyncLoad = () => async(dispatch) => {
    await dispatch(getRestaurants())
  };
  //asyncLoad()
  useEffect(() => {
    asyncLoad()
  }, [])
  return (
    <div className="restaurant-container">
      <h1>Single Restaurant Page</h1>
      <CustomerBookReservationModal/>

>>>>>>> WIP
    </div>
  );
};

export default Restaurant;
