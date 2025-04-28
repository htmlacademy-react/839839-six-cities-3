import { AuthorizationStatus } from '../../const';
import { comments } from '../../mocks/comments';
import { CommentsType, CommentType } from '../../types/comments';
import { getRatingPercentage } from '../../utils/utils';
import ReviewsForm from '../review-form/review-form';

type ReviewsProps = {
  offerId: string;
  authorizationStatus: AuthorizationStatus;
}

type ReviewsItemProps = {
  comment: CommentType;
}

function ReviewsItem ({comment}: ReviewsItemProps): JSX.Element {
  const dateReview = new Date(comment.date);
  const nameMonth = dateReview.toLocaleString('en-US', { month: 'long' });
  const fullYear = dateReview.getFullYear();
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingPercentage(comment.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={dateReview.toISOString()}>
          {`${nameMonth} ${fullYear}`}
        </time>
      </div>
    </li>
  );
}

function Reviews ({offerId, authorizationStatus}: ReviewsProps): JSX.Element {
  const commentsOffers: CommentsType = comments.filter((comment) => comment.id === offerId);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsOffers.length}</span></h2>
      <ul className="reviews__list">
        {commentsOffers?.map((comment) => <ReviewsItem key={comment.date} comment={comment}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

export default Reviews;
