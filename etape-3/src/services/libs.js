import moment from "moment";
import "moment/locale/fr";

// return the average number of an array of numbers
export const average = arr => {
   return (
      arr.reduce(function(a, b) {
         //a = accumulator // b = current value
         return a + b;
      }, 0) / arr.length // 0 = inital value
   );
};

export const getMoment = () => {
   moment.locale("fr");
   return moment().fromNow();
};

// to put only 1 line on G-maps components props, like : position=formatPosition(arg)
export const formatPosition = restaurant => {
   return {
      lat: restaurant.lat,
      lng: restaurant.long
   };
};

export const averageStars = arr => {
   const averageArray = [];
   let result;
   //if there is ratings
   if (arr) {
      for (let i = 0; i < arr.length; i++) {
         averageArray.push(arr[i].rating);
      }

      result =
         averageArray.reduce(function(a, b) {
            //a = accumulator // b = current value
            return a + b;
         }, 0) / averageArray.length; // 0 = inital value
   } else {
      result = 0;
   }
   return result;
};
