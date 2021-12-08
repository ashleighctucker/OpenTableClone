import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createReview } from '../../store/restaurant';

const CreateReview = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurantId } = useParams();
  console.log(restaurantId);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(sessionUser.id);

  const reset = () => {
    setRating(1);
    setComment('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const returnedFromDispatch = await dispatch(
      createReview(rating, comment, restaurantId, userId)
    );
    reset();
    console.log(returnedFromDispatch);
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="createReviewForm">
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

export default CreateReview;
