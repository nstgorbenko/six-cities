import React from "react";
import {mount} from "enzyme";

import Map from "./map.jsx";
import {testPlaces} from "../../test-data.js";

describe(`Map working test`, () => {
  it(`delete map after component unmount`, () => {
    const map = mount(
        <Map
          center={testPlaces[0].location}
          offers={testPlaces}
          activeOffer={testPlaces[0].id}
        />);

    const {_mapRef} = map.instance();
    map.instance().componentWillUnmount();
    expect(_mapRef.current).toBe(null);
  });

  it(`updates map when activeOffer prop changes`, () => {
    const map = mount(
        <Map
          center={testPlaces[0].location}
          offers={testPlaces}
          activeOffer={testPlaces[0].id}
        />);

    jest.spyOn(map.instance(), `_updateMap`);
    map.setProps({activeOffer: testPlaces[1].id});
    expect(map.instance()._updateMap).toHaveBeenCalledTimes(1);
  });
});
