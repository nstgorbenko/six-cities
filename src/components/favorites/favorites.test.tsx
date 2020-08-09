import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {Favorites} from "./favorites";
import {noop} from "../../utils/common";
import {testPlaces, testUserInfo} from "../../test-data";

const testStore = configureStore([]);

const store = testStore({
  USER: {
    authorizationStatus: `AUTH`,
    info: testUserInfo
  }
});

describe(`Favorites Component rendering`, () => {
  it(`renders correctly with offers array`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Favorites
                offers={testPlaces}
                onPlaceCardHover={noop}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with empty offers array`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Favorites
                offers={[]}
                onPlaceCardHover={noop}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

