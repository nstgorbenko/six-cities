import React from "react";
import {shallow} from "enzyme";

import {mapDispatchToProps, Sort} from "./sort.jsx";
import {SortType} from "../../const.js";

describe(`Sort working test`, () => {
  it(`passes sort type name to callback when user click on this name`, () => {
    const onSortTypeChange = jest.fn();
    const sortTypes = Object.assign(SortType);

    const sort = shallow(<Sort
      activeSortType="Popular"
      onSortTypeChange={onSortTypeChange}
      isActive={false}
      onActiveChange={() => {}}
    />);

    const secondSortTypeName = sort.find(`li`).at(1);
    secondSortTypeName.simulate(`click`, {target: {dataset: {sortType: sortTypes[1]}}});

    expect(onSortTypeChange).toHaveBeenCalledTimes(1);
    expect(onSortTypeChange).toHaveBeenCalledWith(sortTypes[1]);
  });
});

describe(`Sort mapDispatchToProps working test`, () => {
  it(`calls changing sort type action`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSortTypeChange(`Top rated first`);
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_SORT_TYPE`, payload: `Top rated first`});
  });
});
