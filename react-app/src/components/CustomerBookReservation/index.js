import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerReservationForm  from './CustomerReservationForm';

function CustomerBookReservationModal({arrayOfAvailableDates, availableReservationsArray}) {
  const [showModal, setShowModal] = useState(false);

  const bookAReservationButton = (<>
      <button className="customerBookReservationButton" onClick={() => setShowModal(true)}>Book a reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerReservationForm arrayOfAvailableDates= {arrayOfAvailableDates} availableReservationsArray={availableReservationsArray} />
        </Modal>
      )}
    </>
  );

  return (arrayOfAvailableDates.length ? bookAReservationButton : <h2> No reservations available</h2>
  );
}

export default CustomerBookReservationModal;
