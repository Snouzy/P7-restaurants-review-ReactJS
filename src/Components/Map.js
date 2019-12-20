import React, { Component, useState } from "react";
import Stars from "./Stars";
import UserIcon from "../imgs/MapMarker_PushPin_Left_Green.svg";

import {
   GoogleMap,
   withScriptjs,
   withGoogleMap,
   Marker,
   InfoWindow
} from "react-google-maps";

import data from "../data.json";
import { averageStars } from "../services/libs";

class Map extends Component {
   constructor(props) {
      super(props);
      this.state = {
         coords: {}
      };
   }

   componentDidMount() {
      this.getCurrentLocation();
   }

   getCurrentLocation() {
      if (window.navigator && window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            console.log("latitude :", latitude, "longitude :", longitude);
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
         withGoogleMap(() => <RenderGoogleMap coords={this.state.coords} />)
      );

      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

//Child component
const RenderGoogleMap = props => {
   //on recoit les props de la classe Map
   const { coords } = props;
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const handleClick = index => {
      //put the selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   return (
      <GoogleMap
         defaultZoom={8}
         //Sensushi for the moment (need to replace by the center of the user)
         defaultCenter={coords}
      >
         {/* display the markers */}
         {data.map((resto, index) => {
            return (
               <Marker
                  key={resto.restaurantName}
                  position={{
                     lat: resto.lat,
                     lng: resto.long
                  }}
                  onClick={() => handleClick(index)}
               />
            );
         })}
         <Marker
            key="positionUser"
            position={coords}
            icon={{
               url: UserIcon,
               scaledSize: new window.google.maps.Size(40, 40)
            }}
         />
         {selectedRestaurant && (
            <InfoWindow
               position={{
                  lat: selectedRestaurant.lat,
                  lng: selectedRestaurant.long
               }}
               onCloseClick={() => setSelectedRestaurant(null)}
            >
               <div>
                  <h4>{selectedRestaurant.restaurantName}</h4>
                  <p>{selectedRestaurant.address}</p>
                  <Stars
                     numberOfStars={averageStars(selectedRestaurant.ratings)}
                  />
               </div>
            </InfoWindow>
         )}
      </GoogleMap>
   );
};

export default Map;
