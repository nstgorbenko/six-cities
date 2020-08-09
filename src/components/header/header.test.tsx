import {BrowserRouter} from "react-router-dom";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {Header} from "./header";
import {testUserInfo} from "../../test-data";

describe(`Header Component rendering`, () => {
  it(`renders correctly with authorizationStatus equals AUTH`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Header
              authorizationStatus={`AUTH`}
              userInfo={testUserInfo}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with authorizationStatus equals NO_AUTH`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Header
              authorizationStatus={`NO_AUTH`}
              userInfo={testUserInfo}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
