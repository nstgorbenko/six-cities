import {BrowserRouter} from "react-router-dom";
import {mount} from "enzyme";
import React from "react";

import {mapDispatchToProps, PlaceCard} from "./place-card.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlaceCard working test`, () => {
  it(`passes its id to callback when mouseEnter occur and 0 - when mouseLeave`, () => {
    const onHover = jest.fn();

    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard
            authorizationStatus={`AUTH`}
            cardType={`cities`}
            place={testPlaces[0]}
            onNameClick={() => {}}
            onHover={onHover}
            addToFavorites={() => {}}
          />
        </BrowserRouter>);

    placeCard.simulate(`mouseenter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(testPlaces[0].id);

    placeCard.simulate(`mouseleave`);
    expect(onHover).toHaveBeenCalledTimes(2);
    expect(onHover).toHaveBeenCalledWith(0);
  });
});

describe(`PlaceCard working test`, () => {
  it(`calls add to favorite action clicking on bookmark button`, () => {
    const addToFavorites = jest.fn();

    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard
            authorizationStatus={`AUTH`}
            cardType={`cities`}
            place={testPlaces[0]}
            onNameClick={() => {}}
            onHover={() => {}}
            addToFavorites={addToFavorites}
          />
        </BrowserRouter>);

    const bookmarkButton = placeCard.find(`.place-card__bookmark-button`);
    bookmarkButton.simulate(`click`);

    expect(addToFavorites).toHaveBeenCalledTimes(1);
    expect(addToFavorites).toHaveBeenCalledWith({
      hotelId: testPlaces[0].id,
      status: Number(!testPlaces[0].isFavorite),
    });
  });
});

describe(`PlaceCard working test`, () => {
  it(`calls change screen action clicking on card name`, () => {
    const onNameClick = jest.fn();

    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard
            authorizationStatus={`AUTH`}
            cardType={`cities`}
            place={testPlaces[0]}
            onNameClick={onNameClick}
            onHover={() => {}}
            addToFavorites={() => {}}
          />
        </BrowserRouter>);

    const cardNameLink = placeCard.find(`Link`);
    cardNameLink.simulate(`click`);

    expect(onNameClick).toHaveBeenCalledTimes(1);
    expect(onNameClick).toHaveBeenCalledWith(`offer`, testPlaces[0].id);
  });
});

describe(`PlaceCard mapDispatchToProps working test`, () => {
  it(`calls add to favorite action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addToFavorites({
      hotelId: testPlaces[0].id,
      status: 1,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
