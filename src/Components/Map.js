import React, { Component } from "react";
import styled from "styled-components";

class Map extends Component {
   render() {
      return (
         <DivMap className="col-sm-12 col-lg-9">
            <span>Map</span>
            <div id="map"></div>
         </DivMap>
      );
   }
}

const DivMap = styled.div`
   background: lightgrey;
   border: 1px solid black;
`;

export default Map;
