import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as React from 'react';

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors";
import {UserType} from "../../types";

interface Props {
  authorizationStatus: string;
  userInfo: UserType;
}

const Header: React.FC<Props> = (props: Props) => {
  const {authorizationStatus, userInfo} = props;
  const isAuth: boolean = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MAIN}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {isAuth && <img src={`${userInfo.avatar}`} />}
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export {Header};
export default connect(mapStateToProps, null)(Header);
