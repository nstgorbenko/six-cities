import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testOffersCount = 170;
const testOffersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const tree = renderer
      .create(
          <App
            offersCount = {testOffersCount}
            offersNames = {testOffersNames}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
