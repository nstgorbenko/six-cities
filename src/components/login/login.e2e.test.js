import React from "react";
import {mount} from "enzyme";

import Login from "./login.jsx";

describe(`Login working test`, () => {
  it(`passes user login data callback when user submit form`, () => {
    const onSubmit = jest.fn();

    const login = mount(
        <Login
          onSubmit={onSubmit}
        />);

    const {loginRef, passwordRef} = login.instance();
    loginRef.current = {value: `Oliver.conner@gmail.com`};
    passwordRef.current = {value: 11111};

    const form = login.find(`form`);
    form.simulate(`submit`, {preventDefault() {}});

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      login: `Oliver.conner@gmail.com`,
      password: 11111,
    });
  });
});
