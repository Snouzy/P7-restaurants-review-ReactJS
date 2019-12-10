import React, { Component, Fragment } from "react";
class Filter extends Component {
   createOptions = maxStars => {
      const optionsElts = [];
      let textToDisplay = "";
      for (let i = 1; i <= maxStars; i++) {
         //displaying the correct sentence
         i < 2 ? (textToDisplay = "étoile") : (textToDisplay = "étoiles");

         optionsElts.push(
            <option key={i} value={i}>
               {i} {textToDisplay}
            </option>
         );
      }
      return optionsElts;
   };

   render() {
      return (
         <Fragment>
            {/* Min - Max*/}
            {/* Min */}
            <div className="form-group col-lg-6 col-sm-6 col-xs-12">
               <label htmlFor="sort-min">Minimum</label>
               <select name="sort-min" id="sort-min" className="form-control">
                  {this.createOptions(5)}
               </select>
            </div>
            {/* Max */}
            <div className="col-lg-6 col-sm-6 col-xs-12 form-group">
               <label htmlFor="sort-max">Maximum</label>
               <select name="sort-max" id="sort-max" className="form-control">
                  {this.createOptions(5)}
               </select>
            </div>
         </Fragment>
      );
   }
}


export default Filter;
