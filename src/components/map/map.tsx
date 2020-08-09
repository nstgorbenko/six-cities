import * as leaflet from 'leaflet';
import * as React from 'react';

import {LocationType, OfferType} from "../../types";
import {MarkerSettings} from "../../const";

interface Props {
  center: LocationType;
  offers: Array<OfferType>;
  activeOffer: number;
}

class Map extends React.PureComponent<Props, {}> {
  props: Props;
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: leaflet.Map;
  private markers: leaflet.LayerGroup;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.map = null;
    this.markers = null;
  }

  componentDidMount() {
    const {coordinates: center, zoom} = this.props.center;

    this.map = leaflet.map(this.mapRef.current, {
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
    if (this.props.center !== prevProps.center || this.props.activeOffer !== prevProps.activeOffer || this.props.offers !== prevProps.offers) {
      this._updateMap();
    }
  }

  componentWillUnmount() {
    this.mapRef.current.remove();
    this.map = null;
    this.markers = null;
  }

  _addMarkers() {
    const {offers, activeOffer} = this.props;

    const icon: leaflet.Icon = leaflet.icon(MarkerSettings.DEFAULT);
    const mainIcon: leaflet.Icon = leaflet.icon(MarkerSettings.ACTIVE);

    this.markers = leaflet.layerGroup();

    offers.forEach(({id, location}) => {
      const iconType: leaflet.Icon = id === activeOffer ? mainIcon : icon;
      const marker: leaflet.Marker = leaflet.marker(location.coordinates, {icon: iconType});
      marker.addTo(this.markers);
    });

    this.markers.addTo(this.map);
  }

  _removeMarkers() {
    this.markers.clearLayers();
  }

  _updateMap() {
    const {coordinates: center, zoom} = this.props.center;

    this.map.setView(center, zoom);
    this._removeMarkers();
    this._addMarkers();
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}
        ref={this.mapRef}
      />
    );
  }
}

export default Map;
