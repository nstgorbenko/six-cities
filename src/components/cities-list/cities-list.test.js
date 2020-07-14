import React from "react";
import renderer from "react-test-renderer";

import CitiesList from "./cities-list.jsx";
import {testCity, testCities} from "../../test-data.js";

describe(`PlacesList Component rendering`, () => {
  it(`PlacesList Component should render correctly`, () => {
    const tree = renderer
      .create(<CitiesList
        activeCity={testCity}
        cities={testCities}
        onCityNameClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
