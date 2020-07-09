import React from "react";
import renderer from "react-test-renderer";

import {Sort} from "./sort.jsx";

describe(`Sort Component rendering`, () => {
  it(`Sort Component should render correctly`, () => {
    const tree = renderer
      .create(<Sort
        activeType="Popular"
        onChange={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
