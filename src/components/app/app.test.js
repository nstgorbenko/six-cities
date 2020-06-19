import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testOffers = [{
  id: `1`,
  name: `Stylish apartment in the citycenter`,
  type: `room`,
  description: `Located in the City Center, close to all important attractions.`,
  price: 136,
  photo: `path`,
  allPhotos: [`path`, `path`, `path`],
  bedrooms: 1,
  adults: 2,
  amenities: [`Dishwasher`, `Cabel TV`, `Fridge`],
  host: {
    name: `name`,
    avatar: `avatar path`,
    isSuper: true
  },
  rating: 4,
  isPremium: false,
  isFavorite: true,
}, {
  id: `2`,
  name: `Beautiful Van Gogh studio`,
  type: `room`,
  description: `Spacious room with very comfortable bed and private en-suite bathroom in Amsterdam's historic city centre.`,
  price: 90,
  photo: `path`,
  allPhotos: [`path`, `path`, `path`, `path`],
  bedrooms: 3,
  adults: 4,
  amenities: [`Wi-Fi`, `Washing machine`, `Towels`],
  host: {
    name: `name`,
    avatar: `avatar path`,
    isSuper: true
  },
  rating: 4,
  isPremium: true,
  isFavorite: false,
}];

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const tree = renderer
      .create(
          <App
            offers = {testOffers}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
