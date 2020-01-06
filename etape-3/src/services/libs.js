// return the average number of an array of numbers
export const average = arr => {
   return (
      arr.reduce(function(a, b) {
         //a = accumulator // b = current value
         return a + b;
      }, 0) / arr.length // 0 = inital value
   );
};

// to put only 1 line on G-maps components props, like : position=formatPosition(arg)
export const formatPosition = restaurant => {
   return {
      lat: restaurant.lat,
      lng: restaurant.long
   };
};

export const averageStars = thingsToCalculate => {
   const arrayOfThingsToCalculate = [];
   for (let i = 0; i < thingsToCalculate.length; i++) {
      arrayOfThingsToCalculate.push(thingsToCalculate[i].rating);
   }

   return (
      arrayOfThingsToCalculate.reduce(function(a, b) {
         //a = accumulator // b = current value
         return a + b;
      }, 0) / arrayOfThingsToCalculate.length // 0 = inital value
   );
};
