import React from "react";
import renderer from "react-test-renderer";

import {App} from "./app.jsx";
import {testPlaces} from "../../test-data.js";

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const tree = renderer
      .create(<App
        city="Amsterdam"
        offers={testPlaces}
        onCityChange={() => {}}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
