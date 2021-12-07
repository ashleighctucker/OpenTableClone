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
  const restaurants = await response.json();
  if (response.ok) {
    dispatch(load(restaurants['restaurants']));
    return restaurants['restaurants'];
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
    default:
      return state;
  }
}
