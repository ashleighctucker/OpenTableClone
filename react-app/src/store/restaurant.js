//constants
const LOAD = 'restaurants/LOAD';
const ADD = 'restaurants/ADD';
const UPDATE = 'restaurants/UPDATE';
const REMOVE = 'restaurants/REMOVE';

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
    const response = await fetch(`/api/restaurants/${restaurantId}`, {
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
  const response = await fetch(`/api/restaurants/${restaurantId}`, {
    method: 'DELETE',
  });
  const message = await response.json();
  dispatch(remove(restaurantId));
  return message;
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
    case ADD: {
      return {
        ...state,
        [action.restaurant.id]: action.restaurant,
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
    default:
      return state;
  }
}
