import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const testInfo = {
  userName: `Alex`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 3.4,
  text: `Just perfect.`,
  time: `2020-03-15T22:55:56.845Z`,
};

describe(`Review Component rendering`, () => {
  it(`Review Component should render correctly`, () => {
    const tree = renderer
      .create(
          <Review
            info={testInfo}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
