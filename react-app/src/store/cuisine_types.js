//constants
const LOAD = 'cuisine_types/LOAD';

const load = (list) => ({
  type: LOAD,
  list,
});

export const getCuisineTypes = () => async (dispatch) => {
  const response = await fetch('/api/cuisine_types/');
  if (response.ok) {
    const cuisine_types = await response.json();
    dispatch(load(cuisine_types['cuisine_types']));
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

export default function cusineTypeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      const normalCusineTypes = {};
      action.list.forEach((type) => {
        normalCusineTypes[type.id] = type;
      });
      return { ...state, ...normalCusineTypes };
    }
    default: {
      return state;
    }
  }
}
