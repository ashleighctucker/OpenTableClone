import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './index';

const EditReviewModal = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview id={+id} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
