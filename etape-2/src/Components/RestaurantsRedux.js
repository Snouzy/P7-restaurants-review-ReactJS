import React, { Component, Fragment } from "react";
import { fetchRestaurants } from "../actions";
import { connect } from "react-redux";

import Stars from "./Common/Stars";
import { averageStars } from "../services/libs";
class RestaurantRedux extends Component {
   //push all the restaurant into the store
   // componentWillMount() {
   //    this.props.fetchRestaurants();
   // }

   handleClick = () => {
      console.log(this.props.restaurants);
      this.props.fetchRestaurants({
         id: 17,
         restaurantName: "Love",
         address: "19 Rue Abbatucci, 68330 Huningue",
         lat: 48.59283,
         long: 8.58389,
         ratings: [
            {
               stars: 4,
               comment:
                  "Un excellent restaurant, j'y reviendrai, si le poisson est frais !"
            },
            {
               stars: 2,
               comment: "Nul grave !"
            },
            {
               stars: 1,
               comment: "Top, si la caraffe d'eau n'était pas payante !"
            }
         ]
      });
   };

   renderRestaurant() {
      // if (this.props.restaurants) {
      return (
         <Fragment>
            <div id="restaux" className="col-sm-12">
               <button onClick={this.handleClick}>Click me !</button>
               {/* {console.log(this.props.restaurants)} */}
               {this.props.restaurants.map(r => {
                  return (
                     <div key={r.id}>
                        <h5>{r.restaurantName}</h5>
                        <p style={{ marginBottom: "0" }}>{r.address}</p>
                        <Stars
                           numberOfStars={averageStars(r.ratings)}
                           isEditable={false}
                           size={25}
                        />
                        <hr />
                     </div>
                  );
               })}
            </div>
         </Fragment>
      );
      // }
   }
   render() {
      return <div>{this.renderRestaurant()}</div>;
   }
}

//getting-read the store
const mapStateToProps = store => {
   return {
      restaurants: store.restoReducer
   };
};

//push-modify the store
const mapDipatchToProps = {
   fetchRestaurants
};
export default connect(mapStateToProps, mapDipatchToProps)(RestaurantRedux);
