import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorite } from '../../store/favorites';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const userId = useSelector((state) => state.session?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncLoad = async () => {
      await dispatch(getFavorite(userId));
    };
    asyncLoad();
  }, [dispatch, userId]);

  return (
    <div>
      <h1>My Restaurants</h1>
      <p>Favorites:</p>
    </div>
  );
};

export default Favorites;
