import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";

const Screen = {
  DEFAULT: `default`,
  OFFER: `offer`
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: Screen.DEFAULT,
      id: ``
    };

    this._handlePlaceCardNameClick = this._handlePlaceCardNameClick.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp}
          </Route>
          <Route exact path="/offer">
            <Offer
              place={offers[0]}
              nearbyPlaces={offers.slice(1, 4)}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _handlePlaceCardNameClick(id) {
    this.setState({
      screen: `offer`,
      id
    });
  }

  _renderApp() {
    const {offers} = this.props;

    switch (this.state.screen) {
      case Screen.DEFAULT:
        return (
          <Main
            offers={offers}
            onPlaceCardNameClick={this._handlePlaceCardNameClick}
          />
        );
      case Screen.OFFER:
        const offerIndex = offers.findIndex(({id}) => id === this.state.id);
        const nearbyPlaces = [...offers.slice(0, offerIndex), ...offers.slice(offerIndex + 1)];

        return (
          <Offer
            place={offers[offerIndex]}
            nearbyPlaces={nearbyPlaces}
          />
        );
      default:
        return null;
    }
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
