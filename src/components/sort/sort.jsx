import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {SortType} from "../../const.js";

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this._handleSortListClick = this._handleSortListClick.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
  }

  _handleSortListClick() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  _handleSortTypeClick(evt) {
    const {onChange} = this.props;
    onChange(evt.target.dataset.sortType);
    this._handleSortListClick();
  }

  render() {
    const {open: isOpen} = this.state;
    const {activeType} = this.props;

    const openListClassName = isOpen ? `places__options--opened` : ``;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0"
          onClick={() => this._handleSortListClick()}
        >
          {activeType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${openListClassName}`}>
          {Object.values(SortType).map((sortType) =>
            <li tabIndex="0"
              key={sortType}
              className={`places__option ${sortType === activeType ? `places__option--active` : ``}`}
              data-sort-type={sortType}
              onClick={(evt) => this._handleSortTypeClick(evt)}
            >{sortType}</li>
          )}
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  activeType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Sort;
