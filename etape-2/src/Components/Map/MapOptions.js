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
import { UserReview } from "../UserReview";
import { HeaderOfTheWindowSection } from "../Header/HeaderOfTheWindowSection";
import UserIcon from "../../imgs/MapMarker_PushPin_Left_Green.svg";

export const MapOptions = props => {
   //on recoit les props de la classe Map
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
   const [userComment, setUserComment] = useState("");
   const [notation, setNotation] = React.useState(null);
   const [isSend, setSending] = React.useState(false);

   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   // to put only 1 line on G-maps components props, like : position=formatPosition(arg)
   const formatPosition = restaurant => {
      return {
         lat: restaurant.lat,
         lng: restaurant.long
      };
   };
   const handleSend = () => {
      if (notation !== null && userComment !== "") {
         selectedRestaurant.ratings.push({
            stars: notation,
            comment: userComment
         });
         setSending(true); //force re-rendering to display the comment

         //restoring the inital state
         setNotation(null);
         setUserComment("");
         console.log("HandleSend notation : ", notation);
         console.log("HandleSend userComment : ", userComment);
      } else {
         alert(
            "Merci de donner une notation d'abord sous forme d'étoiles, et ensuite sous forme de commentaire ! "
         );
      }
   };
   // console.log(props); to test the DefaultCenter of the map
   return (
      <Fragment>
         <GoogleMap defaultZoom={8} defaultCenter={props.coords}>
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
               position={props.coords}
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
                     {selectedRestaurant.ratings.map((restaurant, index) => {
                        return (
                           <div key={restaurant.comment}>
                              <UserReview
                                 resto={restaurant}
                                 numero={index + 1}
                              />
                           </div>
                        );
                     })}

                     {/* {comments.map(restaurant, index) => {

                     }} */}

                     {/* <UsersReviews selectedRestaurant={selectedRestaurant} /> */}
                     {/* Comment Form */}
                     <CommentForm
                        changed={e => setUserComment(e.target.value)}
                        onGivenNotation={e => setNotation(e)}
                        numberOfStars={notation}
                        onSend={handleSend}
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
