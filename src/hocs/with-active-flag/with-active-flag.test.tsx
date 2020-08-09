import * as React from "react";
import * as renderer from "react-test-renderer";

import {noop} from "../../utils/common";
import withActiveFlag from "./with-active-flag";

const MockComponent = () => <div />;

describe(`withActiveFlag HOC rendering`, () => {
  it(`renders correctly`, () => {
    const MockComponentWrapped = withActiveFlag(MockComponent);

    const tree = renderer
      .create(
          <MockComponentWrapped
            isActive={false}
            onActiveChange={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
