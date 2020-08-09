import * as React from "react";
import * as renderer from "react-test-renderer";

import ReviewsList from "./reviews-list";
import {testReviews} from "../../test-data";

describe(`ReviewsList Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews = {testReviews}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
