import React, { Component } from "react";
import ReactStars from "react-stars";
// import data from "../data.json";

const Stars = props => {
   const { numberOfStars, isEditable, size } = props;
   return (
      <ReactStars
         count={5}
         value={numberOfStars}
         edit={isEditable}
         size={size}
         color1={"#ccc"}
         color2={"#ffd701"}
      />
   );
};

export default Stars;