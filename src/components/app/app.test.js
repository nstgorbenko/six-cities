import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testOffersCount = 170;
const testOffers = [{
  name: `Stylish apartment in the citycenter`,
  type: `Private room`,
  price: 136,
  photo: `img/apartment-small-04.jpg`,
  rating: 4,
  isPremium: false,
  isFavorite: true,
}, {
  name: `Beautiful Van Gogh studio`,
  type: `Private room`,
  price: 90,
  photo: `img/room.jpg`,
  rating: 4,
  isPremium: true,
  isFavorite: false,
}];

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const tree = renderer
      .create(
          <App
            offersCount = {testOffersCount}
            offers = {testOffers}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
