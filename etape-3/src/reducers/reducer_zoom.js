const initialState = 10;

export default function(userZoom = initialState, action) {
   console.log('hello before the switch', action);
   switch (action.type) {
      case 'UPDATE_ZOOM':
         console.log('hello after UPDATE_ZOOM action.type', action);
         console.log(action.payload);
         const newZoom = action.payload;
         return newZoom;
      default:
         return userZoom;
   }
}
