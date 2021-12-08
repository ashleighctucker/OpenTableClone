import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/restaurant';
import { useParams } from 'react-router';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  let reviews;
  const rawReviews = useSelector(
    (state) => state.restaurants[restaurantId]?.reviews
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
      <div>
        {reviews?.map((review) => {
          return (
            <div>
              {review.rating}
              {review.comment}
              <div>
                <button>edit</button>
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
