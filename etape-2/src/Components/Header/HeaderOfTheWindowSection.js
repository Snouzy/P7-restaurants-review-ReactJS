import React, { Fragment } from "react";
import styled from "styled-components";
import { averageStars } from "../../services/libs";
import Stars from "../Common/Stars";
export const HeaderOfTheWindowSection = props => {
   return (
      <Fragment>
         <h4>{props.selectedRestaurant.restaurantName}</h4>
         <p>{props.selectedRestaurant.address}</p>
         {/* Average rating section */}
         <DivNoteGenerale>
            <h5 style={{ margin: "0 10px 0 0" }}>Note générale :</h5>
            <Stars
               numberOfStars={averageStars(props.selectedRestaurant.ratings)}
               isEditable={false}
               size={25}
            />
         </DivNoteGenerale>
      </Fragment>
   );
};

const DivNoteGenerale = styled.div`
   display: flex;
   align-items: center;
   margin: 30px 0;
`;
