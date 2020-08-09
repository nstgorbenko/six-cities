import {BrowserRouter} from "react-router-dom";
import {mount} from "enzyme";
import * as React from "react";

import {CardType} from "../../const";
import {mapDispatchToProps, PlaceCard} from "./place-card";
import {noop} from "../../utils/common";
import {testPlaces} from "../../test-data";

describe(`PlaceCard working test`, () => {
  it(`passes its id to callback when mouseEnter occur and 0 - when mouseLeave`, () => {
    const onHover = jest.fn();

    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard
            authorizationStatus={`AUTH`}
            cardType={CardType.CITIES}
            place={testPlaces[0]}
            onHover={onHover}
            onAddToFavorites={noop}
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
    const onAddToFavorites = jest.fn();

    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard
            authorizationStatus={`AUTH`}
            cardType={CardType.CITIES}
            place={testPlaces[0]}
            onHover={noop}
            onAddToFavorites={onAddToFavorites}
          />
        </BrowserRouter>);

    const bookmarkButton = placeCard.find(`.place-card__bookmark-button`);
    bookmarkButton.simulate(`click`);

    expect(onAddToFavorites).toHaveBeenCalledTimes(1);
    expect(onAddToFavorites).toHaveBeenCalledWith({
      hotelId: testPlaces[0].id,
      status: Number(!testPlaces[0].isFavorite),
    });
  });
});

describe(`PlaceCard mapDispatchToProps working test`, () => {
  it(`calls add to favorite action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onAddToFavorites({
      hotelId: testPlaces[0].id,
      status: 1,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
