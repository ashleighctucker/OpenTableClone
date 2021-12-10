import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import {cancelCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import UserEditForm from './UserEditForm'
import './profile.css'
import CustomerReservationForm from '../CustomerBookReservation/CustomerReservationForm';
import { NavLink,  useHistory } from 'react-router-dom';

const Profile = () => {
  let sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [reservationToEditOrDelete, setReservationToEditOrDelete] = useState("");
  const [restaurantIdOfReservationToEditOrDelete, setRestaurantIdOfReservationToEditOrDelete] = useState("");
  const [errors, setErrors] = useState([]);
  let typeOfThunktoCall;

  const getReservationandRestaurantId = async (e) =>{
    e.preventDefault();
    console.log(e.target, "HELLO")
    typeOfThunktoCall = await e.target.getAttribute('data-typeofthunktocall')

    console.log(typeOfThunktoCall, "Look");
    
    await setReservationToEditOrDelete(e.target.value)
    await setRestaurantIdOfReservationToEditOrDelete(e.target.id)
    if (typeOfThunktoCall =="delete") {
      handleCancelReservation()
    }
    else{
      console.log("Other");
      //handleEditReservation()
    }


  }

  useEffect(() => { 
    console.log(typeOfThunktoCall, "LOOK")
    // if (typeOfThunktoCall =="delete") {
    //   handleCancelReservation()
    // }
    // else{
    //   console.log("Other");
    //   //handleEditReservation()
    // }

  }, [restaurantIdOfReservationToEditOrDelete])

  // const handleEditReservation = async e => {
  //   <CustomerBookReservationModal
  //         className='reserve'
  //         arrayOfAvailableDates={arrayOfAvailableDates}
  //         availableReservationsArray={availableReservationsArray}/>
  // }

  const handleCancelReservation = async e =>{
  //e.preventDefault();
  setErrors([]);
  const cancelledCustomerReservation = await dispatch(
      cancelCustomerReservation(reservationToEditOrDelete, restaurantIdOfReservationToEditOrDelete) 
  )
  //await reauthenticate of user to force-reload reservations
  await dispatch(authenticate());
  window.location.reload();
  }

  return (
    <div className='profileContainer'>
      <div className='profileSidebarContainer'>
        <div className='profileAboutContainer'>
          <h2 className='profileAbout'>About Me</h2>
            <button type='button' className='profileEditButton' onClick={() => {setShowModal(true)}}>
              <i className="far fa-edit"></i>
              {showModal && (
                      <Modal onClose={()=> setShowModal(false)}>
                          <UserEditForm setShowModal={setShowModal} user={sessionUser}/>
                      </Modal>
                  )}
            </button>
        </div>
        <p className='profileInfoText' id='name'> {sessionUser.firstName} {sessionUser.lastName}</p>
        <p className='profileInfoText' id='username'> {sessionUser.username}</p>
        <p className='profileInfoText' id='email'> {sessionUser.email}</p>
        <NavLink to='/favorites' className='profileFavorites'>My Favorites</NavLink>
      </div>

      <h2 className='profileReservations'>My Reservations</h2>
      {sessionUser?.reservations.map(reservation => {return <form onSubmit={handleCancelReservation}><button  onClick={getReservationandRestaurantId} value={reservation.reservation_id}  id={reservation.restaurant_id} type="submit" data-typeOfThunktoCall="delete" >Cancel Reservation</button></form>})}

      {sessionUser?.reservations.map(reservation => {return <form onSubmit={handleCancelReservation}><button  onClick={getReservationandRestaurantId} value={reservation.reservation_id}  id={reservation.restaurant_id} type="submit" data-typeOfThunktoCall="edit" >Edit Reservation</button></form>})}

    </div>
  );
};

export default Profile;
