import React, { Component } from "react";
import data from "../data.json";
import Stars from "./Stars";
import styled from "styled-components";
import { averageStars } from "../services/libs";
import Filter from "./Filter";

class Restaurants extends Component {
   // return the average number of an array of numbers
   constructor() {
      super();
      this.state = {
         restaurants: data.map(resto => resto)
      };
   }
   handleFilter = (min, max) => {
      const restaurants = this.state.restaurants.filter(resto => {
         return (
            averageStars(resto.ratings) >= min &&
            averageStars(resto.ratings) <= max
         );
      });
      // this.setState({ restaurants });
      console.log(restaurants);
   };

   render() {
      this.handleFilter(2, 4);
      const AllRestaurants = this.state.restaurants.map((resto, index) => {
         return (
            <div key={index}>
               <h5>{resto.restaurantName}</h5>
               <PWrapper>{resto.address}</PWrapper>
               <Stars numberOfStars={averageStars(resto.ratings)} />
               <hr />
            </div>
         );
      });
      return (
         <div className="row col-sm-12 col-lg-3">
            <Filter />

            <div id="restaux" className="col-sm-12">
               {AllRestaurants}
            </div>
         </div>
      );
   }
}
const PWrapper = styled.p`
   margin-bottom: 0;
`;
export default Restaurants;
