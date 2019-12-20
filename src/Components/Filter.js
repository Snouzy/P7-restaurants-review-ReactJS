import React, { Fragment } from "react";
import OptionElt from "./OptionElt";
// import { Modal } from "@material-ui/core";

const Filter = props => {
   const optionsElts = [];
   for (let i = 1; i <= props.numberOfOptions; i++) {
      optionsElts.push(<OptionElt key={i} value={i} number={i} />);
   }

   return (
      <Fragment>
         {/* The filter "minimum" */}
         <div className="form-group col-lg-6 col-sm-6 col-xs-12">
            <label htmlFor="sort-min">Minimum</label>
            <select
               name="sort-min"
               id="sort-min"
               className="form-control"
               onChange={props.changed}
            >
               {optionsElts}
            </select>
         </div>

         {/* The filter "maximum" */}
         <div className="col-lg-6 col-sm-6 col-xs-12 form-group">
            <label htmlFor="sort-max">Maximum</label>
            <select
               name="sort-max"
               id="sort-max"
               className="form-control"
               onChange={props.changed}
               value={props.maxStars} //set the defaultValue
            >
               {optionsElts}
            </select>
         </div>
      </Fragment>
   );
};

export default Filter;
