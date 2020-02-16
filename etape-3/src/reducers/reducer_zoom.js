const initialState = 10;

export default function(userZoom = initialState, action) {
   switch (action.type) {
      case 'UPDATE_ZOOM':
         const newZoom = action.payload;
         return newZoom;
      default:
         return userZoom;
   }
}
