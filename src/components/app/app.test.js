import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import {App} from "./app.jsx";
import {testCity, testCities, testPlaces} from "../../test-data.js";

const testStore = configureStore([]);

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={`default`}
          activeOffer={0}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
