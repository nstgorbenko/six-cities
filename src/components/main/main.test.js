import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testPlaces} from "../../test-data.js";

describe(`Main Component rendering`, () => {
  it(`Main Component should render correctly`, () => {
    const tree = renderer
      .create(<Main
        offers = {testPlaces}
        onPlaceCardNameClick = {() => {}}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
