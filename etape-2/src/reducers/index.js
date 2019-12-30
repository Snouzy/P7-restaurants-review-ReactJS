import { combineReducers } from "redux";
import restaurantReducer from "./reducer_restaurants";

const rootReducer = combineReducers({
   restoReducer: restaurantReducer
});
export default rootReducer;
