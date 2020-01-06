import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { fetchRestaurants, commentsFlag } from "../../actions";
//utils libs
import { formatPosition } from "../../services/libs";
import ReactStreetview from "react-streetview";
import styled from "styled-components";
//Google
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
//utils imports
import { API_KEY } from "../../api_key";
//Personal imports
import HeaderRestaurantsModal from "../Headers/HeaderRestaurantsModal";
import { CommentForm } from "../Forms/CommentForm";
import AddingRestaurantForm from "../Forms/AddingRestaurantForm";
import { UserReview } from "../Common/UserReview";
import UserIcon from "../../imgs/google-maps-marker-green.png";
import Geocode from "react-geocode";

export const MapOptions = props => {
   // GoogleMap GeoCode API  initialisation
   Geocode.setApiKey(API_KEY);
   Geocode.setLanguage("fr");
   Geocode.setRegion("fr");
   // state
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
   const [userComment, setUserComment] = useState("");
   const [userName, setUserName] = useState("Inconnu");
   const [notation, setNotation] = React.useState(null);
   const [isAdding, setIsAdding] = React.useState(false);
   const [NameOfTheRestaurant, setNameOfTheRestaurant] = React.useState("");
   const [posOfTheRestaurant, setPosOfTheRestaurant] = React.useState(null);
   const [addressOfTheRestaurant, setAddressOfTheRestaurant] = React.useState(
      ""
   );

   // on click on one of the markers
   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(props.restaurants[index]);
   };

   /* 
   =============== 
   ADDING A RESTAURANT 
   =============== */

   // when a user right click on the map to add a new restaurant
   const handleClickAdd = e => {
      setIsAdding(true);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosOfTheRestaurant([lat, lng]); //we put the clicked coordinates into the state
   };

   // then, the component will re - render with the new values :
   React.useEffect(() => {
      if (posOfTheRestaurant) {
         // convert the lat/lng into an address
         Geocode.fromLatLng(posOfTheRestaurant[0], posOfTheRestaurant[1]).then(
            response => {
               const address = response.results[0].formatted_address;
               setAddressOfTheRestaurant(address);
            },
            error => {
               console.error(error);
            }
         );
      }
   }, [posOfTheRestaurant]);

   // when a user validate the adding restaurant form
   const handleAdded = () => {
      //formate the new restaurant to have the same template as the others
      const addedRestaurant = formatRestaurant(
         NameOfTheRestaurant,
         addressOfTheRestaurant
      );
      // pushing the new restaurant into the redux store
      props.fetchRestaurants(addedRestaurant);
      setIsAdding(false);
   };

   const formatRestaurant = (name, address) => {
      return {
         id: props.restaurants.length + 1,
         restaurantName: name,
         address: address,
         lat: posOfTheRestaurant[0],
         long: posOfTheRestaurant[1],
         ratings: []
      };
   };

   /* 
   =============== 
   COMMENTING A RESTAURANT 
   =============== */

   //when the user validate the comment form
   const handleSend = () => {
      // verifications
      if (notation !== null && userComment !== "") {
         console.log(selectedRestaurant);
         selectedRestaurant.ratings.push({
            author_name: userName,
            profile_photo_url:
               "https://lh4.ggpht.com/-_kZrJXAOGKY/AAAAAAAAAAI/AAAAAAAAAAA/BJTWMlSQA9s/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
            relative_time_description: "Maintenant",
            rating: notation,
            text: userComment
         });
         props.commentsFlag(!props.stateCommentsFlag); //use a flag to re - render the list of the restaurants
         // (= quand un user envoie un nouvel avis, il est directement affiché, pas besoin d'attendre le prochain render du fichier Restaurants.js)

         //restoring the inital state
         setNotation(null);
         setUserComment("");
         setUserName("Inconnu");
      } else {
         alert(
            "Merci de donner une notation d'abord sous forme d'étoiles, et ensuite sous forme de commentaire ! "
         );
      }
   };

   // when the user click the close button of the Restaurant adding's form ("Fermer")
   const handleClose = () => {
      setIsAdding(false); //close the modal
   };
   return (
      <Fragment>
         {isAdding && (
            <AddingRestaurantForm
               isAdding={isAdding}
               onSend={handleAdded}
               handleClose={handleClose}
               changed={e => setNameOfTheRestaurant(e.target.value)}
            />
         )}
         <GoogleMap
            defaultZoom={8}
            defaultCenter={props.userPosition}
            onClick={handleClickAdd}
         >
            {/* display the markers */}
            {props.restaurants.map((resto, index) => (
               <Marker
                  key={resto.id}
                  position={formatPosition(resto)}
                  onClick={() => handleClick(index)}
               />
            ))}
            <Marker
               position={props.userPosition}
               icon={{
                  url: UserIcon,
                  scaledSize: new window.google.maps.Size(25, 40)
               }}
            />

            {/* If the user clicked on a restaurant, display the google window with his content: */}
            {selectedRestaurant && (
               <InfoWindow
                  position={formatPosition(selectedRestaurant)}
                  onCloseClick={() => setSelectedRestaurant(null)} //putting the value to 0 restaurant selected
               >
                  {/* All the content of the InfoWindow modal */}
                  <div>
                     <HeaderRestaurantsModal
                        selectedRestaurant={selectedRestaurant}
                     />
                     {/* display the ratings of the selected restaurant */}
                     {selectedRestaurant.ratings.map((restaurant, index) => (
                        <div key={restaurant.author_name}>
                           <UserReview
                              resto={selectedRestaurant}
                              numero={index}
                           />
                        </div>
                     ))}

                     {/* Comment Form */}
                     <CommentForm
                        changed={e => setUserComment(e.target.value)}
                        pseudo={e => setUserName(e.target.value)}
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
const mapStateToProps = store => ({
   restaurants: store.restoReducer,
   restaurantsFiltered: store.restoFilter.newRestaurants,
   stateCommentsFlag: store.commentsFlag,
   userPosition: store.userPosition
});

const mapDispatchToProps = {
   fetchRestaurants,
   commentsFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(MapOptions);

const DivStreetView = styled.div`
   width: 50rem;
   height: 400px;
   margin-top: 50px;
`;
