import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavorite, getFavorite } from '../../store/favorites';
import { NavLink } from 'react-router-dom';
import './favorites.css';

const Favorites = () => {
  const restaurants = useSelector((state) => state.restaurants);
  const favorites = useSelector((state) => state.favorites);
  const userId = useSelector((state) => state.session?.user?.id);
  const dispatch = useDispatch();

  let favRestaurants = [];
  for (const fav in favorites) {
    const favObj = favorites[fav];
    const favId = favObj.restaurantId;
    for (const id in restaurants) {
      if (Number(id) === Number(favId)) {
        favRestaurants.push(restaurants[id]);
      }
    }
  }


  const deleteFav = async (restId) => {
    let favId;
    for (let id in favorites) {
      if (favorites[id].restaurantId === restId) {
        favId = id;
      }
    }
    await dispatch(deleteFavorite(favId, userId));
  };

  let sessionLinks;
  if (favRestaurants.length) {
    sessionLinks = (
      <div className="cardContainer">
        {favRestaurants.map((res) => (
          <div key={res.id} className="restaurantCard">
            <NavLink to={`/restaurants/${res.id}`}>
              <img
                className="restaurantImage"
                alt="restaurant"
                src={res.cover_photo}
              ></img>
            </NavLink>
            <div className="nameContainer">
              <p className="restaurantName">{res.name}</p>
              <button
                type="button"
                onClick={() => deleteFav(res.id)}
                className="deleteFav"
              >
                Remove
              </button>
            </div>
            <p className="restaurantLocation">
              <strong>Visit: </strong>
              {res.location}
            </p>
            <p className="restaurantNumber">
              <strong>Call: </strong>
              {res.phone_number}
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    sessionLinks = (
      <p className="noFavs">You don't have any favorites. Keep exploring!</p>
    );
  }

  useEffect(() => {
    const asyncLoad = async () => {
      await dispatch(getFavorite(userId));
    };
    asyncLoad();
  }, [dispatch, userId]);

  return (
    <div className="favoritesContainer">
      <div className="favoritesSidebar">
        <h1 className="favoritesHeader">My Restaurants</h1>
      </div>
      {sessionLinks}
    </div>
  );
};

export default Favorites;
