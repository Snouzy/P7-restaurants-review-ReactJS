import React, { Component } from "react";
import ReactStars from "react-stars";
// import data from "../data.json";
class Stars extends Component {
   render() {
      return (
         <ReactStars
            count={5}
            value={this.props.numberOfStars}
            size={25}
            color1={"#ccc"}
            color2={"#ffd700"}
         />
      );
   }
}

export default Stars;
