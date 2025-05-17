import { ReactEventHandler, useState } from 'react';

type RatingType = {
  value: number;
  title: string;
}

type RatingItemProps = {
  rating: RatingType;
  onStarClick: ReactEventHandler;
}

type HandleChangeType = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const RATINGS: RatingType[] = [
  {
    value: 5,
    title: 'perfect'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 1,
    title: 'terribly'
  },
];

function RatingItem({rating, onStarClick}: RatingItemProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.value}
        id={`${rating.value}-stars`}
        type="radio"
        onChange={onStarClick}
      />
      <label
        htmlFor={`${rating.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={rating.title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

function ReviewsForm(): JSX.Element {
  const [review, setReview] = useState({
    rating: 0,
    review: ''
  });

  const handleReviewChange: HandleChangeType = (evt) => {
    const {name, value} = evt.currentTarget;
    setReview({...review, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating) => <RatingItem key={rating.value} rating={rating} onStarClick={handleReviewChange}/>)}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleReviewChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.rating === 0 || review.review.length < 50 || review.review.length > 300}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
