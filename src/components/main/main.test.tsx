import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testCity, testCities, testPlaces, testUserInfo} from "../../test-data.js";

const testStore = configureStore([]);

describe(`Main Component rendering`, () => {
  it(`renders correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`},
      USER: {
        authorizationStatus: `AUTH`,
        info: testUserInfo
      }
    });

    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Main
                authorizationStatus={`NO_AUTH`}
                userInfo={testUserInfo}
                activeCity={testCity}
                cities={testCities}
                offers={testPlaces}
                sortType="Popular"
                activeOffer={0}
                onPlaceCardNameClick={() => {}}
                onCityNameClick={() => {}}
                onPlaceCardHover={() => {}}
              />
            </Provider>
          </BrowserRouter>, {
            createNodeMock: () => document.createElement(`div`)
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
