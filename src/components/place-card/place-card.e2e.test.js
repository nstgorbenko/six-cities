import React from "react";
import {shallow} from "enzyme";

import PlaceCard from "./place-card.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlaceCard working test`, () => {
  it(`passes its id to callback when mouseEnter occur and 0 - when mouseLeave`, () => {
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
    expect(onHover).toHaveBeenCalledWith(0);
  });
});
