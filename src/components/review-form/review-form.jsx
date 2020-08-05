import {connect} from "react-redux";
import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";

import {getLoadStatus} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {LoadStatus} from "../../reducer/data/data.js";

const RATING_TITLES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

class ReviewForm extends PureComponent {
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
    const isDisabledInput = loadStatus === LoadStatus.LOADING;
    const isDisabledButton = rating === 0 || review.length < 50 || review.length > 300 || isDisabledInput;

    return (
      <form className="reviews__form form" action="#" method="post"
        onSubmit={this.handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RATING_TITLES.map((ratingTitle, index) => {
            const id = RATING_TITLES.length - index;
            return (
              <Fragment key={ratingTitle}>
                <input className="form__rating-input visually-hidden" name="rating" type="radio"
                  value={id}
                  id={`${id}-stars`}
                  checked={id === rating}
                  disabled={`${isDisabledInput ? `disabled` : ``}`}
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
              </Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="50"
          maxLength="300"
          value={review}
          onChange={onChange}
          disabled={`${isDisabledInput ? `disabled` : ``}`}
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={`${isDisabledButton ? `disabled` : ``}`}>Submit</button>
        </div>
        {loadStatus === LoadStatus.ERROR && <p className="reviews__text-amount">Something went wrong. Please try again later</p>}
      </form>
    );
  }
}

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  loadStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

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
