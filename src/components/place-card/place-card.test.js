import {BrowserRouter} from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import {PlaceCard} from "./place-card.jsx";
import {testPlaces} from "../../test-data.js";

describe(`PlaceCard Component rendering`, () => {
  it(`renders correctly with cities cardType`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PlaceCard
              authorizationStatus={`AUTH`}
              cardType={`cities`}
              place={testPlaces[1]}
              onNameClick={() => {}}
              onHover={() => {}}
              addToFavorites={() => {}}
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
              cardType={`favorites`}
              place={testPlaces[1]}
              onNameClick={() => {}}
              onHover={() => {}}
              addToFavorites={() => {}}
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
              cardType={`cities`}
              place={testPlaces[0]}
              onNameClick={() => {}}
              onHover={() => {}}
              addToFavorites={() => {}}
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
              cardType={`near-places`}
              place={testPlaces[1]}
              onNameClick={() => {}}
              onHover={() => {}}
              addToFavorites={() => {}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
