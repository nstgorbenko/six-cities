import {BrowserRouter} from "react-router-dom";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {CardType} from "../../const";
import {noop} from "../../utils/common";
import {PlaceCard} from "./place-card";
import {testPlaces} from "../../test-data";

describe(`PlaceCard Component rendering`, () => {
  it(`renders correctly with cities cardType`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PlaceCard
              authorizationStatus={`AUTH`}
              cardType={CardType.CITIES}
              place={testPlaces[1]}
              onHover={noop}
              onAddToFavorites={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with favorites cardType`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PlaceCard
              authorizationStatus={`AUTH`}
              cardType={CardType.FAVORITES}
              place={testPlaces[1]}
              onHover={noop}
              onAddToFavorites={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with cities cardType`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PlaceCard
              authorizationStatus={`AUTH`}
              cardType={CardType.CITIES}
              place={testPlaces[0]}
              onHover={noop}
              onAddToFavorites={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with near-places cardType`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PlaceCard
              authorizationStatus={`AUTH`}
              cardType={CardType.NEAR_PLACES}
              place={testPlaces[1]}
              onHover={noop}
              onAddToFavorites={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
