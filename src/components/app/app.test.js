import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testOffers = [{
  id: `1`,
  location: [52.3709553943508, 4.90309666406198],
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
    id: `11`,
    userName: `Alex`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 3.4,
    text: `Just perfect.`,
    time: `2020-03-15T22:55:56.845Z`,
  }, {
    id: `12`,
    userName: `Luke`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 5.0,
    text: `Great hospitality, and the breakfast in the morning was a nice touch.`,
    time: `2019-12-05T22:55:56.845Z`,
  }],
  isPremium: false,
  isFavorite: true,
}, {
  id: `2`,
  location: [52.3809553943508, 4.87309666406198],
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
  reviews: [{
    id: `21`,
    userName: `Egor`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 3.9,
    text: `The apartment itself is cozy, quite and clean, moreover it has everything you need.`,
    time: `2019-08-15T22:55:56.845Z`,
  }, {
    id: `22`,
    userName: `Matt`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 4.7,
    text: `Amazing hosts, close to metro and the ferry, really clean and quiet attic room. Couldn’t ask for a better spot!`,
    time: `2019-10-05T22:55:56.845Z`,
  }],
  isPremium: true,
  isFavorite: false,
}];

describe(`App Component rendering`, () => {
  it(`App Component should render correctly`, () => {
    const tree = renderer
      .create(<App
        offers = {testOffers}
      />, {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
