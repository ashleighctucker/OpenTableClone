import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addRestaurant } from '../../store/restaurant';
import TIMES from './times';
import './restaurant.css';

const NewRestaurant = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const cuisine_types = useSelector((state) => state.cuisine_types);
  const types = [];
  for (let type in cuisine_types) {
    types.push(cuisine_types[type]);
  }

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price_point, setPricePoint] = useState(1);
  const [open_time, setOpenTime] = useState(TIMES[0]);
  const [close_time, setCloseTime] = useState(TIMES[0]);
  const [contact_email, setContactEmail] = useState('');
  const [description, setDescription] = useState('');
  const [cover_photo, setCoverPhoto] = useState('');
  const [cuisine_type, setCuisineType] = useState(1);
  const [phone_number, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(
      addRestaurant(
        sessionUser.id,
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
    history.push(`/restaurants/${data}`);
  };

  return (
    <div className="restaurant-form">
      <h1>Add a Restaurant to La Table</h1>
      <form id="new-restaurant-form" onSubmit={handleSubmit}>
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
        <div>
          <label className="input-div" htmlFor="description">
            Description
          </label>
          <textarea
            id="new-description"
            name="description"
            value={description}
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
          <button type="submit">Add Restaurant</button>
        </div>
      </form>
    </div>
  );
};

export default NewRestaurant;
