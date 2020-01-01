import { combineReducers } from "redux";
import restaurantReducer from "./reducer_restaurants";
import restaurantFilter from "./reducer_filter";
import isAdded from "./reducer_isAdded";

const rootReducer = combineReducers({
   restoReducer: restaurantReducer,
   restoFilter: restaurantFilter,
   isAdded: isAdded
});
export default rootReducer;
