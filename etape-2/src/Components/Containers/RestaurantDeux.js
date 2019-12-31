import React from "react";
import { fetchRestaurants, filterRestaurants } from "../../actions";
import { connect } from "react-redux";
import data from "../../data.json";
import Stars from "../Common/Stars";
import { averageStars } from "../../services/libs";
import Filter from "../Common/Filter";

const RestaurantDeux = props => {
   const { restaurants, restaurantsFiltered } = props; //from redux
   const [minimum, setMinimum] = React.useState(1); // min filter = 1
   const [maximum, setMaximum] = React.useState(5); // max filter = 5

   // setting the min & max into the state when a user change the values of the options
   const handleFilter = e => {
      if (e.target.name === "sort-max") {
         setMaximum(parseInt(e.target.value));
         setMinimum(parseInt(document.getElementsByName("sort-min")[0].value));
      } else {
         setMinimum(parseInt(e.target.value));
         setMaximum(document.getElementsByName("sort-max")[0].value);
      }
   };

   // when the user filter the restaurants
   React.useEffect(() => {
      //look all the defaults restaurants
      const restos = restaurants.filter(resto => {
         return (
            averageStars(resto.ratings) >= minimum &&
            averageStars(resto.ratings) <= maximum
         );
      });
      // pushing ones which correspond to the filter into the state
      props.filterRestaurants(restos);
   }, [minimum, maximum]);

   // return the new filtered restaurants
   const renderRestaurants = () => {
      if (restaurantsFiltered) {
         if (restaurantsFiltered.length) {
            return restaurantsFiltered.map((resto, index) => (
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
            ));
         } else {
            return "Aucun restaurant ne correspond aux critères choisis !";
         }
      }
   };
   return (
      <div className="row col-sm-12 col-lg-3">
         <Filter
            changed={e => handleFilter(e)}
            maxStars={maximum}
            numberOfOptions={5}
         />

         <div className="col-sm-12">{renderRestaurants()}</div>
      </div>
   );
};

//read the store
const mapStateToProps = store => {
   return {
      restaurants: store.restoReducer,
      restaurantsFiltered: store.restoFilter.newRestaurants
   };
};

//push-modify the store
const mapDipatchToProps = {
   fetchRestaurants,
   filterRestaurants
};
export default connect(mapStateToProps, mapDipatchToProps)(RestaurantDeux);
