import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const testType = `cities`;

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
            cardType={testType}
            place={testPlace}
            onNameClick={() => {}}
            onHover={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
