import * as React from 'react';

import {getRatingPercent} from "../../utils/common";
import {formatDateToDatetime, formatDateToReviewTime} from "../../utils/date";
import {ReviewType} from "../../types";

interface Props {
  info: ReviewType;
}

const Review: React.FC<Props> = (props: Props) => {
  const {info} = props;
  const {user, rating, text, time} = info;
  const {name, avatar} = user;

  const ratingPercent: number = getRatingPercent(rating);
  const datetime: string = formatDateToDatetime(time);
  const reviewTime: string = formatDateToReviewTime(time);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{name}</span>
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

export default Review;
