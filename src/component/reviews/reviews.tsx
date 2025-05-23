import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReviewsForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import { fetchCommentsAction } from '../../store/api-actions';

type ReviewsProps = {
  offerId: string;
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const commentsOffers = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCommentsAction(offerId));
    }
  }, [dispatch, offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{commentsOffers.length}</span>
      </h2>
      <ReviewsList commentsOffers={commentsOffers}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

export default Reviews;
