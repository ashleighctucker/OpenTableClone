import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createReview, getRestaurants } from '../../store/restaurant';
import './review.css'

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
    dispatch(getRestaurants());
    reset();
  };

  return (
    <div className="createReview">
      <form onSubmit={handleSubmit} className="createReviewForm">
        <p className="submitReview">Submit Review </p>
        <div className="errors">
          {errors &&
            errors.map((error, i) => {
              return <p key={i}>{error}</p>;
            })}
        </div>
        <div class="rate">
          <input type="radio" id="star5" name="rate" value={5} onClick={(e) => setRating(Number(e.target.value))}/>
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value={4} onClick={(e) => setRating(Number(e.target.value))}/>
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value={3} onClick={(e) => setRating(Number(e.target.value))}/>
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value={2} onClick={(e) => setRating(Number(e.target.value))}/>
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value={1} onClick={(e) => setRating(Number(e.target.value))}/>
          <label for="star1" title="text">1 star</label>
        </div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Comment..."
          name="comment"
          className='commentInput'
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
