const ADD_REVIEWS = 'reviews/addReviews';

export const addReview = (newReview) => ({
  type: ADD_REVIEWS,
  newReview,
});

export const createReview = (payload) => async (dispatch) => {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const newReview = await res.json();
  dispatch(addReview(newReview));
  return newReview;
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEWS:
      return {
        ...state,
        [action.newReview.id]: action.newReview,
      };
    default:
      return state;
  }
};

export default reviewReducer;
