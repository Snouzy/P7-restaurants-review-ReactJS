import React, { Fragment } from "react";
import styled from "styled-components";
import Stars from "./Common/Stars";

export const UsersReviews = props => {
   return (
      <div>
         {props.selectedRestaurant.ratings.map((resto, index) => {
            let i = index + 1; //to not start at 0
            return (
               <div key={resto.comment}>
                  <DivAvis>
                     <PWrapper>Avis numéro {i} :</PWrapper>
                     <Stars
                        numberOfStars={resto.stars}
                        isEditable={false}
                        size={20}
                     />
                  </DivAvis>

                  <p>{resto.comment}</p>

                  {/* We don't want to display an <hr /> after the last element. */}
                  {i === props.selectedRestaurant.ratings.length ? "" : <hr />}
               </div>
            );
         })}
      </div>
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
