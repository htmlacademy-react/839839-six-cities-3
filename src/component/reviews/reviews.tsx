import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReviewsForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import { fetchCommentsAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getComments } from '../../store/data-precess/selectors';

const MAX_REVIEWS_COUNT = 10;

type ReviewsProps = {
  offerId: string;
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const commentsOffers = useAppSelector(getComments);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCommentsAction(offerId));
    }
  }, [dispatch, offerId]);

  const displayedComments = [...commentsOffers]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

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
