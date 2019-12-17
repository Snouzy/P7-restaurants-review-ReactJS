import React, { Component, Fragment } from "react";
import OptionElt from "./OptionElt";
// import { Modal } from "@material-ui/core";

class Filter extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //default value of the filter
         valueMin: 1,
         valueMax: 5,
         isSmaller: false
      };
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(e) {
      if (e.target.name === "sort-min") {
         this.setState({ valueMin: e.target.value });
      } else {
         this.setState({ valueMax: e.target.value });
      }
      //avoiding issues
      if (this.state.valueMin < this.state.valueMax) {
         this.setState({ isSmaller: true });
      }
   }

   render() {
      const maxRatingStars = 5;
      const optionsElts = [];
      for (let i = 1; i <= maxRatingStars; i++) {
         optionsElts.push(
            <OptionElt
               key={i}
               value={i}
               number={i}
               changed={() => this.handleChange()}
               clicked={this.handleChange}
            />
         );
      }
      return (
         <Fragment>
            {/* Min - Max*/}
            {/* Min */}
            <div className="form-group col-lg-6 col-sm-6 col-xs-12">
               <label htmlFor="sort-min">Minimum</label>
               <select
                  name="sort-min"
                  id="sort-min"
                  className="form-control"
                  onChange={e => this.handleChange(e)}
               >
                  {optionsElts}
               </select>
            </div>
            {/* Max */}
            <div className="col-lg-6 col-sm-6 col-xs-12 form-group">
               <label htmlFor="sort-max">Maximum</label>
               <select
                  name="sort-max"
                  id="sort-max"
                  className="form-control"
                  onChange={this.handleChange}
               >
                  {optionsElts}
               </select>
            </div>
         </Fragment>
      );
   }
}

export default Filter;
