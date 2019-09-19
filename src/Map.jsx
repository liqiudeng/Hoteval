import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
let style = {
  width: "100%",
  height: "100%"
};
class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [{ lat: 45.5035, lng: -73.5685 }, { lat: 45.456, lng: -73.8623 }]
    };
  }
  displayMarkers = () => {
    return this.state.store.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          positin={{
            lat: store.lat,
            lng: store.lng
          }}
        />
      );
    });
  };
  render = () => {
    return (
      <Map
        style={style}
        google={this.props.google}
        zoom={8}
        initialCenter={{ lat: 45.5017, lng: -73.58781 }}
      >
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"Downtown"}
          position={{ lat: 45.5035, lng: -73.5685 }}
        />
        <Marker name={"Kirkland"} position={{ lat: 45.456, lng: -73.8623 }} />
        {/* {this.displayMarkers()} */}
        {/*  <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow> */}
      </Map>
    );
  };
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCsw3ZxEkFXwCfhfDYAiMs-RvL0C8e2Ufs"
})(LocationMap);
