export default function(filterReducer = [], action) {
   switch (action.type) {
      case "FILTER_RESTAURANTS":
         return {
            ...filterReducer,
            newRestaurants: action.payload
         };
   }
   return filterReducer;
}
