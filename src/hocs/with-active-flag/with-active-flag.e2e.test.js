import React from "react";
import {shallow} from "enzyme";

import withActiveFlag from "./with-active-flag.js";

const MockComponent = () => <div />;

describe(`withActiveFlag HOC working test`, () => {
  it(`changes flag state`, () => {
    const MockComponentWrapped = withActiveFlag(MockComponent);

    const mockComponentWrapped = shallow(<MockComponentWrapped />);

    expect(mockComponentWrapped.props().isActive).toEqual(false);

    mockComponentWrapped.props().onActiveChange();
    expect(mockComponentWrapped.props().isActive).toEqual(true);
  });
});
