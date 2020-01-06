import { API_KEY } from "../api_key";
import axios from "axios";
export function fetchRestaurants(args) {
   return function(dispatch) {
      dispatch({ type: "UPDATE_RESTAURANTS", payload: args });
   };
}

export function filterRestaurants(args) {
   return function(dispatch) {
      dispatch({ type: "FILTER_RESTAURANTS", payload: args });
   };
}

export function commentsFlag(arg) {
   return function(dispatch) {
      dispatch({ type: "COMMENTS_FLAG", payload: arg });
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
export const updateUserPosition = position => dispatch => {
   dispatch({ type: "UPDATE_USER_POSITION", payload: position });
   axios
      .get(
         `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&radius=683&type=restaurant&key=${API_KEY}`
      )
      .then(response => {
         response.data.results.map(r => {
            return axios
               .get(
                  `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${r.place_id}&fields=place_id,name,rating,formatted_address,review,geometry&key=${API_KEY}`
               )
               .then(response => {
                  dispatch({
                     type: "UPDATE_RESTAURANTS",
                     payload: formatRestaurant(response.data.result)
                  });
               });
         });
      })
      .catch(error => {
         console.log(error);
      });
};
// return function(dispatch) {
//    dispatch({ type: "UPDATE_USER_POSITION", payload: position });
//    axios
//       .get(
//          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.592830,7.583890&radius=683&type=restaurant&key=${API_KEY}&pageToken=CrQCIQEAAAnB6Ke29ssFa7QUW3ddkENCur0ZPmfga8X1DJGAUCVClor1K9StOLpMbVbkwS3xcOHZb`
//       )
//       .then(response => {
//          let responseData = [response];
//          console.log(response);
//          if (response.data.next_page_token) {
//             console.log("It has another page !");
//             axios
//                .get(
//                   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.592830,7.583890&radius=683&type=restaurant&key=${API_KEY}&pageToken=CrQCIQEAAAnB6Ke29ssFa7QUW3ddkENCur0ZPmfga8X1DJGAUCVClor1K9StOLpMbVbkwS3xcOHZb&pageToken=${response.data.next_page_token}`
//                )
//                .then(response => {
//                   responseData.push(response);
//                });
//          }

//          console.log(responseData);
//       });
// };
