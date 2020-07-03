import React from "react";
import renderer from "react-test-renderer";

import Review from "./review.jsx";
import {testReviews} from "../../test-data.js";

describe(`Review Component rendering`, () => {
  it(`Review Component should render correctly`, () => {
    const tree = renderer
      .create(<Review
        info={testReviews[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
