import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {App, mapDispatchToProps} from "./app";
import {noop} from "../../utils/common";
import {testCity, testCities, testPlaces, testUserInfo, testReviews} from "../../test-data";

const testStore = configureStore([]);
const store = testStore({
  APP: {sortType: `Popular`},
  DATA: {loadStatus: `SUCCESS`},
  USER: {
    authorizationStatus: `AUTH`,
    info: testUserInfo
  }
});

const testProps = {
  activeOffer: 0,
  allOffers: testPlaces,
  authorizationStatus: `AUTH`,
  cities: testCities,
  city: testCity,
  cityOffers: testPlaces,
  errorStatus: false,
  nearbyOffers: testPlaces,
  reviews: testReviews,
  sortType: `Popular`,
  onAddToFavorites: noop,
  onNearbyOffersLoad: noop,
  onReviewsLoad: noop,
  onLogin: noop,
  onActiveOfferChange: noop,
  onCityChange: noop,
};

describe(`App Component rendering`, () => {
  it(`renders correctly`, () => {
    const props = testProps;

    const tree = renderer
      .create(
          <Provider store={store}>
            <App {...props}/>
          </Provider>, {
            createNodeMock: () => document.createElement(`div`)
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe(`App mapDispatchToProps working test`, () => {
  it(`calls changing city action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onCityChange(`Paris`);
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_CITY`, payload: `Paris`});
  });

  it(`calls changing active offer action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onActiveOfferChange(15);
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_ACTIVE_OFFER`, payload: 15});
  });

  it(`calls add to favorite action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onAddToFavorites({});
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls load reviews action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onReviewsLoad(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls load nearby offers action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onNearbyOffersLoad(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls login action`, () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());

    mapDispatchToProps(dispatch).onLogin({});
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
