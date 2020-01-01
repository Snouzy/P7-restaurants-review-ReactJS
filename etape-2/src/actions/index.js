import data from "../data.json";

export function fetchRestaurants(args) {
   return function(dispatch) {
      dispatch({ type: "ADD_RESTAURANT", payload: args });
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
