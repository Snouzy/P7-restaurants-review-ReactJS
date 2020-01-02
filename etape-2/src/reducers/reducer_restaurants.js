import data from "../data.json";

export default function(restaurantReducer = data, action) {
   switch (action.type) {
      case "ADD_RESTAURANT":
         const oldRestaurants = [...restaurantReducer];
         oldRestaurants.push(action.payload);
         return oldRestaurants;
      default:
         return restaurantReducer;
   }
}
