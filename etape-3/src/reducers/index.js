import { combineReducers } from "redux";
import restaurantReducer from "./reducer_restaurants";
import restaurantFilter from "./reducer_filter";
import commentsFlag from "./reducer_commentsFlag";
import updateUserPos from "./reducer_updateUserPosition";

const rootReducer = combineReducers({
   restoReducer: restaurantReducer,
   restoFilter: restaurantFilter,
   commentsFlag: commentsFlag,
   userPosition: updateUserPos
});
export default rootReducer;
