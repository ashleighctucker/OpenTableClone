import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview, getRestaurants } from '../../store/restaurant';
import { useParams } from 'react-router';
import EditReviewModal from '../EditReview/EditReviewModal';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[+restaurantId]);
  const dispatch = useDispatch();
  const { reviews: rawReviews } = useSelector(
    (state) => state.restaurants[restaurantId]
  );

  const deleteOneReview = (id) => {
    dispatch(deleteReview(id));
    dispatch(getRestaurants());
  };

  return (
    <div className="restaurant-container">
      <h1>{restaurant?.name}</h1>
      <div>
        {Object.values(rawReviews)?.map((review) => {
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
