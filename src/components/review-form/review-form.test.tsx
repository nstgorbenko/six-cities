import * as React from "react";
import * as renderer from "react-test-renderer";

import {noop} from "../../utils/common";
import {ReviewForm} from "./review-form";

describe(`ReviewForm Component rendering`, () => {
  it(`renders correctly with loadStatus equal SUCCESS`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            id={1}
            rating={5}
            review={``}
            loadStatus={`SUCCESS`}
            onChange={noop}
            onReset={noop}
            onSubmit={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with loadStatus equal LOADING`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            id={1}
            rating={5}
            review={``}
            loadStatus={`LOADING`}
            onChange={noop}
            onReset={noop}
            onSubmit={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with loadStatus equal ERROR`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            id={1}
            rating={5}
            review={``}
            loadStatus={`ERROR`}
            onChange={noop}
            onReset={noop}
            onSubmit={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with loadStatus equal SUCCESS and set rating and review values`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            id={1}
            rating={5}
            review={`More than 50 characters of my review about staying in this hotel.`}
            loadStatus={`SUCCESS`}
            onChange={noop}
            onReset={noop}
            onSubmit={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
