import {connect} from "react-redux";
import * as React from 'react';
import {Route, Redirect} from "react-router-dom";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

interface Props {
  authorizationStatus: string;
  path: string;
  exact: boolean;
  render(): React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const {authorizationStatus, path, exact, render} = props;

  return (
    <Route path={path} exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
