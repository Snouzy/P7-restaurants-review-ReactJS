import React from "react";
import styled from "styled-components";
import Stars from "./Stars";

export const UserReview = ({ numero, resto }) => {
   const thisComment = resto.ratings[numero];
   return (
      <>
         <DivAvis>
            <PTime> ({thisComment.relative_time_description})</PTime>
            <PNameWrapper>{thisComment.author_name} :</PNameWrapper>
            <Stars numberOfStars={resto.stars} isEditable={false} size={20} />
         </DivAvis>
         <DivComment>
            <ImgProfile src={thisComment.profile_photo_url} />
            <p style={{ margin: 0 }}>
               {" "}
               {thisComment.text.length
                  ? thisComment.text
                  : "L'auteur n'a pas donné d'avis."}{" "}
            </p>
         </DivComment>

         <hr />
      </>
   );
};

const PNameWrapper = styled.p`
   margin: 0 10px 0 0;
   font-weight: bold;
`;

const DivAvis = styled.div`
   display: flex;
   align-items: center;
   margin: 10px 0;
`;

const PTime = styled.p`
   margin: 0 7px 0 0;
   font-style: italic;
`;

const DivComment = styled.div`
   display: flex;
   align-items: center;
`;

const ImgProfile = styled.img`
   height: 50px;
   margin-right: 10px;
`;
