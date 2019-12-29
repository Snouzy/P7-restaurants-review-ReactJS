import React, { Component } from "react";
import { API_KEY } from "../../api_key";
import { MapOptions } from "./MapOptions";

import { withScriptjs, withGoogleMap } from "react-google-maps";
import _ from "lodash";
class RenderMap extends Component {
   constructor(props) {
      super(props);
      this.state = {
         coords: {} //mettre les coordonnées de paris
      };
   }

   componentDidMount() {
      this.getCurrentLocation();
   }

   getCurrentLocation() {
      if (window.navigator && window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            // console.log("latitude :", latitude, "longitude :", longitude);
            const coords = {
               lat: parseFloat(latitude),
               lng: parseFloat(longitude)
            };
            this.setState({ coords });
         });
      }
   }

   render() {
      const WrappedMap = withScriptjs(
         withGoogleMap(() => <MapOptions coords={this.state.coords} />)
      );

      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=${API_KEY}`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

export default RenderMap;
