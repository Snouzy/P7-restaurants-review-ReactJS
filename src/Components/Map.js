import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

class Map extends Component {
   Map() {
      return (
         <GoogleMap
            defaultZoom={8}
            defaultCenter={{
               lat: 48.58392,
               lng: 7.74553
            }}
         />
      );
   }
   render() {
      const WrappedMap = withScriptjs(withGoogleMap(this.Map));
      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "100vh" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

export default Map;
