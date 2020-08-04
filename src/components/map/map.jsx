import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import {locationType, offerType} from "../../types.js";

const MarkerSettings = {
  DEFAULT: {
    iconUrl: `/img/pin.svg`,
    iconSize: [30, 30]
  },
  ACTIVE: {
    iconUrl: `/img/pin-active.svg`,
    iconSize: [30, 30]
  },
};

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._map = null;
    this._markers = null;
  }

  componentDidMount() {
    const {coordinates: center, zoom} = this.props.center;
    const mapContainer = this._mapRef.current;

    this._map = leaflet.map(mapContainer, {
      center,
      zoom,
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
    this._mapRef.current = null;
    this._map = null;
    this._markers = null;
  }

  _addMarkers() {
    const {offers, activeOffer} = this.props;

    const icon = leaflet.icon(MarkerSettings.DEFAULT);
    const mainIcon = leaflet.icon(MarkerSettings.ACTIVE);

    this._markers = leaflet.layerGroup();

    offers.forEach(({id, location}) => {
      const iconType = id === activeOffer ? mainIcon : icon;
      const marker = leaflet.marker(location.coordinates, {icon: iconType});
      marker.addTo(this._markers);
    });

    this._markers.addTo(this._map);
  }

  _removeMarkers() {
    this._markers.clearLayers();
  }

  _updateMap() {
    const {coordinates: center} = this.props.center;

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
  center: PropTypes.shape(locationType).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  activeOffer: PropTypes.number.isRequired,
};

export default Map;
