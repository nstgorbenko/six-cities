import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";
import {testPlaces, testCities} from "../../test-data.js";

configure({
  adapter: new Adapter()
});

describe(`Places names click test`, () => {
  it(`Places names should be clicked`, () => {
    const onPlaceCardNameClick = jest.fn();

    const main = mount(<Main
      activeCity="Amsterdam"
      cities={testCities}
      offers = {testPlaces}
      sortType="Popular"
      onPlaceCardNameClick={onPlaceCardNameClick}
      onCityNameClick={() => {}}
      onSortTypeChange={() => {}}
    />);

    const placesNames = main.find(`.place-card__name a`);

    placesNames.forEach((name) => {
      name.simulate(`click`, {preventDefault() {}});
    });

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(placesNames.length);
  });
});
