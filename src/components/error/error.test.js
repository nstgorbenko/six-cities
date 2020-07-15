import React from "react";
import renderer from "react-test-renderer";

import Error from "./error.jsx";

describe(`Error Component rendering`, () => {
  it(`Error Component should render correctly`, () => {
    const tree = renderer
      .create(<Error />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
