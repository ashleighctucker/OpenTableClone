import React, { useState } from 'react';
import { editReview } from '../../store/restaurant';
import { useDispatch } from 'react-redux';
import { getRestaurants } from '../../store/restaurant';

const EditReview = ({ id, setShowModal }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editReview(rating, comment, id));
    setShowModal(false);
    dispatch(getRestaurants());
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="editReviewForm">
        <select
          onChange={(e) => setRating(Number(e.target.value))}
          value={rating}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
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
