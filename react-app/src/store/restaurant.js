//constants
const LOAD = 'restaurants/LOAD';
const ADD = 'restaurants/ADD';
const UPDATE = 'restaurants/UPDATE';
const REMOVE = 'restaurants/REMOVE';

const ADD_REVIEWS = 'reviews/addReviews';
const UPDATE_REVIEWS = 'reviews/updateReviews';
const REMOVE_REVIEWS = 'reviews/removeReviews';

const ADD_CUSTOMER_RESERVATION = 'reservations/addCustomerReservation';
const DELETE_CUSTOMER_RESERVATION = 'reservations/deleteCustomerReservation'
const ADD_RESERVATION = 'reservations/ADD_RESERVATION';
const EDIT_RESERVATION_OWNER = 'reservations/EDIT_RESERVATION_OWNER';
const DELETE_RESERVATION_OWNER = 'reservations/DELETE_RESERVATION_OWNER';

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

const addReservation = (reservation) => ({
  type: ADD_RESERVATION,
  reservation,
});

const editReservationAsOwner = (reservation) => ({
  type: EDIT_RESERVATION_OWNER,
  reservation,
});

const deleteReservationAsOwner = (reservationId, restaurantId) => ({
  type: DELETE_RESERVATION_OWNER,
  reservationId,
  restaurantId,
});

// gets all restaurants with reservations and reviews eager loaded
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

// adds a single restaurant
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

// edits a restaurant entry
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
    headers: { 'Content-Type': 'application/json' },
  });
  const message = await response.json();
  dispatch(remove(restaurantId));
  return message;
};

//creates a single review
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

// edits a single review
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

// deletes a single review
export const deleteReview = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  dispatch(removeReview(id));
  return res;
};

export const addCustomerReservation = (
  newCustomerReservation,
  idxOfReservationSlotInState
) => ({
  type: ADD_CUSTOMER_RESERVATION,
  newCustomerReservation,
  idxOfReservationSlotInState,
});

export const createCustomerReservation =
  (
    restaurantId,
    reservationId,
    userId,
    partySize,
    notes,
    booked,
    idxOfReservationSlotInState
  ) =>
  async (dispatch) => {
    const response = await fetch(
      `/api/restaurants/${restaurantId}/reservations/${reservationId}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          party_size: partySize,
          notes,
          booked,
        }),
      }
    );
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

// creates a single reservation entry
export const createReservation =
  (restaurantId, time_slot, date, available_size) => async (dispatch) => {
    const response = await fetch(
      `/api/restaurants/${restaurantId}/reservations/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time_slot,
          date,
          available_size,
        }),
      }
    );
    if (response.ok) {
      const newReservation = await response.json();
      dispatch(addReservation(newReservation));
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

export const updateReservation =
  (reservationId, time_slot, date, available_size) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservationId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time_slot,
        date,
        available_size,
      }),
    });
    if (response.ok) {
      const reservation = await response.json();
      dispatch(editReservationAsOwner(reservation));
      return null;
    }
  }


export const deleteCustomerReservation =(canceledReservation, restaurantIdOfCancelledReservation) => ({
  type: DELETE_CUSTOMER_RESERVATION,
  canceledReservation,
  restaurantIdOfCancelledReservation
})




export const cancelCustomerReservation =
  (reservationToEditOrDelete, restaurantIdOfReservationToEditOrDelete ) => async (dispatch) => {
    console.log("THUNK", reservationToEditOrDelete, restaurantIdOfReservationToEditOrDelete );
    const response = await fetch(`/api/restaurants/${restaurantIdOfReservationToEditOrDelete}/reservations/${reservationToEditOrDelete}/`, {
      method: 'DELETE'});
    if (response.ok) {
      const data = await response.json();
      console.log('this is the response', data);
      dispatch(deleteCustomerReservation(data,restaurantIdOfReservationToEditOrDelete));
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

export const deleteReservationEntry =
  (reservationId, restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservationId}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const message = await response.json();
    dispatch(deleteReservationAsOwner(reservationId, restaurantId));
    return message;
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
    case UPDATE_REVIEWS: {
      break;
    }
    case ADD_REVIEWS: {
      const restaurantId = action.newReview.restaurantId;
      newState = { ...state };
      newState[restaurantId].reviews[action.newReview.id] = action.newReview;
      return newState;
    }
    case REMOVE_REVIEWS: {
      newState = { ...state };
      break;
    }
    case ADD: {
      return {
        ...state,
        [action.restaurant?.id]: action.restaurant,
      };
    }
    case UPDATE: {
      newState = { ...state };
      newState[action.restaurant.id] = action.restaurant;
      return newState;
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.restaurantId];
      return newState;
    }
    case ADD_CUSTOMER_RESERVATION: {
      const restaurantId = action.newCustomerReservation.restaurant_id;
      const newState = { ...state };
      newState[restaurantId].reservations[action.idxOfReservationSlotInState] =
        action.newCustomerReservation;
      return newState;
    }
    case ADD_RESERVATION: {
      newState = { ...state };
      newState[action.reservation.restaurant_id].reservations = [
        action.reservation,
        ...newState[action.reservation.restaurant_id].reservations,
      ];
      return newState;
    }
    case DELETE_RESERVATION_OWNER: {
      newState = { ...state };
      let filterArray = [...newState[action.restaurantId].reservations];

      newState[action.restaurantId].reservations = filterArray.filter(
        (reservation) => reservation.id !== action.reservationId
      );
      return newState;
    }

    case DELETE_CUSTOMER_RESERVATION: {
      const newState = { ...state };
      const canceledReservationId = action.canceledReservation.id
      const canceledRestartId = action.restaurantIdOfCancelledReservation
      console.log(newState, "THE NEW STATE");
      console.log(canceledReservationId, "THE CANCELLED RESERVATION")
      console.log(newState.reservations, "THE RESERVATIONS");
      const allReservationsForRestaurant = newState[canceledRestartId].reservations
      console.log(allReservationsForRestaurant, "ALL RES");
      const idxToReassign = allReservationsForRestaurant.findIndex(reservation => reservation.id == canceledReservationId)
      console.log(idxToReassign, "IDX TO REAS");
      newState[canceledRestartId].reservations[idxToReassign] = action.canceledReservation
      return newState
    }



    default: {
      return state;
    }
  }
}
