import { AuthorizationStatus } from '../../const';
import { comments } from '../../mocks/comments';
import { CommentsType } from '../../types/comments';
import ReviewsForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewsProps = {
  offerId: string;
  authorizationStatus: AuthorizationStatus;
}

function Reviews ({offerId, authorizationStatus}: ReviewsProps): JSX.Element {
  const commentsOffers: CommentsType = comments.filter((comment) => comment.id === offerId);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsOffers.length}</span></h2>
      <ReviewsList commentsOffers={commentsOffers}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

export default Reviews;
