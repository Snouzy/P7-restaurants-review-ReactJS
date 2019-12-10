import React, { Component } from "react";
import data from "../data.json";

class Restaurants extends Component {
   render() {
      return (
         <div id="restaux" className="col-sm-12">
            {data.map((resto, index) => {
               return (
                  <div key={index}>
                     <h5>{resto.restaurantName}</h5>
                     <strong>Here will be the stars</strong>
                     <p>{resto.address}</p>
                     <hr/>
                  </div>
               );
            })}
         </div>
      );
   }
}

export default Restaurants;
