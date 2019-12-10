import React, { Component } from "react";
import styled from "styled-components";
import data from "../data.json";
import Stars from "./Stars";

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
      let currentRestoStars = [];

      return (
         <div id="restaux" className="col-sm-12">
            {data.map((resto, index) => {
               // empty at each iteration
               currentRestoStars = [];

               //stars are depending on how much ratings the restaurant has :
               for (let i = 0; i < resto.ratings.length; i++) {
                  currentRestoStars.push(resto.ratings[i].stars); // pushing each stars
               }

               // the average stars of each restaurant
               console.log(this.average(currentRestoStars));

               return (
                  <div key={index}>
                     <h5>{resto.restaurantName}</h5>
                     <strong>Here will be the stars</strong>
                     <p>{resto.address}</p>
                     <Stars numberOfStars={this.average(currentRestoStars)} />
                     <hr />
                  </div>
               );
            })}
         </div>
      );
   }
}

export default Restaurants;
