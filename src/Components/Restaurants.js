import React, { Component } from "react";
import data from "../data.json";
import Stars from "./Stars";
import styled from "styled-components";

class Restaurants extends Component {
   // return the average number of an array of numbers
   average = arr => {
      return (
         arr.reduce(function(a, b) {
            //a = accumulator // b = current value
            return a + b;
         }, 0) / arr.length // 0 = inital value
      );
   };

   render() {
      return (
         <div id="restaux" className="col-sm-12">
            {data.map((resto, index) => {
               // empty at each iteration
               let currentRestoStars = [];

               //stars are depending on how much ratings the restaurant has :
               for (let i = 0; i < resto.ratings.length; i++) {
                  currentRestoStars.push(resto.ratings[i].stars); // pushing each stars
               }

               // the average stars of each restaurant
               console.log(this.average(currentRestoStars));

               return (
                  <div key={index}>
                     <h5>{resto.restaurantName}</h5>
                     <PWrapper>{resto.address}</PWrapper>
                     <Stars
                        numberOfStars={this.average(currentRestoStars)}
                        //format so i can select them with querySelector
                        restaurantName={resto.restaurantName.replace(
                           /[^a-zA-Z]/g,
                           ""
                        )}
                     />
                     <hr />
                  </div>
               );
            })}
         </div>
      );
   }
}
const PWrapper = styled.p`
   margin-bottom: 0;
`;
export default Restaurants;
