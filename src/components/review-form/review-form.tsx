import {connect} from "react-redux";
import * as React from 'react';

import {getLoadStatus} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import {LoadStatus} from "../../reducer/data/data";
import {RATING_TITLES, ReviewLength} from "../../const";

interface Props {
  id: number;
  rating: number;
  review: string;
  loadStatus: string;
  onChange(): void;
  onReset(): void;
  onSubmit(reviewData: {
    hotelId: number;
    comment: string;
    rating: number;
  }): Promise<void>;
}

class ReviewForm extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {id, rating, review, loadStatus, onSubmit, onReset} = this.props;

    evt.preventDefault();
    onSubmit({
      hotelId: id,
      comment: review,
      rating,
    })
    .then(() => {
      if (loadStatus === LoadStatus.SUCCESS) {
        onReset();
      }
    });
  }

  render() {
    const {rating, review, loadStatus, onChange} = this.props;
    const isDisabledInput: boolean = loadStatus === LoadStatus.LOADING;
    const isDisabledButton: boolean = rating === 0 || review.length < ReviewLength.MIN || review.length > ReviewLength.MAX || isDisabledInput;

    return (
      <form className="reviews__form form" action="#" method="post"
        onSubmit={this.handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RATING_TITLES.map((ratingTitle, index) => {
            const id: number = RATING_TITLES.length - index;
            return (
              <React.Fragment key={ratingTitle}>
                <input className="form__rating-input visually-hidden" name="rating" type="radio"
                  value={id}
                  id={`${id}-stars`}
                  checked={id === rating}
                  disabled={isDisabledInput}
                  onChange={onChange}
                />
                <label className="reviews__rating-label form__rating-label"
                  htmlFor={`${id}-stars`}
                  title={ratingTitle}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
          minLength={ReviewLength.MIN}
          maxLength={ReviewLength.MAX}
          value={review}
          onChange={onChange}
          disabled={isDisabledInput}
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledButton}>Submit</button>
        </div>
        {loadStatus === LoadStatus.ERROR && <p className="reviews__text-amount error-message">Something went wrong. Please try again later</p>}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loadStatus: getLoadStatus(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onSubmit(reviewData) {
    return dispatch(DataOperation.postReview(reviewData));
  }
});

export {ReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
