import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const testPlace = {
  id: `0`,
  name: `Stylish apartment in the citycenter`,
  type: `room`,
  price: 136,
  photo: `img/apartment-small-04.jpg`,
  rating: 4,
  isPremium: false,
  isFavorite: true,
};

describe(`PlaceCard Component rendering`, () => {
  it(`PlaceCard Component should render correctly`, () => {
    const tree = renderer
      .create(
          <PlaceCard
            place={testPlace}
            onNameClick={() => {}}
            onHover={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
