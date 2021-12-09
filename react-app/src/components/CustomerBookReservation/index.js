import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerReservationForm  from './CustomerReservationForm';

function CustomerBookReservationModal({arrayOfAvailableDates, availableReservationsArray}) {
  const [showModal, setShowModal] = useState(false);

  return (<>
      <button className="customerBookReservationButton" onClick={() => setShowModal(true)}>Book a reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerReservationForm arrayOfAvailableDates= {arrayOfAvailableDates} availableReservationsArray={availableReservationsArray} />
        </Modal>
      )}
    </>
  );
}

export default CustomerBookReservationModal;
