import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorite } from '../../store/favorites';
import { NavLink } from 'react-router-dom';
import './favorites.css'

const Favorites = () => {
  const favorites = useSelector(state => state.favorites)
  const restaurants = useSelector(state => state.restaurants)
  const userId = useSelector(state=>state.session?.user?.id)
  const dispatch = useDispatch();

  let favRestaurants = []

  for (const fav in favorites) {
    const favObj = favorites[fav]
    const favId = favObj?.restaurantId
    for (const id in restaurants) {
      if(id == favId) {
        favRestaurants.push(restaurants[id])
      }
    }
  }

  console.log(favRestaurants, '!!!!!////')


  useEffect(() => {
    const asyncLoad = async () => {
      await dispatch(getFavorite(userId));
    };
    asyncLoad();
  }, [dispatch]);

  return (
    <div className='favoritesContainer'>
      <div className='favoritesSidebar'>
        <h1 className='favoritesHeader'>My Restaurants</h1>
      </div>
      <div className='cardContainer'>
      {favRestaurants.map(res => (
        <NavLink to={`/restaurants/${res.id}`} className='restaurantCard'>
          <p className='restaurantName'>{res.name}</p>
          <img className='restaurantImage' src={res.cover_photo}></img>
          <p className='restaurantLocation'><strong>Visit: </strong>{res.location}</p>
          <p className='restaurantNumber'><strong>Call: </strong>{res.phone_number}</p>
        </NavLink>
      ))}
      </div>
    </div>
  );
};

export default Favorites;
