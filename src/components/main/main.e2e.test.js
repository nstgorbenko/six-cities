import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const testOffersCount = 170;
const testOffersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Places names click test`, () => {
  it(`Places names should be clicked`, () => {
    const onPlaceNameClick = jest.fn();

    const main = mount(
        <Main
          offersCount = {testOffersCount}
          offersNames = {testOffersNames}
          onPlaceNameClick = {onPlaceNameClick}
        />
    );

    const placesNames = main.find(`.place-card__name a`);

    placesNames.forEach((name) => {
      name.simulate(`click`, {preventDefault() {}});
    });

    expect(onPlaceNameClick).toHaveBeenCalledTimes(placesNames.length);
  });
});
