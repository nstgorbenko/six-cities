import React from "react";
import renderer from "react-test-renderer";
import Login from "./login.jsx";

describe(`Login Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <Login
            onSubmit={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
