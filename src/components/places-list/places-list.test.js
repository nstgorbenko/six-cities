import React from "react";
import renderer from "react-test-renderer";

import PlacesList from "./places-list.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlacesList Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<PlacesList
        type="cities"
        places={testPlaces}
        sortType="Popular"
        onPlaceCardNameClick={() => {}}
        onPlaceCardHover={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
