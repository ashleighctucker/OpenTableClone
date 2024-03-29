const GET_FAV = 'favorite/GET_FAV';
const MAKE_FAV = 'favorite/MAKE_FAV';
const DEL_FAV = 'favorite/DEL_FAV';

const getFav = (userId) => ({
  type: GET_FAV,
  payload: userId,
});

const makeFav = (content) => ({
  type: MAKE_FAV,
  payload: content,
});

const delFav = (id) => ({
  type: DEL_FAV,
  payload: id,
});

export const getFavorite = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/favorites`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const favorites = await response.json();
    dispatch(getFav(favorites));
    return favorites;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const makeFavorite = (userId, restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, restaurantId }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(makeFav(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else return ['An error occurred. Please try again.'];
};

export const deleteFavorite = (id, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/favorites/${id}`, {
    method: 'DELETE',
  });
  dispatch(delFav(id));
  return response;
};

const favoriteReducer = (state = { favorites: {} }, action) => {
  let newState;
  switch (action.type) {
    case GET_FAV:
      const normalFavs = { ...action.payload };
      action.payload.favorites.forEach((fave) => (normalFavs[fave.id] = fave));
      return normalFavs;
    case MAKE_FAV:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DEL_FAV:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default favoriteReducer;
