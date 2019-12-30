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

   renderRestaurant() {
      if (this.props.restaurants) {
         return (
            <Fragment>
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
            </Fragment>
         );
      }
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
