import React from "react";
import ReactStars from "react-stars";

const Stars = props => {
   const { numberOfStars, isEditable, size, onGivenNotation } = props;
   return (
      <ReactStars
         count={5}
         value={numberOfStars}
         edit={isEditable}
         size={size}
         color1={"#ccc"}
         color2={"#ffd701"}
         onChange={onGivenNotation}
      />
   );
};

export default Stars;
