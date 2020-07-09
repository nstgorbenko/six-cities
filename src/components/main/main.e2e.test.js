import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";

import Main from "./main.jsx";
import {testPlaces, testCities} from "../../test-data.js";

configure({
  adapter: new Adapter()
});

const testStore = configureStore([]);

describe(`Places names click test`, () => {
  it(`Places names should be clicked`, () => {
    const onPlaceCardNameClick = jest.fn();
    const store = testStore({
      sortType: `Popular`,
      onChange: () => {}
    });

    const main = mount(<Provider store={store}>
      <Main
        activeCity="Amsterdam"
        cities={testCities}
        offers={testPlaces}
        sortType="Popular"
        activeOffer=""
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
