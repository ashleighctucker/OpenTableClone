import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import {cancelCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import UserEditForm from './UserEditForm'
import './profile.css'
import CustomerEditReservationModal from '../CustomerEditReservation/'
import { NavLink,  useHistory } from 'react-router-dom';

const Profile = () => {
  let sessionUser = useSelector(state => state.session.user)
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

  return (
    <div className="profileContainer">
      <div className="profileSidebarContainer">
        <div className="profileAboutContainer">
          <h2 className="profileAbout">About Me</h2>
        </div>
        <p className="profileInfoText" id="name">
          {' '}
          {sessionUser.firstName} {sessionUser.lastName}
        </p>
        <p className="profileInfoText" id="username">
          {' '}
          {sessionUser.username}
        </p>
        <p className="profileInfoText" id="email">
          {' '}
          {sessionUser.email}
        </p>
        <NavLink to="/favorites" className="profileFavorites">
          My Favorites
        </NavLink>
      </div>


      <h2 className='profileReservations'>My Reservations</h2>
      {sessionUser?.reservations.map(reservation => {return <form onSubmit={handleCancelReservation}><button  onClick={getReservationandRestaurantId} value={reservation.reservation_id}  id={reservation.restaurant_id} type="submit" data-typeOfThunktoCall="delete" data-partysize={reservation.party_size} data-notes={reservation.notes} reservationAvailableSize={reservation.available_size} >Cancel Reservation</button></form>})}


      {sessionUser?.reservations.map(reservation => {return <CustomerEditReservationModal onClick={getReservationandRestaurantId} reservationToEditOrDelete={reservation.reservation_id} reservationPartySize={reservation.party_size} reservationNotes={reservation.notes} reservationAvailableSize={reservation.available_size}reservationRestaurantId={reservation.restaurant_id}/>})}


    </div>
  );
};

export default Profile;
