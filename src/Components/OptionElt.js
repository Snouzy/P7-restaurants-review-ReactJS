import React from "react";

export default function OptionElt(props) {
   const { value, number } = props;
   let textToDisplay = number < 2 ? "étoile" : "étoiles";

   return (
      <option value={value}>
         {number} {textToDisplay}
      </option>
   );
}
