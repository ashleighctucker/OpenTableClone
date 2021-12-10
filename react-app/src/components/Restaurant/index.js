import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeFavorite, getFavorite, deleteFavorite } from '../../store/favorites';
import { useParams } from 'react-router';
import EditReviewModal from '../EditReview/EditReviewModal';
import './restaurant.css'
import { deleteReview, getRestaurants } from '../../store/restaurant';
import CustomerBookReservationModal from '../CustomerBookReservation';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [date, setDate] = useState('');
  const restaurant = useSelector((state) => state.restaurants[+restaurantId]);
  const favorites = useSelector(state => state.favorites)
  const userId = useSelector(state => state.session?.user?.id)
  const dispatch = useDispatch();

  console.log(favorites, "!!!!!!")

  let dollars = ''
  for (let i=0; i<restaurant.price_point; i++) {
    dollars += '$ '
  }

  let stars = ''
  let rating = 0
  let ratings = []
  if (restaurant.reviews) {
    for(let id in restaurant?.reviews){
      ratings.push(restaurant?.reviews[id].rating)
      rating = ((ratings?.reduce((prev, curr) => prev + curr))/ratings?.length).toFixed(1)
    }
    if(ratings.length) {
      let ratingNumber = (ratings?.reduce((prev, curr) => prev + curr))/ratings.length
      for (let i=0; i<5; i++) {
        if (ratingNumber >= 1) stars += '★'
        // else if (ratingNumber > 0.25 && ratingNumber < .75) stars += '1/2'
        else stars += '☆'
        ratingNumber -= 1
      }
    } else stars = '☆☆☆☆☆'
  }

  let reviewStars = ''
  const makeStars = (obj) => {
    reviewStars = ''
    const thisObj = {...obj}
    for (let i=0; i<5; i++) {
      if (thisObj.rating >= 1) {
        reviewStars += '★'
        thisObj.rating -= 1
      } else reviewStars += '☆'
    } return reviewStars
  }

  let reviews;
  const rawReviews = useSelector(
    (state) => state.restaurants[restaurantId]?.reviews
    );

    if (rawReviews) {
      reviews = Object.values(rawReviews);
    }

  let allReservations = useSelector(
    (state) => state.restaurants?.[restaurantId]?.reservations
  );
  let availableReservationsArray = allReservations
    .filter((res) => res.booked === false)
    .sort(function (a, b) {
      //                 // Turn your strings into dates, and then subtract them
      //                 // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });

  let reservationsByDate = availableReservationsArray.filter(
    (reservation) => reservation.date == date
  );
  let arrayOfAvailableDates = availableReservationsArray.map(
    (reservation) => reservation.date
  );

  const deleteOneReview = (id) => {
    dispatch(deleteReview(id));
    dispatch(getRestaurants());
  };

  const makeFav = (restaurantId) => {
    dispatch(makeFavorite(+userId, +restaurantId))
  }

  const delFav = (restId) => {
    let favId
    for (let id in favorites) {
      console.log(favorites[id], restId, 'favorites')
      if (favorites[id].restaurantId == restId){
        favId = id
        console.log(favId, '<<<<<---')
      }}
    dispatch(deleteFavorite(favId, userId))
  }

  const checkFavs = (restId) => {
    for (let id in favorites) {
      if (favorites[id]?.restaurantId == restId) return 'true'
      return 'false'
    }
  }

  return (
    <div>
      <img src={restaurant.cover_photo} alt='restaurant cover'className='coverPhoto'/>
      <div  className="restaurant-container">
        <div className='header'>
          <h1 className='restName'>{restaurant?.name}</h1>

          {checkFavs(restaurant.id) ? (
            <button className='favButton' type='button' onClick={()=>delFav(restaurant.id)}>
              <i className="fas fa-heart"></i>
            </button> ):
            <button className='favButton' type='button' onClick={()=>makeFav(restaurant.id)}>
              <i className="far fa-heart"></i>
            </button> }

          {userId == restaurant.user_id ? (
            <button type='button'>edit restaurant</button>
          ): null}
        </div>

        <div className='restDescriptionContainer'>
          <div className='stars'>{stars} <span className='rating'>{rating}</span></div>
          <div className='dots'>●</div>
          <p>
              <i className="far fa-comments" id='icon' ></i>
            {Object.keys(restaurant.reviews).length} reviews
          </p>
          <div className='dots'>●</div>
          <p className='pricePoint'>{dollars}</p>
          <div className='dots'>●</div>
          <p className='cuisineType'>
            <i className="fas fa-utensils" id='icon'></i>
            {restaurant.cuisine_type}
          </p>
        </div>

        <div className='contactContainer'>
          <div className='hours'> <i className="far fa-clock" id='icon'></i> Daily Hours:
            <div className='openTime'>{restaurant.open_time} - </div>
            <div className='closeTime'>{restaurant.close_time}</div>
          </div>

          <div className='location'> <i className="fas fa-map-marker" id='icon'></i> Location:
            <div className='locationText'> {restaurant.location}</div>
          </div>

          <div className='contactUs'> <i className="far fa-address-book" id='icon'></i> Contact Us:
            {restaurant.phone_number !== null ? (
              <div className='phone'>{restaurant.phone_number}</div>
            ): null}
            {restaurant.contact_email !== null ? (
            <div className='email'>{restaurant.contact_email}</div> ): null}
          </div>

        </div>

        <CustomerBookReservationModal
          className='reserve'
          arrayOfAvailableDates={arrayOfAvailableDates}
          availableReservationsArray={availableReservationsArray}
          />
        <p>{restaurant.description}</p>
      </div>

    {/* --- */}
      <div className='reviewsContainer'>
        <h2 className='reviewsHeader'>Reviews</h2>
        {Object.values(rawReviews)?.map((review) => {
          return (
          <div className='review'>

            <div className='reviewContent'>
              <div className='reviewRating'>{makeStars(review)}</div>
              <div className='reviewComment'>{review.comment}</div>
            </div>

            {userId == review.userId? (
            <div className='ratingButtons'>
              <EditReviewModal id={review.id} className='ratingEdit'/>
              <button onClick={() => deleteOneReview(review.id)} className='ratingDelete'>
                Delete
              </button>
            </div> ): null }

          </div> )})}
      </div>
  </div> );
  }

export default Restaurant;
