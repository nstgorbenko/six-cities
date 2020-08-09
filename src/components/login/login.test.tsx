import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import Login from "./login";
import {noop} from "../../utils/common";
import {testUserInfo} from "../../test-data";

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
                onSubmit={noop}
                error={true}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
