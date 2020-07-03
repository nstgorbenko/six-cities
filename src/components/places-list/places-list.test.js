import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

const testType = `cities`;

const testPlaces = [{
  id: `1`,
  name: `Stylish apartment in the citycenter`,
  type: `room`,
  price: 136,
  photo: `img/apartment-small-04.jpg`,
  rating: 4,
  isPremium: false,
  isFavorite: true,
}, {
  id: `2`,
  name: `Beautiful Van Gogh studio`,
  type: `room`,
  price: 90,
  photo: `img/room.jpg`,
  rating: 4,
  isPremium: true,
  isFavorite: false,
}];

describe(`PlacesList Component rendering`, () => {
  it(`PlacesList Component should render correctly`, () => {
    const tree = renderer
      .create(
          <PlacesList
            type={testType}
            places={testPlaces}
            onPlaceCardNameClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
