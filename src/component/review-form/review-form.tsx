import { ChangeEvent, FormEventHandler, Fragment, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { processErrorHandle } from '../../services/process-error-handle';
import { getCommentFormDisabledStatus } from '../../store/data-precess/selectors';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const DEFAULT_RATING = 0;

type RatingType = {
  value: number;
  title: string;
}

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

function ReviewsForm(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedRating, setCheckedRating] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(getCommentFormDisabledStatus);
  const {id} = useParams();

  const isRatingSelected = rating !== DEFAULT_RATING;
  const isCommentValid = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
  const isButtonDisabled = isLoading || !isRatingSelected || !isCommentValid;

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setRating(Number(evt.target.value));
  };

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (!id || isButtonDisabled) {
      return;
    }

    setIsLoading(true);
    dispatch(postCommentAction({
      offerId: id,
      comment: comment,
      rating: rating,
    }))
      .unwrap()
      .then(() => {
        setComment('');
        setRating(DEFAULT_RATING);
        formRef.current?.reset();
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
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleReviewFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {RATINGS.map((grade) => (
          <Fragment key={grade.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={grade.value}
              checked={rating === grade.value}
              id={`${grade.value}-stars`}
              type="radio"
              onChange={handleRatingButtonClick}
              disabled={isLoading}
            />
            <label
              htmlFor={`${grade.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={grade.title}
              onMouseEnter={() => setCheckedRating(grade.value)}
              onMouseLeave={() => setCheckedRating(DEFAULT_RATING)}
            >
              <svg
                className="form__star-image"
                width={37}
                height={33}
                style={{ fill: (grade.value <= (checkedRating || rating)) ? '#ff9000' : '#c7c7c7' }}
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleReviewChange}
        disabled={disabled || isLoading}
        minLength={MIN_COMMENT_LENGTH}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disabled || isButtonDisabled}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
