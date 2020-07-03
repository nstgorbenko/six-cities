import PropTypes from "prop-types";
import React from "react";

import {reviewType} from "../../types.js";

import Review from "../review/review.jsx";

const REVIEWS_TO_SHOW = 10;

const sortReviewsByDate = (a, b) => new Date(b.time) - new Date(a.time);

const ReviewsList = (props) => {
  const {reviews} = props;

  const shownReviews = [...reviews]
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

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewType)).isRequired,
};

export default ReviewsList;
