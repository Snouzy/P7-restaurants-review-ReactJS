import React, { Component } from "react";
import data from "../data.json";
import Stars from "./Stars";
import styled from "styled-components";
import { averageStars } from "../services/libs";

class Restaurants extends Component {
   // return the average number of an array of numbers

   render() {
      return (
         <div id="restaux" className="col-sm-12">
            {data.map((resto, index) => {
               return (
                  <div key={index}>
                     <h5>{resto.restaurantName}</h5>
                     <PWrapper>{resto.address}</PWrapper>
                     <Stars numberOfStars={averageStars(resto.ratings)} />
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