import React from "react";
import data from "../data.json";
import Stars from "./Stars";
import styled from "styled-components";
import { averageStars } from "../services/libs";
import Filter from "./Filter";

export const Restaurants = () => {
   const [restaurants, setRestaurants] = React.useState(
      data.map(resto => resto)
   );
   const [minimum, setMinimum] = React.useState(null);
   const [maximum, setMaximum] = React.useState(5); //initializing to 5 stars max

   const handleFilter = e => {
      if (e.target.name === "sort-max") {
         setMaximum(parseInt(e.target.value));
         setMinimum(parseInt(document.getElementsByName("sort-min")[0].value));
      } else {
         setMinimum(parseInt(e.target.value));
         setMaximum(document.getElementsByName("sort-max")[0].value);
      }
      const restos = restaurants.filter(resto => {
         return (
            averageStars(resto.ratings) >= minimum &&
            averageStars(resto.ratings) <= maximum
         );
      });

      setRestaurants(restos); //updating the state with new values
   };

   return (
      <div className="row col-sm-12 col-lg-3">
         <Filter
            changed={e => handleFilter(e)}
            maxStars={maximum}
            numberOfOptions={5}
         />
         <div id="restaux" className="col-sm-12">
            {restaurants.map((resto, index) => {
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
      </div>
   );
};

const PWrapper = styled.p`
   margin-bottom: 0;
`;
