const LOAD = 'my_reservations/LOAD';

const load = (list) => ({
  type: LOAD,
  list,
});

export const getMyReservations = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/reservations/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const myReservations = await response.json();
    dispatch(load(myReservations['reservations']));
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

const initialState = [];

export default function myResReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return [...state, ...action.list];
    }
    default: {
      return state;
    }
  }
}
