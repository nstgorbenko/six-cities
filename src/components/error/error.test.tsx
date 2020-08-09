import React from "react";
import renderer from "react-test-renderer";

import Error from "./error.jsx";

describe(`Error Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <Error
            text={[`Oops!`, `Something went wrong.`]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
