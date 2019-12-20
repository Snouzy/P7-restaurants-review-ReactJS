import React, { Fragment } from "react";
import OptionElt from "./OptionElt";
import _ from "lodash";
// import { Modal, Dialog } from "@material-ui/core";

const Filter = props => {
   const numberOfOptionsElements = _.range(1, props.numberOfOptions + 1);

   // const [open, setOpen] = React.useState(false);

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
               onChange={props.changed}
               value={props.maxStars} //set the defaultValue
            >
               {numberOfOptionsElements.map(el => {
                  return <OptionElt key={el} value={el} number={el} />;
               })}
            </select>
         </div>

         {/* <button onClick={() => setOpen(true)}> X </button> */}

         {/* <Dialog open={open} onClose={() => setOpen(false)}>
            <div>Hello !</div>
         </Dialog> */}
      </Fragment>
   );
};

export default Filter;
