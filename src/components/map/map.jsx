import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import {offerType} from "../../types.js";

const MAP_ZOOM = 12;
const MarkerSettings = {
  DEFAULT: {
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  },
  ACTIVE: {
    iconUrl: `img/pin-active.svg`,
    iconSize: [30, 30]
  },
};

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._map = null;
    this._markers = [];
  }

  componentDidMount() {
    const {center} = this.props;
    const mapContainer = this._mapRef.current;

    this._map = leaflet.map(mapContainer, {
      center,
      zoom: MAP_ZOOM,
      zoomControl: false,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });

    this._addMarkers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center || this.props.activeOffer !== prevProps.activeOffer) {
      this._updateMap();
    }
  }

  componentWillUnmount() {
    this._map.remove();
    this._mapRef = null;
  }

  _addMarkers() {
    const {offers, activeOffer} = this.props;

    const icon = leaflet.icon(MarkerSettings.DEFAULT);
    const mainIcon = leaflet.icon(MarkerSettings.ACTIVE);

    offers.forEach(({id, location}) => {
      const iconType = id === activeOffer ? mainIcon : icon;
      const marker = leaflet.marker(location, {icon: iconType});
      marker.addTo(this._map);
      this._markers.push(marker);
    });
  }

  _removeMarkers() {
    this._markers.forEach((marker) => marker.remove());
  }

  _updateMap() {
    const {center} = this.props;

    this._map.setView(center);
    this._removeMarkers();
    this._addMarkers();
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}
        ref={this._mapRef}
      />
    );
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  activeOffer: PropTypes.string.isRequired,
};

export default Map;
