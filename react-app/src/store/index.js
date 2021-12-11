import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import restaurants from './restaurant';
import cuisine_types from './cuisine_types';
import favoriteReducer from './favorites';
import myResReducer from './my_reservations';
import SearchReducer from './search_results';

const rootReducer = combineReducers({
  session,
  restaurants,
  cuisine_types,
  favorites: favoriteReducer,
  my_reservations: myResReducer,
  search_results: SearchReducer,
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
