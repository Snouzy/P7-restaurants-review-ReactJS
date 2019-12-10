import React, { Component } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "../data.json";

class Stars extends Component {
   render() {
      // Initial rating

      return (
         <div className={this.props.numberOfStars}>
            <FontAwesomeIcon icon={faStar} />
         </div>
      );
   }
}

export default Stars;
