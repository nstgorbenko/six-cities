import * as React from "react";
import * as renderer from "react-test-renderer";

import Error from "./error";

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
