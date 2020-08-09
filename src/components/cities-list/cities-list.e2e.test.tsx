import * as React from "react";
import {shallow} from "enzyme";

import CitiesList from "./cities-list";
import {testCity, testCities} from "../../test-data";

describe(`CitiesList working test`, () => {
  it(`passes city name to callback when user click on this name`, () => {
    const onClick = jest.fn();

    const citiesList = shallow(<CitiesList
      activeCity={testCity}
      cities={testCities}
      onCityNameClick={onClick}
    />);

    const secondCity = citiesList.find(`a`).at(1);
    secondCity.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(testCities[1]);
  });
});
