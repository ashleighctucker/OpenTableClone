import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import {cancelCustomerReservation} from "../../store/restaurant" 
import { authenticate } from '../../store/session'
import UserEditForm from './UserEditForm'
import './profile.css'
import { NavLink,  useHistory } from 'react-router-dom';

const Profile = () => {
  let sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [reservationToEditOrDelete, setReservationToEditOrDelete] = useState("");
  const [restaurantIdOfReservationToEditOrDelete, setRestaurantIdOfReservationToEditOrDelete] = useState("");
  const [errors, setErrors] = useState([]);

  const getReservationandRestaurantId = (e) =>{
    e.preventDefault();
    setReservationToEditOrDelete(e.target.value)
    setRestaurantIdOfReservationToEditOrDelete(e.target.id)


  }

  useEffect(() => {
    handleCancelReservation()

  }, [restaurantIdOfReservationToEditOrDelete])
  console.log(reservationToEditOrDelete, "RESERVATION TO EDIT OR DELETE")
  console.log(restaurantIdOfReservationToEditOrDelete, "ID OF RESTAURANT");

  const handleCancelReservation = async e =>{
  //e.preventDefault();
  setErrors([]);
  console.log("YAHHHHHHHHHHHH");
  const cancelledCustomerReservation = await dispatch(
      cancelCustomerReservation(reservationToEditOrDelete, restaurantIdOfReservationToEditOrDelete) 
  )
  //await reauthenticate of user to force-reload reservations
  await dispatch(authenticate());
  history.push(`/profile/`);
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
      {sessionUser?.reservations.map(reservation => {return <form onSubmit={handleCancelReservation}><button  onClick={getReservationandRestaurantId} value={reservation.reservation_id}  id={reservation.restaurant_id} type="submit" >Cancel Reservation</button></form>})}

    </div>
  );
};

export default Profile;
