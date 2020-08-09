import * as React from "react";
import * as renderer from "react-test-renderer";

import {noop} from "../../utils/common";
import withReview from "./with-review";

const MockComponent = () => <div />;

describe(`withReview HOC rendering`, () => {
  it(`renders correctly`, () => {
    const MockComponentWrapped = withReview(MockComponent);

    const tree = renderer
      .create(
          <MockComponentWrapped
            id={1}
            rating={0}
            review={``}
            onChange={noop}
            onReset={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
