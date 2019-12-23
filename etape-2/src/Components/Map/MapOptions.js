import React, { useState, Fragment } from "react";
//utils libs
import _ from "lodash";
import ReactStreetview from "react-streetview";
import styled from "styled-components";
//Google
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
//utils imports
import data from "../../data.json";
import { API_KEY } from "../../api_key";
//Personal imports
import { CommentForm } from "../Common/CommentForm";
import { UsersReviews } from "../UsersReviews";
import { HeaderOfTheWindowSection } from "../Header/HeaderOfTheWindowSection";
import UserIcon from "../../imgs/MapMarker_PushPin_Left_Green.svg";

export const MapOptions = props => {
   //on recoit les props de la classe Map
   const { coords } = props;
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
   const [userComment, setUserComment] = useState(null);
   const comments = [];

   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   const handleChange = e => {
      setUserComment(e.target.value);
      console.log(userComment);
   };

   // to put only 1 line on G-maps components props, like : position=formatPosition(arg)
   const formatPosition = restaurant => {
      return {
         lat: restaurant.lat,
         lng: restaurant.long
      };
   };

   const addingComment = (numberOfStars, text) => {
      comments.push({ numberOfStars, text });
   };

   console.log("Comment array : ", comments);
   return (
      <Fragment>
         <GoogleMap defaultZoom={8} defaultCenter={coords}>
            {/* display the markers */}
            {data.map((resto, index) => {
               return (
                  <Marker
                     key={resto.restaurantName}
                     position={formatPosition(resto)}
                     onClick={() => handleClick(index)}
                  />
               );
            })}
            <Marker
               key="userPosition"
               position={coords}
               icon={{
                  url: UserIcon,
                  scaledSize: new window.google.maps.Size(40, 40)
               }}
            />
            {/* If the user clicked on a restaurant, display the google window : */}
            {selectedRestaurant && (
               <InfoWindow
                  position={formatPosition(selectedRestaurant)}
                  onCloseClick={() => setSelectedRestaurant(null)} //putting the value to no restaurant selected
               >
                  {/* All the content of the InfoWindow modal */}
                  <div>
                     <HeaderOfTheWindowSection
                        selectedRestaurant={selectedRestaurant}
                     />
                     <UsersReviews selectedRestaurant={selectedRestaurant} />

                     {/* Comment Form */}
                     <CommentForm
                        changed={e => setUserComment(e.target.value)}
                     />

                     {/* google street-view */}
                     <DivStreetView>
                        <h5>Aperçu :</h5>
                        <ReactStreetview
                           apiKey={API_KEY}
                           streetViewPanoramaOptions={{
                              position: formatPosition(selectedRestaurant),
                              pov: { heading: 100, pitch: 0 },
                              zoom: 1
                           }}
                        />
                     </DivStreetView>
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      </Fragment>
   );
};

const DivStreetView = styled.div`
   width: 50rem;
   height: 400px;
   margin-top: 50px;
`;
