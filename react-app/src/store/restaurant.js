//constants
const LOAD = 'restaurants/LOAD';
const ADD = 'restaurants/ADD';
const ADD_REVIEWS = 'reviews/addReviews';
const UPDATE_REVIEWS = 'reviews/updateReviews';
const REMOVE_REVIEWS = 'reviews/removeReviews';

export const addReview = (newReview) => ({
  type: ADD_REVIEWS,
  newReview,
});

export const updateReview = (newReview) => ({
  type: UPDATE_REVIEWS,
  newReview,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEWS,
  reviewId,
});

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (restaurant) => ({
  type: ADD,
  restaurant,
});

export const getRestaurants = () => async (dispatch) => {
  const response = await fetch('/api/restaurants/');
  if (response.ok) {
    const restaurants = await response.json();
    dispatch(load(restaurants['restaurants']));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const addRestaurant =
  (
    user_id,
    name,
    location,
    price_point,
    open_time,
    close_time,
    contact_email,
    description,
    cover_photo,
    cuisine_type,
    phone_number
  ) =>
  async (dispatch) => {
    const response = await fetch('/api/restaurants/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        name,
        location,
        price_point,
        open_time,
        close_time,
        contact_email,
        description,
        cover_photo,
        cuisine_type,
        phone_number,
      }),
    });
    if (response.ok) {
      const restaurant = await response.json();
      dispatch(add(restaurant));
      return restaurant.id;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred.'];
    }
  };

export const createReview =
  (rating, comment, restaurantId, userId) => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        comment,
        restaurantId,
        userId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('this is the response', data);
      dispatch(addReview(data));
      return data.id;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again'];
    }
  };

export const editReview = (rating, comment, id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rating,
      comment,
    }),
  });
  const updatedReview = await res.json();
  dispatch(updateReview(updatedReview));
  return updatedReview;
};

export const deleteReview = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  dispatch(removeReview(id));
  return res;
};

const initialState = {};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      const normalRestaurants = {};
      action.list.forEach((restaurant) => {
        normalRestaurants[restaurant.id] = restaurant;
      });
      return { ...state, ...normalRestaurants };
    }
    case UPDATE_REVIEWS:
    case ADD_REVIEWS: {
      const restaurantId = action.newReview.restaurantId;
      let newState = { ...action.newReview };
      state[restaurantId].reviews = {
        ...newState,
        ...state[restaurantId].reviews,
      };
      // console.log('new review', action.newReview);
      // console.log('this is the new State', state[restaurantId].reviews);
      return {
        ...state,
        // ...state[restaurantId] : {state[restaurantId] state[restaurantId].reviews : {...newState}}
      };
    }
    case REMOVE_REVIEWS: {
      const newState = { ...state };
      console.log(newState);
    }
    case ADD: {
      return {
        ...state,
        [action.restaurant.id]: action.restaurant,
      };
    }
    default:
      return state;
  }
}
