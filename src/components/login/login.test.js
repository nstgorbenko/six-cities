import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import Login from "./login.jsx";
import {testUserInfo} from "../../test-data.js";

const testStore = configureStore([]);

const store = testStore({
  USER: {
    authorizationStatus: `AUTH`,
    info: testUserInfo
  }
});

describe(`Login Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Login
                onSubmit={() => {}}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
