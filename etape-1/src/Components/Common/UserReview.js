import React, { Fragment } from 'react';
import styled from 'styled-components';
import Stars from './Stars';

export const UsersReview = ({ numero, selectedRestaurant }) => (
   <Fragment>
      <DivAvis>
         <PWrapper>Avis numéro {numero} :</PWrapper>
         <Stars
            numberOfStars={selectedRestaurant.stars}
            isEditable={false}
            size={20}
         />
      </DivAvis>
      <p>{selectedRestaurant.comment}</p>
      <hr />
   </Fragment>
);

const PWrapper = styled.p`
   margin: 0 10px 0 0;
   font-weight: bold;
`;

const DivAvis = styled.div`
   display: flex;
   align-items: center;
   margin: 10px 0;
`;
