import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import LoginForm from './LoginForm'
import '../NavBar/NavBar.css'

function LoginModal() {
    const [showModal, setShowModal] = useState(false);
    console.log('WE INSIDE THE FORM')

    return (
        <>
            <button type='button' onClick={() => {setShowModal(true)}} className='NavLogin'>Log In</button>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginModal
