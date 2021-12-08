import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorite } from '../../store/favorites';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites)
  const userId = useSelector(state=>state.session?.user?.id)
  const dispatch = useDispatch();
  console.log(favorites, userId, '<---')

  useEffect(() => {
    const asyncLoad = async () => {
      await dispatch(getFavorite(userId));
    };
    asyncLoad();
  }, [dispatch]);

  return (
    <div>
      <h1>My Restaurants</h1>
      <p>Favorites:</p>
      {Object.keys(favorites).map(key => {
        <p>{key}</p>
      })}
    </div>
  );
};

export default Favorites;
