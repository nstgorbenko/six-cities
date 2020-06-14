import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const testName = `Beautiful & luxurious apartment at great location`;

describe(`PlaceCard Component rendering`, () => {
  it(`PlaceCard Component should render correctly`, () => {
    const tree = renderer
      .create(
          <PlaceCard
            name = {testName}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
