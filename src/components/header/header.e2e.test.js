import {mapDispatchToProps} from "./header.jsx";

describe(`Header mapDispatchToProps working test`, () => {
  it(`calls change screen action to default`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).goToMain();
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_SCREEN_TYPE`, payload: `default`});
  });

  it(`calls change screen action to favorites`, () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).goToFavorites();
    expect(dispatch).toHaveBeenCalledWith({type: `CHANGE_SCREEN_TYPE`, payload: `favorites`});
  });
});
