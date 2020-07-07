import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CitiesList from "./cities-list.jsx";
import {testCities} from "../../test-data.js";

configure({
  adapter: new Adapter()
});

describe(`CitiesList working test`, () => {
  it(`CitiesList pass city name to callback when user click on this name`, () => {
    const onClick = jest.fn();

    const citiesList = shallow(<CitiesList
      activeCity="Paris"
      cities={testCities}
      onCityNameClick={onClick}
    />);

    const secondCity = citiesList.find(`a`).at(1);
    secondCity.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(testCities[1]);
  });
});
