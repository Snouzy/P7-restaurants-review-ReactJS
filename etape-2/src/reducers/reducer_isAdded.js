export default function(isAdded = false, action) {
   switch (action.type) {
      case "IS_ADDED":
         console.log(action.payload);
         return isAdded;
   }
   return isAdded;
}
