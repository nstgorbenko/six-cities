import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const testOffersCount = 170;
const testOffersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

describe(`Main Component rendering`, () => {
  it(`Main Component should render correctly`, () => {
    const tree = renderer
      .create(
          <Main
            offersCount = {testOffersCount}
            offersNames = {testOffersNames}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
