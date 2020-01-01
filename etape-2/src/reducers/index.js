import { combineReducers } from "redux";
import restaurantReducer from "./reducer_restaurants";
import restaurantFilter from "./reducer_filter";
import commentsFlag from "./reducer_commentsFlag";

const rootReducer = combineReducers({
   restoReducer: restaurantReducer,
   restoFilter: restaurantFilter,
   commentsFlag: commentsFlag
});
export default rootReducer;
