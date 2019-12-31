import React, { Fragment } from "react";
import styled from "styled-components";
import Stars from "./Stars";

export const UserReview = props => {
   const { numero, resto } = props;
   return (
      <Fragment>
         <DivAvis>
            <PWrapper>Avis numéro {numero} :</PWrapper>
            <Stars numberOfStars={resto.stars} isEditable={false} size={20} />
         </DivAvis>

         <p>{resto.comment}</p>
         <hr />
      </Fragment>
   );
};

const PWrapper = styled.p`
   margin: 0 10px 0 0;
   font-weight: bold;
`;

const DivAvis = styled.div`
   display: flex;
   align-items: center;
   margin: 10px 0;
`;
