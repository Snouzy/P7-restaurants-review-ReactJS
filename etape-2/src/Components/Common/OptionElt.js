import React from "react";

const OptionElt = ({ value, number, clicked }) => {
   const textToDisplay = number < 2 ? "étoile" : "étoiles";

   return (
      <option value={value} onClick={clicked}>
         {number} {textToDisplay}
      </option>
   );
};

export default OptionElt;
