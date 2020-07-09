import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {Sort} from "./sort.jsx";
import {SortType} from "../../const.js";

configure({
  adapter: new Adapter()
});

describe(`Sort working test`, () => {
  it(`Sort pass sort type name to callback when user click on this name`, () => {
    const onChange = jest.fn();
    const sortTypes = Object.assign(SortType);

    const sort = shallow(<Sort
      activeType="Popular"
      onChange={onChange}
    />);

    const secondSortTypeName = sort.find(`li`).at(1);
    secondSortTypeName.simulate(`click`, {target: {dataset: {sortType: sortTypes[1]}}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(sortTypes[1]);
  });
});
