import { FormEventHandler, ReactEventHandler, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchCommentsAction, postCommentAction } from '../../store/api-actions';
import { processErrorHandle } from '../../services/process-error-handle';
import { FeedbackType } from '../../types/feedback';

type RatingType = {
  value: number;
  title: string;
}

type RatingItemProps = {
  rating: RatingType;
  onStarClick: ReactEventHandler;
}

type ReviewsRatingFormProps = {
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
        defaultValue={rating.value}
        id={`${rating.value}-stars`}
        type="radio"
        onChange={onStarClick}
      />
      <label
        htmlFor={`${rating.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={rating.title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

function ReviewsRatingForm({onStarClick}: ReviewsRatingFormProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RATINGS.map((rating) =>
        <RatingItem key={rating.value} rating={rating} onStarClick={onStarClick}/>)}
    </div>
  );
}

function ReviewsForm(): JSX.Element {
  const [review, setReview] = useState<FeedbackType>({
    rating: 0,
    comment: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const isButtonDisabled = isLoading || review.rating === 0 || review.comment.length < 50 || review.comment.length > 300;

  const handleReviewChange: HandleChangeType = (evt) => {
    const {name, value} = evt.currentTarget;
    setReview({
      ...review,
      [name]: name === 'rating' ? Number(value) : value,
    });
  };

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    dispatch(postCommentAction([id, review]))
      .then(() => {
        dispatch(fetchCommentsAction(id));
        setReview({ rating: 0, comment: '' });
      })
      .catch((error) => {
        processErrorHandle(String(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleReviewFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {!isLoading && <ReviewsRatingForm onStarClick={handleReviewChange} />}
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleReviewChange}
        disabled={isLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
