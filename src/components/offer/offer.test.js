import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import Offer from "./offer.jsx";
import {testPlaces, testUserInfo} from "../../test-data.js";

const testStore = configureStore([]);

describe(`Offer Component rendering`, () => {
  it(`renders correctly`, () => {
    const store = testStore({
      DATA: {loadStatus: `SUCCESS`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <Offer
          authorizationStatus={`AUTH`}
          userInfo={testUserInfo}
          place={testPlaces[0]}
          allPlaces={testPlaces}
          onPlaceCardNameClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
