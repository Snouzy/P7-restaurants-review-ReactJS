import React, { Component, useState, Fragment } from "react";
import Stars from "./Stars";
import UserIcon from "../imgs/MapMarker_PushPin_Left_Green.svg";

import {
   GoogleMap,
   withScriptjs,
   withGoogleMap,
   Marker,
   InfoWindow
} from "react-google-maps";
import _ from "lodash";
import data from "../data.json";
import { averageStars } from "../services/libs";
import styled from "styled-components";

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
      <GoogleMap defaultZoom={8} defaultCenter={coords}>
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
         {/* If the user selected a restaurant, we display the google modal : */}
         {selectedRestaurant && (
            <InfoWindow
               position={{
                  lat: selectedRestaurant.lat,
                  lng: selectedRestaurant.long
               }}
               onCloseClick={() => setSelectedRestaurant(null)} //putting the value to no restaurant selected
            >
               <div>
                  {/* Content of the InfoWindow modal */}
                  {/* Header */}
                  <h4>{selectedRestaurant.restaurantName}</h4>
                  <p>{selectedRestaurant.address}</p>
                  {/* Average rating section */}
                  <DivNoteGenerale>
                     <h5 style={{ margin: "0 10px 0 0" }}>Note générale :</h5>
                     <Stars
                        numberOfStars={averageStars(selectedRestaurant.ratings)}
                        isEditable={false}
                        size={25}
                     />
                  </DivNoteGenerale>
                  {/* User rating section */}
                  <div>
                     {selectedRestaurant.ratings.map((resto, index) => {
                        let i = index + 1; //to not start at 0
                        console.log(i);

                        return (
                           <Fragment key={resto.comment}>
                              <DivAvis>
                                 <PWrapper>Avis numéro {i} :</PWrapper>
                                 <Stars
                                    numberOfStars={resto.stars}
                                    isEditable={false}
                                    size={20}
                                 />
                              </DivAvis>

                              <p>{resto.comment}</p>

                              {/* We don't want to display an <hr /> after the last element. */}
                              {i === selectedRestaurant.ratings.length ? (
                                 ""
                              ) : (
                                 <hr />
                              )}
                           </Fragment>
                        );
                     })}
                  </div>
               </div>
            </InfoWindow>
         )}
      </GoogleMap>
   );
};

export default Map;

const PWrapper = styled.p`
   margin: 0 10px 0 0;
   font-weight: bold;
`;

const DivAvis = styled.div`
   display: flex;
   align-items: center;
   margin: 10px 0;
`;

const DivNoteGenerale = styled.div`
   display: flex;
   align-items: center;
   margin: 30px 0;
`;
