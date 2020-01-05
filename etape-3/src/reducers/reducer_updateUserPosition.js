//default = Paris
const initialState = {
   lat: 48.866667,
   lng: 2.333333
};

export default function(userPosition = initialState, action) {
   switch (action.type) {
      case "UPDATE_USER_POSITION":
         const newPos = action.payload;
         return newPos;
      default:
         return userPosition;
   }
}
