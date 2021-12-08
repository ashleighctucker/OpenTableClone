//constants
const LOAD = 'restaurants/LOAD';
const ADD = 'restaurants/ADD';

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
    default:
      return state;
  }
}
