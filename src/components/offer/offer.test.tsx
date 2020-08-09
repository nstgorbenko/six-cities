import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {noop} from "../../utils/common";
import Offer from "./offer";
import {testPlaces, testReviews, testUserInfo} from "../../test-data";

const testStore = configureStore([]);

describe(`Offer Component rendering`, () => {
  it(`renders correctly`, () => {
    const store = testStore({
      USER: {
        authorizationStatus: `NO_AUTH`,
        info: testUserInfo,
      },
      DATA: {
        loadStatus: `SUCCESS`,
      },
    });

    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Offer
                authorizationStatus={`NO_AUTH`}
                place={testPlaces[0]}
                nearbyOffers={testPlaces}
                reviews={testReviews}
                onAddToFavorites={noop}
                onNearbyOffersLoad={noop}
                onReviewsLoad={noop}
                onPlaceCardHover={noop}
              />
            </Provider>
          </BrowserRouter>, {
            createNodeMock: () => document.createElement(`div`)
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly`, () => {
    const store = testStore({
      USER: {
        authorizationStatus: `AUTH`,
        info: testUserInfo,
      },
      DATA: {
        loadStatus: `SUCCESS`,
      },
    });

    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <Offer
                authorizationStatus={`AUTH`}
                place={testPlaces[1]}
                nearbyOffers={testPlaces}
                reviews={testReviews}
                onAddToFavorites={noop}
                onNearbyOffersLoad={noop}
                onReviewsLoad={noop}
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
