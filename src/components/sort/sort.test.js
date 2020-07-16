import React from "react";
import renderer from "react-test-renderer";

import {Sort} from "./sort.jsx";

describe(`Sort Component rendering`, () => {
  it(`renders correctly with isActive equal true`, () => {
    const tree = renderer
      .create(<Sort
        activeSortType="Popular"
        onSortTypeChange={() => {}}
        isActive={true}
        onActiveChange={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with isActive equal false`, () => {
    const tree = renderer
      .create(<Sort
        activeSortType="Popular"
        onSortTypeChange={() => {}}
        isActive={false}
        onActiveChange={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
