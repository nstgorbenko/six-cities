import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator} from "../../reducer/app/app.js";
import {getSortType} from "../../reducer/app/selectors.js";
import {SortType} from "../../const.js";


class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this._handleSortItemClick = this._handleSortItemClick.bind(this);
  }

  _handleSortItemClick(evt) {
    const {onSortTypeChange, onActiveChange: onMenuToggle} = this.props;

    onSortTypeChange(evt.target.dataset.sortType);
    onMenuToggle();
  }

  render() {
    const {activeSortType, isActive: isMenuOpen, onActiveChange: onMenuToggle} = this.props;

    const openListClassName = isMenuOpen ? `places__options--opened` : ``;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0"
          onClick={onMenuToggle}
        >
          {activeSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${openListClassName}`}>
          {Object.values(SortType).map((sortType) =>
            <li tabIndex="0"
              key={sortType}
              className={`places__option ${sortType === activeSortType ? `places__option--active` : ``}`}
              data-sort-type={sortType}
              onClick={(evt) => this._handleSortItemClick(evt)}
            >{sortType}</li>
          )}
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActiveChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeSortType: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
