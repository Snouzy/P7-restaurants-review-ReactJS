import { API_KEY } from '../api_key';
import axios from 'axios';

export function fetchRestaurants(args) {
   return function(dispatch) {
      dispatch({ type: 'UPDATE_RESTAURANTS', payload: args });
   };
}

export function updateZoom(args) {
   return function(dispatch) {
      console.log(dispatch);
      dispatch({ type: 'UPDATE_ZOOM', payload: args });
   };
}

export function resetRestaurants() {
   return function(dispatch) {
      dispatch({ type: 'RESET_RESTAURANT' });
   };
}

export function filterRestaurants(args) {
   return function(dispatch) {
      dispatch({ type: 'FILTER_RESTAURANTS', payload: args });
   };
}

export function commentsFlag(arg) {
   return function(dispatch) {
      dispatch({ type: 'COMMENTS_FLAG', payload: arg });
   };
}

function formatRestaurant(r) {
   return {
      key: r.id,
      id: r.place_id,
      restaurantName: r.name,
      address: r.formatted_address,
      lat: r.geometry.location.lat,
      long: r.geometry.location.lng,
      ratings: r.reviews || [],
      stars: r.rating
   };
}
//https://cors-anywhere.herokuapp.com/
export const updateUserPosition = position => async dispatch => {
   dispatch({ type: 'UPDATE_USER_POSITION', payload: position });

   const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&radius=10000&type=restaurant&key=${API_KEY}`
   );
   const data = res.data;

   data.results.map(async r => {
      const details = await axios.get(
         `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${r.place_id}&fields=place_id,name,rating,formatted_address,review,geometry&key=${API_KEY}`
      );
      dispatch({
         type: 'UPDATE_RESTAURANTS',
         payload: formatRestaurant(details.data.result)
      });
   });
};
