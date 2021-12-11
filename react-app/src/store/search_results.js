const LOAD = 'search/LOAD';

const load = (list) => ({
  type: LOAD,
  list,
});

export const getSearch = (term) => async (dispatch) => {
  const response = await fetch(`/api/search/${term}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const results = await response.json();
    dispatch(load(results['search']));
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

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return [...action.list];
    }
    default: {
      return state;
    }
  }
}
