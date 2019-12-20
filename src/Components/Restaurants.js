import React from "react";
import data from "../data.json";
import Stars from "./Stars";
import { averageStars } from "../services/libs";
import Filter from "./Filter";
import styled from "styled-components";

export const Restaurants = () => {
   const [restaurants, setRestaurants] = React.useState(data);
   const [minimum, setMinimum] = React.useState(null);
   const [maximum, setMaximum] = React.useState(5); //initializing the ratings to 5 stars max

   const handleFilter = e => {
      if (e.target.name === "sort-max") {
         setMaximum(parseInt(e.target.value));
         setMinimum(parseInt(document.getElementsByName("sort-min")[0].value));
      } else {
         setMinimum(parseInt(e.target.value));
         setMaximum(document.getElementsByName("sort-max")[0].value);
      }
   };

   //useEffect ~= componentDidMount, il est appelé quand le component est re-render, à moins que l'on lui dise seulement si ", [] " change
   React.useEffect(() => {
      const restos = data.filter(resto => {
         return (
            averageStars(resto.ratings) >= minimum &&
            averageStars(resto.ratings) <= maximum
         );
      });
      setRestaurants(restos); //updating the state with new values
   }, [minimum, maximum, setRestaurants]);

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
                     <p style={{ marginBottom: "0" }}>{resto.address}</p>
                     <Stars
                        numberOfStars={averageStars(resto.ratings)}
                        isEditable={false}
                        size={25}
                     />
                     <hr />
                  </div>
               );
            })}
         </div>
      </div>
   );
};
