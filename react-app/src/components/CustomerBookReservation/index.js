import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerReservationForm  from './CustomerReservationForm';

function CustomerBookReservationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="customerBookReservationButton" onClick={() => setShowModal(true)}>Book a reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerReservationForm />
        </Modal>
      )}
    </>
  );
}

export default CustomerBookReservationModal;
