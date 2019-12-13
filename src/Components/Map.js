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

class Map extends Component {
   state = {
      selectedRestaurant: null
   };

   handleClick(index) {
      //put the selectedRestaurant into the state
      this.setState({ selectedRestaurant: data[index] });
   }

   // avoid to re render at each click on the marker
   // shouldComponentUpdate(nextProps, nextState) {

   // }

   Map = () => {
      return (
         <GoogleMap
            defaultZoom={8}
            //Sensushi for the moment
            defaultCenter={{
               lat: 47.59283,
               lng: 7.58389
            }}
         >
            {data.map((resto, index) => {
               return (
                  <Marker
                     key={resto.restaurantName}
                     position={{ lat: resto.lat, lng: resto.long }}
                     onClick={() => this.handleClick(index)}
                  />
               );
            })}

            {this.state.selectedRestaurant && (
               <InfoWindow
                  position={{
                     lat: this.state.selectedRestaurant.lat,
                     lng: this.state.selectedRestaurant.long
                  }}
                  onCloseClick={() => {
                     //is not reloading when i comment the followed line :
                     // this.setState({ selectedRestaurant: null });
                  }}
               >
                  <div>
                     <h4>{this.state.selectedRestaurant.restaurantName}</h4>
                     <p>{this.state.selectedRestaurant.address}</p>
                     <Stars numberOfStars={this.state.selectedRestaurant} />
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      );
   };
   render() {
      const WrappedMap = withScriptjs(withGoogleMap(this.Map));
      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAveACnU3xguRVb0iLzM0PaDihPBih0YuQ`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

export default Map;
