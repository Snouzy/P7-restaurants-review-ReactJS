import React from "react";
import styled from "styled-components";
import { averageStars } from "../../services/libs";
import Stars from "../Common/Stars";
const HeaderRestaurantsModal = ({ selectedRestaurant }) => {
   return (
      <>
         <h4>{selectedRestaurant.restaurantName}</h4>
         <p>{selectedRestaurant.address}</p>
         {/* Average rating section ('Note générale') */}
         <DivNoteGenerale>
            <h5 style={{ margin: "0 10px 0 0" }}>Note générale :</h5>
            <Stars
               numberOfStars={averageStars(selectedRestaurant.ratings)}
               isEditable={false}
               size={25}
            />
         </DivNoteGenerale>
      </>
   );
};
export default HeaderRestaurantsModal;
const DivNoteGenerale = styled.div`
   display: flex;
   align-items: center;
   margin: 30px 0;
`;
