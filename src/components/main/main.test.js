import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testPlaces, testCities} from "../../test-data.js";

describe(`Main Component rendering`, () => {
  it(`Main Component should render correctly`, () => {
    const tree = renderer
      .create(<Main
        activeCity="Amsterdam"
        cities={testCities}
        offers = {testPlaces}
        onPlaceCardNameClick = {() => {}}
        onCityNameClick = {() => {}}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
