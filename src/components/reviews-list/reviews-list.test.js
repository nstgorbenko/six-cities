import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

const testReviews = [{
  id: `501`,
  userName: `Alex`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 3.4,
  text: `Just perfect.`,
  time: `2020-03-15T22:55:56.845Z`,
}, {
  id: `502`,
  userName: `Luke`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 5.0,
  text: `Great hospitality, and the breakfast in the morning was a nice touch.`,
  time: `2019-12-05T22:55:56.845Z`,
}];

describe(`ReviewsList Component rendering`, () => {
  it(`ReviewsList Component should render correctly`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews = {testReviews}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
