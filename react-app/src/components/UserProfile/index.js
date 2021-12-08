import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import UserEditForm from './UserEditForm'

const Profile = () => {
  let sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>{sessionUser.firstName}'s Profile</h1>
      <h2>My Reservations</h2>

      <h2>About Me</h2>
      <p><strong>Username:</strong> {sessionUser.username}</p>
      <p><strong>Name:</strong> {sessionUser.firstName} {sessionUser.lastName}</p>
      <p><strong>Email:</strong> {sessionUser.email}</p>
      <button type='button' onClick={() => {setShowModal(true)}}>
        <i class="far fa-edit"></i>
        {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <UserEditForm setShowModal={setShowModal} user={sessionUser}/>
                </Modal>
            )}
      </button>

    </div>
  );
};

export default Profile;
