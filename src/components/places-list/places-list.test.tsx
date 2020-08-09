import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as React from "react";
import * as renderer from "react-test-renderer";

import {CardType} from "../../const";
import {noop} from "../../utils/common";
import PlacesList from "./places-list";
import {testPlaces} from "../../test-data";

const testStore = configureStore([]);

describe(`PlacesList Component rendering`, () => {
  it(`renders correctly`, () => {
    const store = testStore({
      USER: {authorizationStatus: `AUTH`}
    });

    const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <PlacesList
                type={CardType.CITIES}
                places={testPlaces}
                sortType="Popular"
                onPlaceCardHover={noop}
              />
            </Provider>
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
