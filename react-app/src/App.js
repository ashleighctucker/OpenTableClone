import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import SplashPage from './components/splashPage';
import HomePage from './components/HomePage';
import Restaurant from './components/Restaurant';
import { authenticate } from './store/session';
import NewRestaurant from './components/NewRestaurant';
import Favorites from './components/Favorites';
import Profile from './components/UserProfile';
import EditRestaurant from './components/EditRestaurant';
import { getCuisineTypes } from './store/cuisine_types';
import { getRestaurants } from './store/restaurant';
import { getFavorite } from './store/favorites';
import { getMyReservations } from './store/my_reservations';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        .then((id) => {
          if (id) dispatch(getFavorite(id));
          if (id) dispatch(getMyReservations(id));
        })
        .then(() => dispatch(getRestaurants()))
        .then(() => dispatch(getCuisineTypes()))
        .then(() => setLoaded(true));
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const Routes = () => {
    if (loaded) {
      return (
        <>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/new-restaurant" exact={true}>
            <NewRestaurant />
          </Route>
          <Route path="/restaurants/:restaurantId/edit" exact={true}>
            <EditRestaurant />
          </Route>
          <Route path="/restaurants/:restaurantId" exact={true}>
            <Restaurant />
          </Route>
          <Route path="/favorites" exact={true}>
            <Favorites />
          </Route>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>

          <Route path="/search-results" exact={true}>
            <SearchResults />
          </Route>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <BrowserRouter>
      <div className="content">
        <NavBar />
        <Switch>
          <Route exact={true} path="/">
            <SplashPage />
          </Route>
          {Routes()}
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
