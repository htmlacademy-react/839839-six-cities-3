import { CommentsType } from '../../types/comments';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewsListProps = {
  commentsOffers: CommentsType;
}

function ReviewsList({commentsOffers}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {commentsOffers?.map((comment) => <ReviewsItem key={comment.date} comment={comment}/>)}
    </ul>
  );
}

export default ReviewsList;
