import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";

import Main from "./main.jsx";
import {testCity, testCities, testPlaces, testUserInfo} from "../../test-data.js";

const testStore = configureStore([]);

describe(`Places names click test`, () => {
  it(`should be clicked`, () => {
    const onPlaceCardNameClick = jest.fn();
    const store = testStore({
      APP: {sortType: `Popular`}
    });

    const main = mount(<Provider store={store}>
      <Main
        authorizationStatus={`NO_AUTH`}
        userInfo={testUserInfo}
        activeCity={testCity}
        cities={testCities}
        offers={testPlaces}
        sortType="Popular"
        activeOffer={0}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onCityNameClick={() => {}}
        onPlaceCardHover={() => {}}
      />
    </Provider>);

    const placesNames = main.find(`.place-card__name a`);

    placesNames.forEach((name) => {
      name.simulate(`click`, {preventDefault() {}});
    });

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(placesNames.length);
  });
});
