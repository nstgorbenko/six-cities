import * as React from "react";
import * as renderer from "react-test-renderer";

import CitiesList from "./cities-list";
import {noop} from "../../utils/common";
import {testCity, testCities} from "../../test-data";

describe(`PlacesList Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<CitiesList
        activeCity={testCity}
        cities={testCities}
        onCityNameClick={noop}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
