import React, { useState, Fragment } from "react";
//utils libs
import Stars from "../Common/Stars";
import _ from "lodash";
import ReactStreetview from "react-streetview";
//Google
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
//utils imports
import data from "../../data.json";
import styled from "styled-components";
import { API_KEY } from "../../api_key";
//Personal imports
import { CommentForm } from "../Common/CommentForm";
import { averageStars } from "../../services/libs";
import UserIcon from "../../imgs/MapMarker_PushPin_Left_Green.svg";

export const MapOptions = props => {
   //on recoit les props de la classe Map
   const { coords } = props;

   const [inputValue, setInputValue] = useState({});
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   return (
      <Fragment>
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
                        <h5 style={{ margin: "0 10px 0 0" }}>
                           Note générale :
                        </h5>
                        <Stars
                           numberOfStars={averageStars(
                              selectedRestaurant.ratings
                           )}
                           isEditable={false}
                           size={25}
                        />
                     </DivNoteGenerale>
                     {/* User rating section */}
                     <div>
                        {selectedRestaurant.ratings.map((resto, index) => {
                           let i = index + 1; //to not start at 0

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
                     {/* Comment Form */}
                     <div>
                        <CommentForm />
                     </div>

                     <div
                        style={{
                           width: "50rem",
                           height: "400px",
                           marginTop: "50px"
                        }}
                     >
                        <h5>Aperçu :</h5>
                        <ReactStreetview
                           apiKey={API_KEY}
                           streetViewPanoramaOptions={{
                              position: {
                                 lat: selectedRestaurant.lat,
                                 lng: selectedRestaurant.long
                              },
                              pov: { heading: 100, pitch: 0 },
                              zoom: 1
                           }}
                        />
                     </div>
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      </Fragment>
   );
};

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
