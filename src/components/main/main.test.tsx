import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import Main from "./main";
import {noop} from "../../utils/common";
import {testCity, testCities, testPlaces, testUserInfo} from "../../test-data";

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
                activeCity={testCity}
                cities={testCities}
                offers={testPlaces}
                sortType="Popular"
                activeOffer={0}
                onCityNameClick={noop}
                onPlaceCardHover={noop}
              />
            </Provider>
          </BrowserRouter>, {
            createNodeMock: () => document.createElement(`div`)
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
