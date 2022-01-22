import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import SignUpForm from './SignUpForm'
import '../NavBar/NavBar.css'

function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <span
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
          className="NavSignin point"
        >
          <i class="fas fa-user-plus"></i> Sign Up
        </span>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignUpForm setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
}

export default SignupModal;
