import React from "react";

export default function OptionElt(props) {
   const { value, number, clicked } = props;
   let textToDisplay = number < 2 ? "étoile" : "étoiles";

   return (
      <option value={value} onClick={clicked}>
         {number} {textToDisplay}
      </option>
   );
}
