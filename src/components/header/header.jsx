import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {AppRoute, ScreenType} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors.js";
import {userType} from "../../types.js";

const Header = (props) => {
  const {authorizationStatus, userInfo, goToMain, goToFavorites} = props;
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link"
              to={AppRoute.MAIN}
              onClick={goToMain}
            >
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile"
                  to={AppRoute.FAVORITES}
                  onClick={goToFavorites}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {isAuth && <img src={`https://4.react.pages.academy/six-cities${userInfo.avatar}`} />}
                  </div>
                  <span className="header__user-name user__name">{isAuth ? userInfo.email : `Sign In`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape(userType).isRequired,
  goToMain: PropTypes.func.isRequired,
  goToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export const mapDispatchToProps = (dispatch) => ({
  goToMain() {
    dispatch(AppActionCreator.changeScreenType(ScreenType.DEFAULT));
  },
  goToFavorites() {
    dispatch(AppActionCreator.changeScreenType(ScreenType.FAVORITES));
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
