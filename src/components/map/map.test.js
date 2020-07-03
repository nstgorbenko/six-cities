import React from "react";
import renderer from "react-test-renderer";

import Map from "./map.jsx";
import {testPlaces} from "../../test-data.js";

describe(`Map Component rendering`, () => {
  it(`Map Component should render correctly`, () => {
    const tree = renderer
      .create(<Map
        center={[53.3, 4.872]}
        offers={testPlaces}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
