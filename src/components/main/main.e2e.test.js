import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const testOffers = [{
  id: `1`,
  location: [52.3709553943508, 4.90309666406198],
  name: `Stylish apartment in the citycenter`,
  type: `room`,
  price: 136,
  photo: `img/apartment-small-04.jpg`,
  rating: 4,
  isPremium: false,
  isFavorite: true,
}, {
  id: `2`,
  location: [52.3809553943508, 4.87309666406198],
  name: `Beautiful Van Gogh studio`,
  type: `room`,
  price: 90,
  photo: `img/room.jpg`,
  rating: 4,
  isPremium: true,
  isFavorite: false,
}];

configure({
  adapter: new Adapter()
});

describe(`Places names click test`, () => {
  it(`Places names should be clicked`, () => {
    const onPlaceCardNameClick = jest.fn();

    const main = mount(
        <Main
          offers = {testOffers}
          onPlaceCardNameClick = {onPlaceCardNameClick}
        />
    );

    const placesNames = main.find(`.place-card__name a`);

    placesNames.forEach((name) => {
      name.simulate(`click`, {preventDefault() {}});
    });

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(placesNames.length);
  });
});
