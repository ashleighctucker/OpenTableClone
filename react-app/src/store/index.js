import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import reviewReducer from './review';
import restaurants from './restaurant';
import cuisine_types from './cuisine_types';

const rootReducer = combineReducers({
  session,
  restaurants,
<<<<<<< HEAD
  cuisine_types,
=======
  reviews: reviewReducer,
>>>>>>> 4d6eee4 (added frontend redux state for reviews and create review thunk)
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
