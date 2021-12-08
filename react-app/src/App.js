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
import { getRestaurants, createReview } from './store/restaurant';
import CreateReview from './components/NewReview';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  dispatch(getRestaurants());

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <ProtectedRoute exact path="/restaurants/new">
          <NewRestaurant />
        </ProtectedRoute>
        <Route path="/restaurants/:restaurantId">
          <Restaurant />
          <CreateReview />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
