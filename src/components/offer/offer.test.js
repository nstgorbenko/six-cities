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
  reviews: [{
    id: `501`,
    userName: `Alex`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 3.4,
    text: `Just perfect.`,
    time: `2020-03-15T22:55:56.845Z`,
  }, {
    id: `502`,
    userName: `Luke`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 5.0,
    text: `Great hospitality, and the breakfast in the morning was a nice touch.`,
    time: `2019-12-05T22:55:56.845Z`,
  }],
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
