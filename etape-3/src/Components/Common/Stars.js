import React from "react";
import ReactStars from "react-stars";

const Stars = ({ numberOfStars, isEditable, size, onGivenNotation }) => (
   <ReactStars
      value={numberOfStars}
      edit={isEditable}
      size={size}
      onChange={onGivenNotation}
      count={5}
      color1={"#ccc"}
      color2={"#ffd701"}
   />
);

export default Stars;
