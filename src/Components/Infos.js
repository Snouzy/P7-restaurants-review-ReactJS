import React, { Component } from "react";
import Restaurants from "./Restaurants";
import Filter from "./Filter";

export default class Infos extends Component {
   createOptions = maxStars => {
      const optionsElts = [];
      for (let i = 1; i <= maxStars; i++) {
         optionsElts.push(
            <option key={i} value={i}>
               {i} étoiles
            </option>
         );
      }
      return optionsElts;
   };

   render() {
      return (
         <div className="row col-sm-12 col-lg-3">
            <Filter />
            <Restaurants />
         </div>
      );
   }
}
