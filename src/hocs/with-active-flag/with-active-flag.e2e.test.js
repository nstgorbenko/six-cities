import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveFlag from "./with-active-flag.js";

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;

describe(`withActiveFlag HOC working test`, () => {
  it(`should change flag state`, () => {
    const MockComponentWrapped = withActiveFlag(MockComponent);

    const mockComponentWrapped = shallow(<MockComponentWrapped />);

    expect(mockComponentWrapped.props().isActive).toEqual(false);

    mockComponentWrapped.props().onActiveChange();
    expect(mockComponentWrapped.props().isActive).toEqual(true);
  });
});
