import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { fetchRestaurants } from "../../actions";
//utils libs
import { formatPosition } from "../../services/libs";
import _ from "lodash";
import ReactStreetview from "react-streetview";
import styled from "styled-components";
//Google
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
//utils imports
import data from "../../data.json";
import { API_KEY } from "../../api_key";
//Personal imports
import { HeaderOfTheWindowSection } from "../Header/HeaderOfTheWindowSection";
import { CommentForm } from "../Common/CommentForm";
import AddingRestaurantForm from "../Common/AddingRestaurantForm";
import { UserReview } from "../Common/UserReview";
import UserIcon from "../../imgs/MapMarker_PushPin_Left_Green.svg";
import Geocode from "react-geocode";

export const MapOptions = props => {
   console.log(props);
   // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
   Geocode.setApiKey(API_KEY);
   Geocode.setLanguage("fr");
   Geocode.setRegion("fr");

   //on recoit les props de la classe Map
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
   const [userComment, setUserComment] = useState("");
   const [notation, setNotation] = React.useState(null);
   const [isSend, setSending] = React.useState(false);
   const [isRightClicked, setRightClick] = React.useState(false);
   const [NameOfTheRestaurant, setNameOfTheRestaurant] = React.useState("");
   const [posOfTheRestaurant, setPosOfTheRestaurant] = React.useState(null);
   const [addressOfTheRestaurant, setAddressOfTheRestaurant] = React.useState(
      ""
   );

   // on click on one of the markers
   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   // when the user click the close button of the Restaurant adding's form
   const handleClose = () => {
      setRightClick(false); //close the modal
   };

   // when a user right click on the map to add a new restaurant
   const handleRightClick = e => {
      setRightClick(true);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosOfTheRestaurant([lat, lng]);
   };

   // then, the component will re - render with the new values :
   React.useEffect(() => {
      console.log(posOfTheRestaurant);
      if (posOfTheRestaurant) {
         Geocode.fromLatLng(posOfTheRestaurant[0], posOfTheRestaurant[1]).then(
            response => {
               const address = response.results[0].formatted_address;
               setAddressOfTheRestaurant(address);
               console.log(address);
            },
            error => {
               console.error(error);
            }
         );
      }
   }, [posOfTheRestaurant]);

   // when a user "click" on "ajouter un restaurant"
   const handleAdded = () => {
      console.log(NameOfTheRestaurant);
      console.log(addressOfTheRestaurant);
      const addedRestaurant = formatRestaurant(
         NameOfTheRestaurant,
         addressOfTheRestaurant
      );
      props.fetchRestaurants(addedRestaurant);
   };

   const formatRestaurant = (name, address) => {
      return {
         id: props.restaurants.length + 1,
         restaurantName: name,
         address: address,
         lat: posOfTheRestaurant[0],
         lng: posOfTheRestaurant[1],
         ratings: []
      };
   };

   //when the user clicked on "envoyer"
   const handleSend = () => {
      if (notation !== null && userComment !== "") {
         selectedRestaurant.ratings.push({
            stars: notation,
            comment: userComment
         });

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

   // console.log(props);
   return (
      <Fragment>
         {isRightClicked && (
            <AddingRestaurantForm
               isRightClicked={isRightClicked}
               onSend={handleAdded}
               handleClose={handleClose}
               changed={e => setNameOfTheRestaurant(e.target.value)}
            />
         )}
         <GoogleMap
            defaultZoom={8}
            defaultCenter={props.coords}
            onRightClick={handleRightClick}
         >
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

            {/* verifie si les props sont existantes pour montrer le marker du user */}
            {props.coords.lng && (
               <Marker
                  key="userPosition"
                  position={props.coords}
                  icon={{
                     url: UserIcon,
                     scaledSize: new window.google.maps.Size(40, 40)
                  }}
               />
            )}
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
const mapStateToProps = store => {
   return {
      restaurants: store.restoReducer,
      restaurantsFiltered: store.restoFilter.newRestaurants
   };
};
const mapDipatchToProps = {
   fetchRestaurants
};

export default connect(mapStateToProps, mapDipatchToProps)(MapOptions);

const DivStreetView = styled.div`
   width: 50rem;
   height: 400px;
   margin-top: 50px;
`;
