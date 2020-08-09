import {BrowserRouter} from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import {Header} from "./header.jsx";
import {testUserInfo} from "../../test-data.js";

describe(`Header Component rendering`, () => {
  it(`renders correctly with authorizationStatus equals AUTH`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Header
              authorizationStatus={`AUTH`}
              userInfo={testUserInfo}
              goToMain={() => {}}
              goToFavorites={() => {}}
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
              goToMain={() => {}}
              goToFavorites={() => {}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
