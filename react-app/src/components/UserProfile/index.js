
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {cancelCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import { Modal } from '../../context/Modal';
import './profile.css';
import { NavLink, useHistory } from 'react-router-dom';
import UserEditForm from './UserEditForm'
import CustomerEditReservationModal from '../CustomerEditReservation/'

const Profile = () => {
  let sessionUser = useSelector((state) => state.session.user);
  let restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [showModal, setShowModal] = useState(false);
  const [reservationToEditOrDelete, setReservationToEditOrDelete] = useState("");
  const [restaurantIdOfReservationToEditOrDelete, setRestaurantIdOfReservationToEditOrDelete] = useState("");
  const [typeOfThunktoCall, setTypeOfThunktoCall] = useState("");
  const [reservationNotes, setReservationNotes] = useState("");
  const [reservationPartySize, setReservationPartySize] = useState("");
  const [errors, setErrors] = useState([]);
  
const getReservationandRestaurantId = async (e) =>{
    e.preventDefault();
    console.log(e.target, "HELLO")
    let stringTypeOfThunktoCall = await e.target.getAttribute('data-typeofthunktocall')
    await setReservationNotes(await e.target.getAttribute("data-notes"))
    await setReservationPartySize(await e.target.getAttribute("data-partysize"))
    await setTypeOfThunktoCall(stringTypeOfThunktoCall)
    await setReservationToEditOrDelete(e.target.value)
    await setRestaurantIdOfReservationToEditOrDelete(e.target.id)
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let myRestaurants = {};

  for (let id in restaurants) {
    if (restaurants[id].ownerId === sessionUser.id) {
      console.log(restaurants[id].ownerId === sessionUser.id);
      myRestaurants[id] = restaurants[id];
    }
  }
  
    useEffect(() => { 
    console.log(typeOfThunktoCall, "LOOK")
    if (typeOfThunktoCall =="delete") {
      handleCancelReservation()
    }

  }, [restaurantIdOfReservationToEditOrDelete])


  const handleCancelReservation = async e =>{
  setErrors([]);
  const cancelledCustomerReservation = await dispatch(
      cancelCustomerReservation(reservationToEditOrDelete, restaurantIdOfReservationToEditOrDelete) 
  )
  //await reauthenticate of user to force-reload reservations
  await dispatch(authenticate());
  window.location.reload();
  }

  const myLinks = () => {
    const links = [];
    for (let id in myRestaurants) {
      links.push(
        <NavLink
          className="single-link"
          key={id}
          to={`/restaurants/${id}/edit`}
        >
          {myRestaurants[id].name}
        </NavLink>
      );
    }
    return links;
  };

  return (
    <div className="profileContainer">
      <div id="side-contain">
        <div className="profileSidebarContainer">
          <div className="profileAboutContainer">
            <h2 className="profileAbout">About Me</h2>
          </div>
          <p className="profileInfoText" id="name">
            {sessionUser.firstName} {sessionUser.lastName}
          </p>
          <p className="profileInfoText" id="username">
            {sessionUser.username}
          </p>
          <p className="profileInfoText" id="email">
            {sessionUser.email}
          </p>
          <NavLink to="/favorites" className="profileFavorites">
            My Favorites
          </NavLink>
        </div>
        <NavLink to="/new-restaurant">
          <button>
            <i className="fas fa-plus"></i> Add New Restaurant
          </button>
        </NavLink>
        <h3>My Restaurants:</h3>
        <div className="links">{myRestaurants ? myLinks() : null}</div>
      </div>


      <h2 className='profileReservations'>My Reservations</h2>
      {sessionUser?.reservations.map(reservation => {return <form onSubmit={handleCancelReservation}><button  onClick={getReservationandRestaurantId} value={reservation.reservation_id}  id={reservation.restaurant_id} type="submit" data-typeOfThunktoCall="delete" data-partysize={reservation.party_size} data-notes={reservation.notes} reservationAvailableSize={reservation.available_size} >Cancel Reservation</button></form>})}


      {sessionUser?.reservations.map(reservation => {return <CustomerEditReservationModal onClick={getReservationandRestaurantId} reservationToEditOrDelete={reservation.reservation_id} reservationPartySize={reservation.party_size} reservationNotes={reservation.notes} reservationAvailableSize={reservation.available_size}reservationRestaurantId={reservation.restaurant_id}/>})}


    </div>
  );
};

export default Profile;
