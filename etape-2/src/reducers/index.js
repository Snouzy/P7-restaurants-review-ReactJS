import { combineReducers } from "redux";
import restaurantReducer from "./reducer_restaurants";
import restaurantFilter from "./reducer_filter";

const rootReducer = combineReducers({
   restoReducer: restaurantReducer,
   restoFilter: restaurantFilter
});
export default rootReducer;
