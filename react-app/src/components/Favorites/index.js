import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorite } from '../../store/favorites';
import './favorites.css'

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
  }, [dispatch, userId]);

  return (
    <div className='favoritesContainer'>
      <div className='favoritesSidebar'>
        <h1 className='favoritesHeader'>My Restaurants</h1>
      </div>
      <p> favorites.... </p>

    </div>
  );
};

export default Favorites;
