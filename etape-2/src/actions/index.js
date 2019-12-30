import data from "../data.json";

export function fetchRestaurants() {
   return function(dispatch) {
      dispatch({ type: "ADD_RESTAURANT", payload: data });
   };
}
