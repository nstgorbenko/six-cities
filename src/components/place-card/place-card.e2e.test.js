import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PlaceCard from "./place-card.jsx";
import {testPlaces} from "../../test-data.js";

configure({
  adapter: new Adapter()
});

describe(`PlaceCard working test`, () => {
  it(`PlaceCard pass its id to callback when mouseEnter occur and null - when mouseLeave`, () => {
    const onHover = jest.fn();

    const placeCard = shallow(<PlaceCard
      cardType="cities"
      place = {testPlaces[0]}
      onNameClick = {() => {}}
      onHover = {onHover}
    />);

    placeCard.simulate(`mouseenter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(testPlaces[0].id);

    placeCard.simulate(`mouseleave`);
    expect(onHover).toHaveBeenCalledTimes(2);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
