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
  const response = await fetch('/api/restaurants');
  const restaurants = response.json();
  if (response.ok) {
    dispatch(load(restaurants));
    return restaurants;
  }
};


