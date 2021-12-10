import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CustomerEditReservationForm  from './CustomerEditReservationForm';

function CustomerEditReservationModal({reservationToEditOrDelete, reservationPartySize, reservationNotes, reservationAvailableSize, reservationRestaurantId}) {
  const [showModal, setShowModal] = useState(false);

  const editAReservationButton = (<>
      <button className="customerEditReservationButton" onClick={() => setShowModal(true)}  data-reservationid={reservationToEditOrDelete} data-partysize={reservationPartySize} data-notes={reservationNotes}>Edit Reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomerEditReservationForm reservationToEditOrDelete= {reservationToEditOrDelete} reservationPartySize={reservationPartySize} reservationNotes={reservationNotes} reservationAvailableSize={reservationAvailableSize} reservationRestaurantId={reservationRestaurantId} />
        </Modal>
      )}
    </>
  );

  return (editAReservationButton);
}

export default CustomerEditReservationModal;
