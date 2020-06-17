import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

configure({
  adapter: new Adapter()
});

const mockPlace = {
  id: `5`,
  name: `place name`,
  type: `place type`,
  price: 100,
  photo: `path`,
  rating: 5,
  isPremium: true,
  isFavorite: true,
};

describe(`PlaceCard working test`, () => {
  it(`PlaceCard pass its id to callback when mouseEnter occur and null - when mouseLeave`, () => {
    const onHover = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          place = {mockPlace}
          onNameClick = {() => {}}
          onHover = {onHover}
        />
    );

    placeCard.simulate(`mouseenter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(mockPlace.id);

    placeCard.simulate(`mouseleave`);
    expect(onHover).toHaveBeenCalledTimes(2);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
