import React, { useState } from 'react';
import { editReview } from '../../store/restaurant';
import { useDispatch } from 'react-redux';
import { getRestaurants } from '../../store/restaurant';
import './editReview.css';

const EditReview = ({ id, setShowModal, review }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(review?.rating);
  const [comment, setComment] = useState(review?.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editReview(rating, comment, id));
    setShowModal(false);
    dispatch(getRestaurants());
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="editReviewForm">
        <div className="ratingDiv">
          <label htmlFor="rating">Rating:</label>
          <select
            onChange={(e) => setRating(Number(e.target.value))}
            value={rating}
            name="rating"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="comment"
          name="comment"
          className="comment-box"
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
      <div className="editReviewContainer"></div>
    </div>
  );
};

export default EditReview;
