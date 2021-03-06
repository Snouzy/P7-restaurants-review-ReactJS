import React, { useState, Fragment } from 'react';
//utils libs
import ReactStreetview from 'react-streetview';
import styled from 'styled-components';
//Google
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
//utils imports
import data from '../../data.json';
import { API_KEY } from '../../api_key';
//Components imports
import { UsersReview } from '../Common/UserReview';
import HeaderRestaurantsModal from '../Header/HeaderRestaurantsModal';
import UserIcon from '../../imgs/MapMarker_PushPin_Left_Green.svg';

export const MapOptions = props => {
   //on recoit les props de la classe Map
   const { coords } = props;
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const handleClick = index => {
      //put the user's selectedRestaurant into the state
      setSelectedRestaurant(data[index]);
   };

   // to put only 1 line on G-maps components props, like : position=formatPosition(resto)
   const formatPosition = restaurant => {
      return {
         lat: restaurant.lat,
         lng: restaurant.long
      };
   };

   console.log(props);
   return (
      <Fragment>
         <GoogleMap defaultZoom={8} defaultCenter={coords}>
            {/* display the markers */}
            {props.restaurants.map((resto, index) => (
               <Marker
                  key={resto.restaurantName}
                  position={formatPosition(resto)}
                  onClick={() => handleClick(index)}
               />
            ))}
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
                     <HeaderRestaurantsModal
                        selectedRestaurant={selectedRestaurant}
                     />
                     {selectedRestaurant.ratings.map((el, index) => (
                        <UsersReview
                           key={index}
                           selectedRestaurant={el}
                           numero={index + 1}
                        />
                     ))}

                     {/* google street-view */}
                     <DivStreetView>
                        <h5>Aperçu :</h5>
                        <ReactStreetview
                           apiKey={API_KEY}
                           streetViewPanoramaOptions={{
                              position: formatPosition(selectedRestaurant),
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
