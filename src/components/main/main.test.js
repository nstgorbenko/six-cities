import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testPlaces, testCities} from "../../test-data.js";

const testStore = configureStore([]);

describe(`Main Component rendering`, () => {
  it(`Main Component should render correctly`, () => {
    const store = testStore({
      sortType: `Popular`,
      onChange: () => {}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <Main
          activeCity="Amsterdam"
          cities={testCities}
          offers={testPlaces}
          sortType="Popular"
          activeOffer=""
          onPlaceCardNameClick={() => {}}
          onCityNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
