import * as React from "react";
import {mount} from "enzyme";

import Map from "./map";
import {testPlaces} from "../../test-data";

describe(`Map working test`, () => {
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
