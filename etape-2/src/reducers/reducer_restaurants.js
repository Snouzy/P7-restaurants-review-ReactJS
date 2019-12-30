import data from "../data.json";

export default function(restaurantReducer = data, action) {
   switch (action.type) {
      case "ADD_RESTAURANT":
         return {
            ...restaurantReducer,
            restoReducer: action.payload
         };
   }
   return restaurantReducer;
}