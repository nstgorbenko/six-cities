import React from "react";
import renderer from "react-test-renderer";

import Map from "./map.jsx";
import {testPlaces} from "../../test-data.js";

describe(`Map Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<Map
        center={testPlaces[0].location}
        offers={testPlaces}
        activeOffer={testPlaces[0].id}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
