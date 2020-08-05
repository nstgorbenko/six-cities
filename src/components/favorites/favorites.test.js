import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import {Favorites} from "./favorites.jsx";
import {testPlaces, testUserInfo} from "../../test-data.js";

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
                onPlaceCardNameClick={() => {}}
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
                onPlaceCardNameClick={() => {}}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

