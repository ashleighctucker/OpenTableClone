import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
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
    return (
      <>
        <Route path="/home">
          <HomePage />
        </Route>
        <ProtectedRoute path="/new-restaurant" exact={true}>
          <NewRestaurant />
        </ProtectedRoute>
        <Route path="/restaurants/:restaurantId/edit" exact={true}>
          <EditRestaurant />
        </Route>
        <Route path="/restaurants/:restaurantId" exact={true}>
          <Restaurant />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route>
            <h1>Page Not Found</h1>
          </Route>
      </>
    );
  };

  return (
    <BrowserRouter>
      <div className="content">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          {loaded ? <Routes /> : null}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
