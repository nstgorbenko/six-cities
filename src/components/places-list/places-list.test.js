import React from "react";
import renderer from "react-test-renderer";

import PlacesList from "./places-list.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlacesList Component rendering`, () => {
  it(`PlacesList Component should render correctly`, () => {
    const tree = renderer
      .create(<PlacesList
        type="cities"
        places={testPlaces}
        onPlaceCardNameClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
