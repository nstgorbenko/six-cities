import React from "react";
import {shallow} from "enzyme";

import {mapDispatchToProps, ReviewForm} from "./review-form.jsx";

describe(`ReviewForm working test`, () => {
  it(`passes review data to callback when user submit the form`, () => {
    const onSubmit = jest.fn().mockImplementation(() => Promise.resolve());
    const formSendPrevention = jest.fn();

    const reviewForm = shallow(
        <ReviewForm
          id={1}
          rating={5}
          review={`More than 50 characters of my review about staying in this hotel.`}
          loadStatus={`SUCCESS`}
          onChange={() => {}}
          onReset={() => {}}
          onSubmit={onSubmit}
        />);

    reviewForm.simulate(`submit`, {
      preventDefault: formSendPrevention
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      hotelId: 1,
      comment: `More than 50 characters of my review about staying in this hotel.`,
      rating: 5,
    });
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });
});

describe(`ReviewForm mapDispatchToProps working test`, () => {
  it(`calls post review action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmit();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
