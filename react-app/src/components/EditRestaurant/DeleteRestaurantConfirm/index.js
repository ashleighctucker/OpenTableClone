import React from 'react';
import { deleteRestaurant } from '../../../store/restaurant';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DeleteRestaurantConfirm = ({ restaurant, close }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteRestaurant(restaurant.id));
    history.push('/home');
  };

  return (
    <div id="restaurant-delete-modal">
      <div className="delete-modal-div">
        <p>Are you sure you want to delete {restaurant.name}?</p>
        <p> This action cannot be reversed.</p>
        <button className="edit-page-buttons" onClick={handleDelete}>
          Confim Delete
        </button>
      </div>
      <div className="delete-modal-div">
        <button className="edit-page-buttons" onClick={() => close()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRestaurantConfirm;
