import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import ReviewsForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getComments } from '../../store/data-precess/selectors';

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 10;

function Reviews(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const commentsOffers = useAppSelector(getComments);

  const displayedComments = commentsOffers.slice(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{commentsOffers.length}</span>
      </h2>
      <ReviewsList commentsOffers={displayedComments}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

export default Reviews;
