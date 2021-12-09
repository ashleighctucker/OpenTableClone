import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/restaurant';
import { makeFavorite, getFavorite } from '../../store/favorites';
import { useParams } from 'react-router';
import EditReviewModal from '../EditReview/EditReviewModal';
import './restaurant.css'

const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[+restaurantId]);
  const favorites = useSelector(state => state.favorites)
  const userId = useSelector(state => state.session.user.id)
  const dispatch = useDispatch();
  console.log(favorites, '<-----')

  //Xclose_time, Xopen_time, contact_email, phone_number, Xlocation, Xcover_photo
  //Xdescription, Xcuisine_type, Xname, Xprice_point
  //reservations [], Xreviews {}

  let dollars = ''
  for (let i=0; i<restaurant.price_point; i++) {
    dollars += '$ '
  }

  let stars = ''
  let ratings = []
  let rating = 0
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


  let description = restaurant.description
  // console.log(restaurant.id)


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

  const makeFav = (restaurantId) => {
    dispatch(makeFavorite(userId, restaurantId))
  }

  useEffect(() => {
    const asyncLoad = async () => {
      await dispatch(getFavorite(userId));
    };
    asyncLoad();
  }, [dispatch]);

  return (
    <div>
      <img src={restaurant.cover_photo} className='coverPhoto'/>
      <div  className="restaurant-container">
        <div className='header'>
          <h1 className='restName'>{restaurant?.name}</h1>
          <button className='favButton' type='button' onClick={()=>makeFav(restaurant.id)}>
            <i class="far fa-heart"></i>
          </button>
        </div>

        <div className='restDescriptionContainer'>
          <div className='stars'>{stars} {rating}</div>
          <div className='dots'>●</div>
          <p>
            <i className="far fa-comments" id='icon' ></i>
            {Object.keys(restaurant.reviews).length} reviews</p>
          <div className='dots'>●</div>
          <p className='pricePoint'>{dollars}</p>
          <div className='dots'>●</div>
          <p className='cuisineType'>
            <i className="fas fa-utensils" id='icon'></i>
            {restaurant.cuisine_type}</p>
        </div>

        <div className='contactContainer'>
          <div className='hours'> <i class="far fa-clock" id='icon'></i> Daily Hours:
            <div className='openTime'>{restaurant.open_time} - </div>
            <div className='closeTime'>{restaurant.close_time}</div>
          </div>

          <div className='location'> <i class="fas fa-map-marker" id='icon'></i> Location:
            <div className='locationText'> {restaurant.location}</div>
          </div>

          <div className='contactUs'> <i class="far fa-address-book" id='icon'></i> Contact Us:
            {restaurant.phone_number !== null ? (
              <div className='phone'>{restaurant.phone_number}</div>
            ): null}
            {restaurant.contact_email !== null ? (
            <div className='email'>{restaurant.contact_email}</div> ): null}
          </div>

        </div>

        {/* <p>{restaurant.description}</p> */}

      </div>
      <div className='reviews'>
        {reviews?.map((review) => {
          return (
            <div>
              <div className='reviewRating'>{review.rating}</div>
              <div className='reviewComment'>{review.comment}</div>
              <div className='ratingButtons'>
                <EditReviewModal id={review.id} className='ratingEdit'/>
                <button onClick={() => deleteOneReview(review.id)} className='ratingDelete'>
                  Delete
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
