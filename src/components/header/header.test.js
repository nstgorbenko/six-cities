import React from "react";
import renderer from "react-test-renderer";

import {Header} from "./header.jsx";
import {testUserInfo} from "../../test-data.js";

describe(`Header Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<Header
        authorizationStatus={`NO_AUTH`}
        userInfo={testUserInfo}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
