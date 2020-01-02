import React, { Fragment } from "react";
import OptionElt from "./OptionElt";
import _ from "lodash";

const Filter = ({ numberOfOptions, changed, maxStars }) => {
   //get an array in order : 1,2,3... till numberOfOption length
   const numberOfOptionsElements = _.range(0, numberOfOptions + 1);

   return (
      <Fragment>
         {/* The filter "minimum" */}
         <div className="form-group col-lg-6 col-sm-6 col-xs-12">
            <label htmlFor="sort-min">Minimum</label>
            <select
               name="sort-min"
               id="sort-min"
               className="form-control"
               onChange={changed}
            >
               {numberOfOptionsElements.map(el => {
                  return <OptionElt key={el} value={el} number={el} />;
               })}
            </select>
         </div>

         {/* The filter "maximum" */}
         <div className="col-lg-6 col-sm-6 col-xs-12 form-group">
            <label htmlFor="sort-max">Maximum</label>
            <select
               name="sort-max"
               id="sort-max"
               className="form-control"
               onChange={changed}
               value={maxStars} //set the defaultValue (here 5 stars)
            >
               {numberOfOptionsElements.map(el => {
                  return <OptionElt key={el} value={el} number={el} />;
               })}
            </select>
         </div>
      </Fragment>
   );
};

export default Filter;
