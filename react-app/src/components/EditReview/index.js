import React, { useState } from 'react';
import { editReview } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const EditReview = ({ id, setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurantId } = useParams();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const reset = () => {
    setRating(1);
    setComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editReview(rating, comment, id));
    setShowModal(false);
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="editReviewForm">
        <input
          type="number"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          placeholder="rating"
          name="rating"
          required
        />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="comment"
          name="comment"
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditReview;
