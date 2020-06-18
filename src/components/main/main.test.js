import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const testOffersCount = 170;
const testOffers = [{
  id: `1`,
  name: `Stylish apartment in the citycenter`,
  type: `Private room`,
  price: 136,
  photo: `img/apartment-small-04.jpg`,
  rating: 4,
  isPremium: false,
  isFavorite: true,
}, {
  id: `2`,
  name: `Beautiful Van Gogh studio`,
  type: `Private room`,
  price: 90,
  photo: `img/room.jpg`,
  rating: 4,
  isPremium: true,
  isFavorite: false,
}];

describe(`Main Component rendering`, () => {
  it(`Main Component should render correctly`, () => {
    const tree = renderer
      .create(
          <Main
            offersCount = {testOffersCount}
            offers = {testOffers}
            onPlaceCardNameClick = {() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
