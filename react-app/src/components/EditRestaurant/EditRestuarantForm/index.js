import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editRestaurant } from '../../../store/restaurant';
import TIMES from '../../NewRestaurant/times';
import '../EditRestaurant.css';
import '../../NewRestaurant/restaurant.css';

const EditRestaurantForm = ({ close }) => {
  const dispatch = useDispatch();

  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);

  const cuisine_types = useSelector((state) => state.cuisine_types);
  const types = [];
  for (let type in cuisine_types) {
    types.push(cuisine_types[type]);
  }

  const [name, setName] = useState(restaurant?.name);
  const [location, setLocation] = useState(restaurant?.location);
  const [price_point, setPricePoint] = useState(restaurant?.price_point);
  const [open_time, setOpenTime] = useState(restaurant?.open_time);
  const [close_time, setCloseTime] = useState(restaurant?.close_time);
  const [contact_email, setContactEmail] = useState(restaurant?.contact_email);
  const [description, setDescription] = useState(restaurant?.description);
  const [cover_photo, setCoverPhoto] = useState(restaurant?.cover_photo);
  const [cuisine_type, setCuisineType] = useState(restaurant?.cuisine_type_id);
  const [phone_number, setPhoneNumber] = useState(restaurant?.phone_number);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(
      editRestaurant(
        restaurant.id,
        name,
        location,
        price_point,
        open_time,
        close_time,
        contact_email,
        description,
        cover_photo,
        cuisine_type,
        phone_number
      )
    );
    if (typeof data != 'number') {
      return setErrors(data);
    }
    close();
  };

  return (
    <>
      <div id="restaurant-form-container">
        <h2>Edit {name}'s Infomation</h2>
        <form onSubmit={handleSubmit}>
          <div className="error-div">
            {errors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
          <div className="input-div">
            <label htmlFor="name">Restaurant Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="location">Location</label>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="price_point">Price Point</label>
            <select
              name="price_point"
              value={price_point}
              onChange={(e) => setPricePoint(Number(e.target.value))}
            >
              <option value="1"> $ </option>
              <option value="2"> $$ </option>
              <option value="3"> $$$ </option>
              <option value="4"> $$$$ </option>
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="open_time">Open Time</label>
            <select
              name="open_time"
              value={open_time}
              onChange={(e) => setOpenTime(e.target.value)}
            >
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="close_time">Close Time</label>
            <select
              name="close_time"
              value={close_time}
              onChange={(e) => setCloseTime(e.target.value)}
            >
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="contact_email">Contact Email</label>
            <input
              name="contact_email"
              value={contact_email}
              onChange={(e) => setContactEmail(e.target.value)}
            ></input>
          </div>
          <div className="input-div">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
          <div className="input-div">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              className="description-field"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="cover_photo">Cover Photo URL</label>
            <input
              name="cover_photo"
              value={cover_photo}
              onChange={(e) => setCoverPhoto(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="cuisine_type">Cusine Type</label>
            <select
              name="cuisine_type"
              value={cuisine_type}
              onChange={(e) => setCuisineType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div">
            <button className="edit-page-buttons" type="submit">
              Apply Edits
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRestaurantForm;
