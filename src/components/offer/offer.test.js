import React from "react";
import renderer from "react-test-renderer";

import Offer from "./offer.jsx";
import {testPlaces} from "../../test-data.js";

describe(`Offer Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<Offer
        place={testPlaces[0]}
        allPlaces={testPlaces}
        onPlaceCardNameClick={() => {}}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
