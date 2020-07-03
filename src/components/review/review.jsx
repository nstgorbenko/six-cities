import PropTypes from "prop-types";
import React from "react";

import {getRatingPercent} from "../../utils/common.js";
import {formatDateToDatetime, formatDateToReviewTime} from "../../utils/date.js";
import {reviewType} from "../../types.js";

const Review = (props) => {
  const {info} = props;
  const {userName, userAvatar, rating, text, time} = info;

  const ratingPercent = getRatingPercent(rating);
  const datetime = formatDateToDatetime(time);
  const reviewTime = formatDateToReviewTime(time);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userAvatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={datetime}>{reviewTime}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  info: PropTypes.shape(reviewType).isRequired,
};

export default Review;
