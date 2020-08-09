import * as React from "react";
import * as renderer from "react-test-renderer";

import {Sort} from "./sort";
import {noop} from "../../utils/common";

describe(`Sort Component rendering`, () => {
  it(`renders correctly with isActive equal true`, () => {
    const tree = renderer
      .create(
          <Sort
            activeSortType="Popular"
            onSortTypeChange={noop}
            isActive={true}
            onActiveChange={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with isActive equal false`, () => {
    const tree = renderer
      .create(
          <Sort
            activeSortType="Popular"
            onSortTypeChange={noop}
            isActive={false}
            onActiveChange={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
