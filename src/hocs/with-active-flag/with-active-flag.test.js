import React from "react";
import renderer from "react-test-renderer";

import withActiveFlag from "./with-active-flag.js";

const MockComponent = () => <div />;

describe(`withActiveFlag HOC rendering`, () => {
  it(`should render correctly`, () => {
    const MockComponentWrapped = withActiveFlag(MockComponent);

    const tree = renderer
      .create(<MockComponentWrapped
        isActive={false}
        onActiveChange={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
