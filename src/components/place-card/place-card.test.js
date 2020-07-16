import React from "react";
import renderer from "react-test-renderer";

import PlaceCard from "./place-card.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlaceCard Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<PlaceCard
        cardType="cities"
        place={testPlaces[0]}
        onNameClick={() => {}}
        onHover={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
