import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Places names click test`, () => {
  it(`Places names should be clicked`, () => {
    const onPlaceCardNameClick = jest.fn();

    const main = mount(
        <Main
          offersCount = {testOffersCount}
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
