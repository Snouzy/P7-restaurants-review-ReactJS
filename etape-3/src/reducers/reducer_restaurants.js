export default function(restaurantReducer = [], action) {
   switch (action.type) {
      case 'UPDATE_RESTAURANTS':
         const oldRestaurants = [...restaurantReducer];
         oldRestaurants.push(action.payload);
         return oldRestaurants;
      case 'RESET_RESTAURANT':
         return [];
      default:
         return restaurantReducer;
   }
}
