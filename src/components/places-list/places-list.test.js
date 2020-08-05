import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import PlacesList from "./places-list.jsx";
import {testPlaces} from "../../test-data.js";

const testStore = configureStore([]);

describe(`PlacesList Component rendering`, () => {
  it(`renders correctly`, () => {
    const store = testStore({
      USER: {authorizationStatus: `AUTH`}
    });

    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <PlacesList
                type="cities"
                places={testPlaces}
                sortType="Popular"
                onPlaceCardNameClick={() => {}}
                onPlaceCardHover={() => {}}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
