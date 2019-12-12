import React, { Component } from "react";
import {
   GoogleMap,
   withScriptjs,
   withGoogleMap,
   Marker
} from "react-google-maps";
import data from "../data.json";
class Map extends Component {
   state = {
      selectedPark: null
   }

   handleClick(restaurant) {
      
   }

   Map = () => {
      return (
         <GoogleMap
            defaultZoom={8}
            //Strasbourg
            defaultCenter={{
               lat: 48.58392,
               lng: 7.74553
            }}
         >
            {data.map(resto => (
               <Marker
                  key={resto.restaurantName}
                  position={{ lat: resto.lat, lng: resto.long }}
                  onClick={() => this.handleClick()}
               />
            ))}
         </GoogleMap>
      );
   }
   render() {
      const WrappedMap = withScriptjs(withGoogleMap(this.Map));
      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
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
