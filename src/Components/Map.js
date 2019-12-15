import React, { Component } from "react";
import Stars from "./Stars";

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
   render() {
      const WrappedMap = withScriptjs(withGoogleMap(() => <RenderGoogleMap />));
      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=AIzaSyAveACnU3xguRVb0iLzM0PaDihPBih0YuQ`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

const RenderGoogleMap = () => {
   const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);

   const handleClick = index => {
      //put the selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   return (
      <GoogleMap
         defaultZoom={8}
         //Sensushi for the moment (need to replace by the center of the user)
         defaultCenter={{
            lat: 47.58612,
            lng: 7.5832
         }}
      >
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
