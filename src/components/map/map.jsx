import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

const MAP_CENTER = [52.38333, 4.9];
const MAP_ZOOM = 12;
const MARKER_SETTINGS = {
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
};

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCity: 0
    };

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const {offers} = this.props;

    const mapContainer = this._mapRef.current;
    const map = leaflet.map(mapContainer, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });

    const icon = leaflet.icon(MARKER_SETTINGS);
    offers.forEach(({location}) => leaflet
      .marker(location, {icon})
      .addTo(map)
    );
  }

  componentWillUnmount() {
    this._mapRef = null;
  }

  render() {
    return (
      <section className="cities__map map">
        <div id="map" style={{height: `100%`}}
          ref={this._mapRef}
        />
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
