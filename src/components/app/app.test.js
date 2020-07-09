import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import {App} from "./app.jsx";
import {testPlaces} from "../../test-data.js";

const testStore = configureStore([]);

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const store = testStore({
      sortType: `Popular`,
      onChange: () => {}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          city="Amsterdam"
          offers={testPlaces}
          sortType="Popular"
          screen="default"
          activeOffer=""
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
