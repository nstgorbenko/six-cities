import * as React from "react";
import * as renderer from "react-test-renderer";

import Review from "./review";
import {testReviews} from "../../test-data";

describe(`Review Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <Review
            info={testReviews[0]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
