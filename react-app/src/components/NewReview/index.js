import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createReview } from '../../store/restaurant';

const CreateReview = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurantId } = useParams();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setRating(1);
    setComment('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(
      createReview(rating, comment, restaurantId, sessionUser.id)
    );
    if (data) {
      setErrors([]);
    }
    reset();
    console.log(data);
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="createReviewForm">
        <div className="errors">
          {errors &&
            errors.map((error, i) => {
              return <p key={i}>{error}</p>;
            })}
        </div>
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

export default CreateReview;
