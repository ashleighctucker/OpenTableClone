//constants
const LOAD = 'restaurants/LOAD';
const ADD = 'restaurants/ADD';
const UPDATE = 'restaurants/UPDATE';
const REMOVE = 'restaurants/REMOVE';

const ADD_REVIEWS = 'reviews/addReviews';
const UPDATE_REVIEWS = 'reviews/updateReviews';
const REMOVE_REVIEWS = 'reviews/removeReviews';

const ADD_CUSTOMER_RESERVATION = 'reservations/addCustomerReservation'

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

const update = (restaurant) => ({
  type: UPDATE,
  restaurant,
});

const remove = (restaurantId) => ({
  type: REMOVE,
  restaurantId,
});

export const getRestaurants = () => async (dispatch) => {
  const response = await fetch('/api/restaurants/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

export const editRestaurant =
  (
    restaurantId,
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
    const response = await fetch(`/api/restaurants/${restaurantId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      dispatch(update(restaurant));
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

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/`, {
    method: 'DELETE',
  });
  const message = await response.json();
  dispatch(remove(restaurantId));
  return message;
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
      dispatch(addReview(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred.'];
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

export const addCustomerReservation = (newCustomerReservation, idxOfReservationSlotInState) => ({
  type: ADD_CUSTOMER_RESERVATION,
  newCustomerReservation,
  idxOfReservationSlotInState
});

export const createCustomerReservation =
  (restaurantId, reservationId, userId, partySize, notes, booked, idxOfReservationSlotInState) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}/reservations/${reservationId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id:userId,
        party_size:partySize,
        notes,
        booked,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('this is the response', data);
      dispatch(addCustomerReservation(data, idxOfReservationSlotInState));
      return data.id;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred.'];
    }
  };

const initialState = {};

export default function restaurantReducer(state = initialState, action) {
  let newState;
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
      newState = { ...state };
      newState[restaurantId].reviews[action.newReview.id] = action.newReview;
      return newState;
    }
    case REMOVE_REVIEWS: {
      newState = { ...state };
    }
    case ADD: {
      return {
        ...state,
        [action.restaurant?.id]: action.restaurant,
      };
    }
    case UPDATE: {
      return {
        ...state,
        [action.restaurant.id]: action.notebook,
      };
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.restaurantId];
      return newState;
    }
    case ADD_CUSTOMER_RESERVATION: { 
      const restaurantId = action.newCustomerReservation.restaurant_id
      const newState = { ...state };
      newState[restaurantId].reservations[action.idxOfReservationSlotInState] = action.newCustomerReservation;
      return newState;
    }
    default: {
      return state;
    }
  }
}
