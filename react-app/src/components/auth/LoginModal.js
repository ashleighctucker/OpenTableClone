import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import LoginForm from './LoginForm'
import '../NavBar/NavBar.css'

function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <span
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
          className="NavLogin point"
        >
          <i class="fas fa-sign-in-alt"></i> Log In
        </span>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
}

export default LoginModal
