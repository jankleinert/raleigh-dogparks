import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/App.css';
import PicsPanel from './PicsPanel'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 35.7796,
      lng: -78.6382,
      zoom: 10,
      position1: [35.7796, -78.6382],
      parks: [],
    };
    this.getMarkerData = this.getMarkerData.bind(this);
  }

  handleClick() {
    alert('this comes from app.js');
  }

  componentDidMount() {
    this.getMarkerData(this);
  }
 
  renderPicsPanel(objId) {
    return (
      <PicsPanel 
        objId={objId}
        onClick={() => this.handleClick()}
      />
    );
  }

  getMarkerData(ev) {
    axios.get('/getMarkers')
      .then(function(response) {
        ev.setState({parks: response.data.features});
      })
      .catch(error => console.log(error));
  }

  render() {
    const position = [this.state.position1[0], this.state.position1[1]];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.parks.map((features, idx) => 
          <Marker key={'marker-${idx}'} position={new Array(features.geometry.y, features.geometry.x)}>
          <Popup>
            <span class='popup-title'>{features.attributes.NAME}</span> <br/> {features.attributes.ADDRESS}
            <br/><br/>
            {this.renderPicsPanel(features.attributes.OBJECTID)}
          </Popup>
        </Marker>
        )}        
      </Map>
    );
  }
}
