import React, { Component } from "react";
import ReactStars from "react-stars";
// import data from "../data.json";
class Stars extends Component {
   constructor() {
      super();
      this.starsTotal = 5;
   }

   getPercentage() {
      const starPercentage = (this.props.numberOfStars / this.starsTotal) * 100; //percentage
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`; //rounded to the 10 nearest
      // set width of stars-inner to percentage
      document.querySelector(
         `.${this.props.restaurantName} .stars-inner`
      ).style.width = starPercentageRounded;
   }
   render() {
      // this.props.numberOfStars = la moyenne des étoiles reçues
      // console.log(this.getPercentage());
      return (
         <div className={this.props.restaurantName}>
            <div className="stars-outer">
               <div className="stars-inner" />
               <ReactStars count={5}/>
            </div>
            <span className="number-rating"></span>
         </div>
      );
   }
}

export default Stars;
