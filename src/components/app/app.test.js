import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

import {App, mapDispatchToProps} from "./app.jsx";
import {testCity, testCities, testPlaces, testUserInfo} from "../../test-data.js";

const testStore = configureStore([]);

describe(`App Component rendering`, () => {
  it(`renders default screen correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authorizationStatus={`NO_AUTH`}
          userInfo={testUserInfo}
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={`default`}
          activeOffer={0}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
          login={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders offer screen correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authorizationStatus={`NO_AUTH`}
          userInfo={testUserInfo}
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={`offer`}
          activeOffer={10}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
          login={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders error screen correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authorizationStatus={`NO_AUTH`}
          userInfo={testUserInfo}
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={`error`}
          activeOffer={0}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
          login={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders login screen correctly`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authorizationStatus={`NO_AUTH`}
          userInfo={testUserInfo}
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={`login`}
          activeOffer={0}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
          login={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders null when screen value is undefined`, () => {
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authorizationStatus={`NO_AUTH`}
          userInfo={testUserInfo}
          city={testCity}
          cities={testCities}
          offers={testPlaces}
          sortType={`Popular`}
          screen={``}
          activeOffer={0}
          onCityChange={() => {}}
          onScreenChange={() => {}}
          onActiveOfferChange={() => {}}
          login={() => {}}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe(`App mapDispatchToProps working test`, () => {
  it(`calls changing user info and screen type`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).login();
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_SCREEN_TYPE`, payload: `default`});
  });

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
});
