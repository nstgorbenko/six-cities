import React from "react";
import renderer from "react-test-renderer";

import ReviewsList from "./reviews-list.jsx";
import {testReviews} from "../../test-data.js";

describe(`ReviewsList Component rendering`, () => {
  it(`ReviewsList Component should render correctly`, () => {
    const tree = renderer
      .create(<ReviewsList
        reviews = {testReviews}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
