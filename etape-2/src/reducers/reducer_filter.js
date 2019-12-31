import data from "../data.json";
export default function(filterReducer = [], action) {
   switch (action.type) {
      case "FILTER_RESTAURANTS":
         // console.log(...filterReducer);
         console.log("action payload : ", action.payload);
         return {
            ...filterReducer,
            newRestaurants: action.payload
         };
   }
   return filterReducer;
}
