import React from "react";
import renderer from "react-test-renderer";

import withReview from "./with-review.js";

const MockComponent = () => <div />;

describe(`withReview HOC rendering`, () => {
  it(`renders correctly`, () => {
    const MockComponentWrapped = withReview(MockComponent);

    const tree = renderer
      .create(<MockComponentWrapped
        rating={0}
        review={``}
        onChange={() => {}}
        onReset={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
