import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerReservationForm  from './CustomerEditForm';

function CustomerEditReservationModal({arrayOfAvailableDates, availableReservationsArray}) {
  const [showModal, setShowModal] = useState(false);

  const editAReservationButton = (<>
      <button className="customerEditReservationButton" onClick={() => setShowModal(true)}>Book a reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerReservationForm arrayOfAvailableDates= {arrayOfAvailableDates} availableReservationsArray={availableReservationsArray} />
        </Modal>
      )}
    </>
  );

  return (arrayOfAvailableDates.length ? editAReservationButton : <h2> No reservations available</h2>
  );
}

export default CustomerEditReservationModal;
