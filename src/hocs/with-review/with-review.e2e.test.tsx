import * as React from "react";
import {shallow} from "enzyme";

import withReview from "./with-review";

const MockComponent = () => <div />;

describe(`withReview HOC working test`, () => {
  it(`changes state with given value and then reset it to initial`, () => {
    const MockComponentWrapped = withReview(MockComponent);

    const mockComponentWrapped = shallow(<MockComponentWrapped id={1} />);

    expect(mockComponentWrapped.props().rating).toEqual(0);

    mockComponentWrapped.props().onChange({target: {name: `rating`, value: `4`}});
    expect(mockComponentWrapped.props().rating).toEqual(4);

    mockComponentWrapped.props().onReset();
    expect(mockComponentWrapped.props().rating).toEqual(0);
  });
});
