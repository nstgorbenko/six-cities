import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import {App, mapDispatchToProps} from "./app.jsx";
import {testCity, testCities, testPlaces, testUserInfo, testReviews} from "../../test-data.js";

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
  nearbyOffers: testPlaces,
  reviews: testReviews,
  screen: `default`,
  sortType: `Popular`,
  addToFavorites: () => {},
  loadNearbyOffers: () => {},
  loadReviews: () => {},
  login: () => {},
  onActiveOfferChange: () => {},
  onCityChange: () => {},
  onScreenChange: () => {},
};

describe(`App Component rendering`, () => {
  it(`renders default screen correctly`, () => {
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

  it(`calls changing screen type and active offer action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onScreenChange(`offer`, 15);
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_ACTIVE_OFFER`, payload: 15});
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_SCREEN_TYPE`, payload: `offer`});
  });

  it(`calls add to favorite action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addToFavorites();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls load reviews action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).loadReviews();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls load nearby offers action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).loadNearbyOffers();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it(`calls login action`, () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());

    mapDispatchToProps(dispatch).login();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
