import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";

const testPlace = {
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
};

describe(`Offer Component rendering`, () => {
  it(`Offer Component should render correctly`, () => {
    const tree = renderer
      .create(
          <Offer
            place={testPlace}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
