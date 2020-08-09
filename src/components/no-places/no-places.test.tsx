import * as React from "react";
import * as renderer from "react-test-renderer";

import NoPlaces from "./no-places";

describe(`NoPlaces Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <NoPlaces
            activeCity="Amsterdam"
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
