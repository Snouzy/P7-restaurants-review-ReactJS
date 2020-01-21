import { combineReducers } from 'redux';
import restaurantReducer from './reducer_restaurants';
import restaurantFilter from './reducer_filter';
import commentsFlag from './reducer_commentsFlag';
import updateUserPos from './reducer_updateUserPosition';
import zoom from './reducer_zoom';

const rootReducer = combineReducers({
   restoReducer: restaurantReducer,
   restoFilter: restaurantFilter,
   commentsFlag: commentsFlag,
   userPosition: updateUserPos,
   userZoom: zoom
});
export default rootReducer;
