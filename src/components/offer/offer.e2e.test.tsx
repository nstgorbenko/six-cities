import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import * as React from "react";

import {noop} from "../../utils/common";
import Offer from "./offer";
import {testPlaces, testReviews, testUserInfo} from "../../test-data";

const testStore = configureStore([]);
const store = testStore({
  USER: {
    authorizationStatus: `AUTH`,
    info: testUserInfo,
  },
  DATA: {
    loadStatus: `SUCCESS`,
  }
});

describe(`Offer working test`, () => {
  it(`calls add to favorite action clicking on bookmark button`, () => {
    const onAddToFavorites = jest.fn();

    const offer = mount(
        <BrowserRouter>
          <Provider store={store}>
            <Offer
              authorizationStatus={`AUTH`}
              place={testPlaces[0]}
              nearbyOffers={testPlaces}
              reviews={testReviews}
              onAddToFavorites={onAddToFavorites}
              onNearbyOffersLoad={noop}
              onReviewsLoad={noop}
              onPlaceCardHover={noop}
            />
          </Provider>
        </BrowserRouter>, {
          createNodeMock: () => document.createElement(`div`)
        });

    const bookmarkButton = offer.find(`.property__bookmark-button`).at(1);
    bookmarkButton.simulate(`click`);

    expect(onAddToFavorites).toHaveBeenCalledTimes(1);
    expect(onAddToFavorites).toHaveBeenCalledWith({
      hotelId: testPlaces[0].id,
      status: Number(!testPlaces[0].isFavorite),
    });
  });
});
