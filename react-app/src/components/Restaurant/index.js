import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[+restaurantId]);
  const rawReviews = useSelector(
    (state) => state.restaurants[restaurantId]?.reviews
  );
  let reviews;
  if (rawReviews) {
    reviews = Object.values(rawReviews);
  }

  return (
    <div className="restaurant-container">
      <h1>{restaurant?.name}</h1>
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
