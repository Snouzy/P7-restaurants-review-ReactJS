import React from 'react';
import styled from 'styled-components';
import Stars from '../Common/Stars';
import { averageStars } from '../../services/libs';
const HeaderRestaurantsModal = ({ selectedRestaurant }) => (
   <>
      <h4>{selectedRestaurant.restaurantName}</h4>
      <p>{selectedRestaurant.address}</p>
      {/* Average rating section ('Note générale') */}
      <DivNoteGenerale className="row">
         <DivNoteText className="col-sm-12 col-md-6">
            <h5 style={{ margin: '0 10px 0 0' }}>Note générale :</h5>
         </DivNoteText>
         <DivStars className="col-sm-12 col-md-6">
            <Stars
               numberOfStars={averageStars(selectedRestaurant.ratings)}
               // numberOfStars={selectedRestaurant.stars}
               isEditable={false}
               size={25}
            />
         </DivStars>
      </DivNoteGenerale>
   </>
);
export default HeaderRestaurantsModal;
const DivNoteGenerale = styled.div`
   display: flex;
   align-items: center;
   margin: 30px 0;
`;

const DivNoteText = styled.div`
   text-align: right;
   @media (max-width: 768px) {
      text-align: center;
   }
`;
const DivStars = styled.div`
   @media (max-width: 768px) {
      display: flex;
      justify-content: center;
   }
`;
