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

export function updateUserPosition(position) {
   return function(dispatch) {
      dispatch({ type: "UPDATE_USER_POSITION", payload: position });
   };
}
