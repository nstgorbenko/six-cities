import * as React from 'react';

import Review from "../review/review";
import {REVIEWS_TO_SHOW} from "../../const";
import {ReviewType} from "../../types";

interface Props {
  reviews: Array<ReviewType>;
}

const ReviewsList: React.FC<Props> = (props: Props) => {
  const {reviews} = props;

  const sortReviewsByDate = (a: ReviewType, b: ReviewType): number => new Date(b.time).getTime() - new Date(a.time).getTime();
  const shownReviews: Array<ReviewType> = [...reviews]
    .sort(sortReviewsByDate)
    .slice(0, REVIEWS_TO_SHOW);

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {shownReviews.map((review) =>
          <Review
            key={review.id}
            info={review}
          />
        )}
      </ul>
    </React.Fragment>
  );
};

export default ReviewsList;
